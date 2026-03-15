type Theme = "light" | "dark";

let current = $state<Theme>("light");

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function apply(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
}

export function initialize() {
  const stored = localStorage.getItem("theme") as Theme | null;
  current = stored === "light" || stored === "dark" ? stored : systemTheme();
  apply(current);
}

export function toggle() {
  current = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", current);
  apply(current);
}

export function getTheme(): Theme {
  return current;
}
