import { useRef, useState } from 'react'
import { FiDownload, FiUpload } from 'react-icons/fi'
import { useAppState } from '../../state/StateContext'
import { exportStateAsJSON, importStateFromJSON } from '../../state/storage'

export function DebugPanel() {
  const { state, dispatch } = useAppState()
  const [importError, setImportError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const json = exportStateAsJSON(state)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'dashboard-state.json'
    a.click()

    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => {
    setImportError(null)
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const result = importStateFromJSON(text)

    if ('error' in result) {
      setImportError(result.error)
      e.target.value = ''
      return
    }

    dispatch({ type: 'IMPORT_STATE', payload: result.state })
    setImportError(null)
    e.target.value = ''
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-bg-alt) p-3">
      <button
        type="button"
        onClick={handleExport}
        className="flex items-center gap-2 rounded border border-(--color-border) bg-(--color-bg-elevated) px-3 py-1.5 text-sm text-(--color-text) hover:bg-(--color-bg) transition-colors"
      >
        <FiDownload size={14} /> Export state
      </button>

      <button
        type="button"
        onClick={handleImportClick}
        className="flex items-center gap-2 rounded border border-(--color-border) bg-(--color-bg-elevated) px-3 py-1.5 text-sm text-(--color-text) hover:bg-(--color-bg) transition-colors"
      >
        <FiUpload size={14} /> Import state
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        className="hidden"
      />

      {importError && (
        <span className="text-sm text-(--color-danger)">Import failed: {importError}</span>
      )}
    </div>
  )
}