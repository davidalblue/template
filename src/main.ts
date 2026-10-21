import p5 from 'p5'
import './style.css'
import { initPanel } from './panel'
import { advance, draw } from './sketch'

const stage = document.getElementById('stage')!
let saveNextFrame = false

initPanel(() => {})

new p5((p: p5) => {
  p.setup = () => {
    p.createCanvas(stage.clientWidth, stage.clientHeight)
    new ResizeObserver(() => p.resizeCanvas(stage.clientWidth, stage.clientHeight)).observe(stage)
  }

  p.draw = () => {
    advance(p.deltaTime / 1000)
    draw(p)
    // saved at the end of a frame, after everything is drawn
    if (saveNextFrame) {
      saveNextFrame = false
      p.saveCanvas('tool', 'png')
    }
  }
}, stage)

window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
    e.preventDefault()
    saveNextFrame = true
  }
})
