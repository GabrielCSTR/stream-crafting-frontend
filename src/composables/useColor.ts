export default function useColor() {
  return {
    genRandomColors,
    genRandomColorsBySeed,
    getLuminance,
    genColors,
    hexToRgb,
    rgbaToHex,
    changeAlpha
  }
}

function genRandomHex(size: number) {
  return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}

function hexToRgb(hex: string) {
  const shorthandRegex = /^([a-f\d]){3}$/i

  hex = hex.replace(shorthandRegex, (_, r: string, g: string, b: string) => r + r + g + g + b + b)

  const result = /^([a-f\d]{2}){3}$/i.exec(hex)

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

function changeAlpha(hex: string, alpha: number) {
  const hexToRgbResult = hexToRgb(hex)

  if (!hexToRgbResult) {
    throw new Error('Cor não está no formato hexadecimal')
  }

  const { r, g, b } = hexToRgbResult

  return rgbaToHex(r, g, b, alpha)
}

function rgbaToHex(r: number, g: number, b: number, a: number) {
  if (a < 0 || a > 1) {
    throw new Error('Alfa não está no intervalo aceito')
  }

  const red = r.toString(16).padStart(2, '0').toUpperCase()
  const green = g.toString(16).padStart(2, '0').toUpperCase()
  const blue = b.toString(16).padStart(2, '0').toUpperCase()

  const alpha = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase()

  return `${red}${green}${blue}${alpha}`
}

function getLuminance(color: number) {
  const r = color >> 16
  const g = (color & 0x00ff00) >> 8
  const b = color & 0xff
  return (r * 299 + g * 587 + b * 114) / 1000
}

function genRandomColorsBySeed(seed: number) {
  const code = Math.floor(Math.abs(Math.sin(seed) * 0xffffff))

  const color = code.toString(16).padStart(6, '0')

  return genColors(color)
}

function genRandomColors() {
  const color = genRandomHex(6)

  return genColors(color)
}

function genColors(color: string) {
  return {
    color: '#' + color,
    luminance: Math.ceil(getLuminance(parseInt(color, 16))) >= 128 ? '#2d2d2d' : '#ffffff'
  } as const
}
