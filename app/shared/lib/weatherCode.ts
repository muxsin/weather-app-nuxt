export type AnimationKind = 'sun' | 'clouds' | 'rain' | 'snow' | 'thunder'

export function weatherCodeToAnimation(code: number): AnimationKind {
  if ([0, 1].includes(code)) return 'sun'
  if ([2, 3, 45, 48].includes(code)) return 'clouds'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'rain'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow'
  if ([95, 96, 99].includes(code)) return 'thunder'
  return 'sun'
}

export function weatherCodeToEmoji(code: number): string {
  if ([0, 1].includes(code)) return '☀️'
  if (code === 2) return '⛅'
  if (code === 3) return '☁️'
  if ([45, 48].includes(code)) return '🌫️'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '🌨️'
  if ([95, 96, 99].includes(code)) return '⛈️'
  return '🌤️'
}
