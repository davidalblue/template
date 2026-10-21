// The example drawing: a grid of shapes in a travelling wave. Replace this file with your tool.
import type p5 from 'p5'
import { state } from './state'

let time = 0

/** Moves the animation on by `seconds`. */
export function advance(seconds: number) {
  if (state.motion) time += seconds * (0.05 + (state.speed / 100) * 1.5)
}

export function draw(p: p5) {
  p.background(0)

  // a square grid filling the canvas, inset by a margin
  const margin = Math.min(p.width, p.height) * 0.08
  const cell = (p.width - margin * 2) / state.columns
  const rows = Math.max(1, Math.floor((p.height - margin * 2) / cell))
  const top = (p.height - rows * cell) / 2

  p.rectMode(p.CENTER)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < state.columns; col++) {
      const x = margin + (col + 0.5) * cell
      const y = top + (row + 0.5) * cell
      // the wave runs diagonally across the grid
      const phase = ((col + row) / (state.columns + rows)) * (state.wave / 100) * Math.PI * 4
      const swell = state.motion ? 0.55 + 0.45 * Math.sin(time * Math.PI * 2 - phase) : 1
      const d = cell * (state.size / 100) * swell
      drawShape(p, x, y, d, phase + time * Math.PI)
    }
  }
}

function drawShape(p: p5, x: number, y: number, d: number, angle: number) {
  if (state.shape === 'line') {
    p.push()
    p.translate(x, y)
    p.rotate(state.motion ? angle : 0)
    p.stroke(255)
    p.strokeWeight(Math.max(1, d * 0.12))
    p.line(-d / 2, 0, d / 2, 0)
    p.pop()
    return
  }
  if (state.outline) {
    p.noFill()
    p.stroke(255)
    p.strokeWeight(1.5)
  } else {
    p.noStroke()
    p.fill(255)
  }
  if (state.shape === 'circle') p.circle(x, y, d)
  else p.square(x, y, d)
}
