export type Shape = 'circle' | 'square' | 'line'

/** Everything the panel controls. Reset puts it back to these. */
const DEFAULTS = {
  shape: 'circle' as Shape,
  columns: 12,
  size: 60,
  outline: false,
  motion: true,
  speed: 30,
  wave: 50,
}

export type State = typeof DEFAULTS
export type NumberKey = { [K in keyof State]: State[K] extends number ? K : never }[keyof State]

export const state: State = { ...DEFAULTS }

export function reset() {
  Object.assign(state, DEFAULTS)
}

export function randomize() {
  const pick = <T>(list: T[]) => list[Math.floor(Math.random() * list.length)]
  const between = (min: number, max: number) => Math.round(min + Math.random() * (max - min))
  state.shape = pick<Shape>(['circle', 'square', 'line'])
  state.columns = between(4, 30)
  state.size = between(30, 100)
  state.wave = between(0, 100)
}
