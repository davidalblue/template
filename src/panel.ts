import { randomize, reset, state, type NumberKey, type Shape } from './state'
import { $, button, choice, onPanelChange, slider, syncPanel, toggle, type Bind } from './ui'

const SHAPES: { value: Shape; label: string }[] = [
  { value: 'circle', label: 'Circle' },
  { value: 'square', label: 'Square' },
  { value: 'line', label: 'Line' },
]

/** Binds a slider to a number in the state. */
const num = (key: NumberKey): Bind<number> => ({ get: () => state[key], set: (v) => (state[key] = v) })

/** Wires the controls in index.html to the state. `changed` runs after every edit. */
export function initPanel(changed: () => void) {
  onPanelChange(changed)

  choice($('#shapes'), SHAPES, { get: () => state.shape, set: (v) => (state.shape = v) })

  $('#grid-sliders').append(slider('Columns', num('columns'), () => [2, 40]), slider('Size', num('size'), () => [0, 100]))
  toggle($('#outline'), { get: () => state.outline, set: (v) => (state.outline = v) })

  // the motion sliders are greyed out while Motion is off
  const moving = () => (state.motion ? ([0, 100] as [number, number]) : null)
  toggle($('#motion-switch'), { get: () => state.motion, set: (v) => (state.motion = v) })
  $('#motion-sliders').append(slider('Speed', num('speed'), moving, 'Off'), slider('Wave', num('wave'), moving, 'Off'))

  button($('#randomize'), randomize)
  button($('#reset'), reset)

  syncPanel()
}
