import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/**
 * Drop-in theme toggle button.
 * size="sm" → icon only  (default)
 * size="md" → icon + label
 */
export function ThemeToggle({ size = "sm", className = "" }) {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center gap-2 rounded-xl border transition-all
        px-2.5 py-2 text-sm font-light
        border-(--border) bg-(--bg-muted)
        text-(--text-muted) hover:text-(--text-primary)
        hover:bg-(--bg-hover) ${className}`}
    >
      {isDark ? (
        <Sun size={15} className="text-amber-400" />
      ) : (
        <Moon size={15} className="text-indigo-400" />
      )}
      {size === "md" && <span>{isDark ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}
