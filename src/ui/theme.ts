export function applyTheme(theme: 'system' | 'light' | 'dark'): void {
  const root = document.documentElement
  if (theme === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme)
}
