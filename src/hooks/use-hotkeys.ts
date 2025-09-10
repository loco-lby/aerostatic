import { useEffect, useCallback } from 'react'

type HotkeyCallback = () => void
type Hotkey = [string, HotkeyCallback]

export function useHotkeys(hotkeys: Hotkey[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const [key, callback] of hotkeys) {
      const keys = key.split('+').map(k => k.trim().toLowerCase())
      const hasCmd = keys.includes('cmd')
      const hasCtrl = keys.includes('ctrl')
      const hasShift = keys.includes('shift')
      const hasAlt = keys.includes('alt')
      const mainKey = keys[keys.length - 1]
      
      const cmdPressed = hasCmd && (event.metaKey || event.ctrlKey)
      const ctrlPressed = hasCtrl && event.ctrlKey
      const shiftPressed = hasShift && event.shiftKey
      const altPressed = hasAlt && event.altKey
      
      const modifiersMatch = 
        (!hasCmd || cmdPressed) &&
        (!hasCtrl || ctrlPressed) &&
        (!hasShift || shiftPressed) &&
        (!hasAlt || altPressed)
      
      if (modifiersMatch && event.key.toLowerCase() === mainKey) {
        event.preventDefault()
        callback()
      }
    }
  }, [hotkeys])
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}