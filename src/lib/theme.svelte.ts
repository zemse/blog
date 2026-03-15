type Mode = "system" | "light" | "dark";

let mode = $state<Mode>("system");

function applyAttribute(m: Mode) {
  if (m === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", m);
  }
}

export function initialize() {
  const stored = localStorage.getItem("theme") as Mode | null;
  if (stored === "light" || stored === "dark") {
    mode = stored;
  }
}

export function setMode(m: Mode) {
  mode = m;
  if (m === "system") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", m);
  }
  applyAttribute(m);
}

export function cycle() {
  const order: Mode[] = ["system", "light", "dark"];
  const next = order[(order.indexOf(mode) + 1) % order.length];
  setMode(next);
}

export function getMode(): Mode {
  return mode;
}
