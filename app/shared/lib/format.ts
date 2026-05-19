export function hpaToMmHg(hpa: number): number {
  return Math.round(hpa * 0.750062)
}

export type CompassDir = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

export function degreesToCompass(deg: number): CompassDir {
  const normalized = ((deg % 360) + 360) % 360
  const index = Math.round(normalized / 45) % 8
  const dirs: CompassDir[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[index]
}

export function formatTemp(celsius: number): string {
  return `${Math.round(celsius)}°`
}

export function formatTime(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))
}

export function formatDayName(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  }).format(new Date(iso))
}
