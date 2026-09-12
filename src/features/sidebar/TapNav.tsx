import { NavLink } from "react-router";
import { FiGrid, FiSettings } from "react-icons/fi";
import { ThemeToggle } from "../theme/ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: FiGrid },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-(--color-border) bg-(--color-bg-elevated) px-4 py-3">
      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-(--color-accent) text-white"
                      : "text-(--color-text-muted) hover:bg-(--color-bg-alt) hover:text-(--color-text)"
                  }`
                }
              >
                <item.icon size={16} aria-hidden="true" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
}
