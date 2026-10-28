export const THEME_KEY = "moderniza-theme";
const THEME_EVENT = "moderniza-theme-change";

// Runs in the document head before content paints. Storage may be blocked.
export const themeInitScript = `try{document.documentElement.dataset.theme=localStorage.getItem("moderniza-theme")==="light"?"light":"dark"}catch{document.documentElement.dataset.theme="dark"}`;

export function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "light";
}

export function getServerThemeSnapshot() {
  return false;
}

export function setLightTheme(light: boolean) {
  const theme = light ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(THEME_KEY, theme); } catch { /* Theme still works without storage. */ }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeTheme(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_KEY || event.key === null) {
      document.documentElement.dataset.theme = event.newValue === "light" ? "light" : "dark";
      onChange();
    }
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
