import type { AppState } from "./types";
import { CURRENT_VERSION } from "./types";
import { defaultState } from "./defaults";
import { validateAppState } from "./validateState";

const STORAGE_KEY = "metrics-dashboard-state";

export function loadState(): AppState {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return defaultState;
  }

  if (!raw) return defaultState;

  try {
    const parsed = JSON.parse(raw);
    const result = validateAppState(parsed);

    if ("error" in result) return defaultState;
    if (result.state.version !== CURRENT_VERSION) return defaultState;

    return result.state;
  } catch {
    return defaultState;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
}

export function exportStateAsJSON(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function importStateFromJSON(
  json: string,
): { state: AppState } | { error: string } {
  try {
    const parsed = JSON.parse(json);
    return validateAppState(parsed);
  } catch {
    return { error: "File is not valid JSON." };
  }
}
