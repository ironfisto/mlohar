const STORAGE_KEY = 'read-mode'

// app/blog/post.css keys off this attribute on <html>.
export const READ_MODE_ATTRIBUTE = 'data-read-mode'

// Runs before first paint on a full page load, so a reader who left read mode
// on doesn't see the full layout flash. Client navigations use the layout effect
// in app/blog/layout.tsx instead. Storage can throw in private browsing.
export const READ_MODE_INIT_SCRIPT = `try{if(/^\\/blog\\/./.test(location.pathname)&&localStorage.getItem('${STORAGE_KEY}')==='on')document.documentElement.setAttribute('${READ_MODE_ATTRIBUTE}','')}catch(e){}`

export function getStoredReadMode() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}

export function storeReadMode(isOn: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, isOn ? 'on' : 'off')
  } catch {
    // The toggle still works for this page view.
  }
}
