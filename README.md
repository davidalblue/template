# Tool Template

A starting point for a browser tool: a p5 canvas on the left, a control panel on the right, and a
GitHub Pages deploy. Built with Vite, TypeScript and p5. The example sketch is a grid of shapes in a wave.

## Start a new tool

1. On GitHub, click **Use this template → Create a new repository** and name it.
2. In the new repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Clone it, then:

   ```sh
   pnpm install
   pnpm dev
   ```

Every push to `main` deploys to `https://<user>.github.io/<repo name>/`. The base path comes from
the repo name, so nothing needs changing when you rename.

## Where things go

| File | What it holds |
| --- | --- |
| `index.html` | The panel's layout: sections, headings and empty boxes for controls |
| `src/state.ts` | Everything the panel controls, its defaults, Reset and Randomize |
| `src/panel.ts` | Connects each control in `index.html` to a value in the state |
| `src/sketch.ts` | The drawing. Replace this with your tool |
| `src/ui.ts` | Reusable controls: `button`, `choice`, `toggle`, `slider` |
| `src/style.css` | Colours (as variables at the top), panel, tiles, sliders, switches |
| `src/main.ts` | Starts p5, keeps the canvas sized to the stage, ⌘S saves a PNG |

## Panel controls

- **Tiles** (`.grid.cols-2/3/4` of `.tile`). Use `choice()` for a set of modes and `button()` for actions.
- **Toggle tile** (`.tile.toggle`) or **switch** (`.switch`, in a `.section-head`). Both use `toggle()`.
- **Slider**: `slider(label, bind, range)`. When `range()` returns `null`, the slider is greyed out.
- `.note` for small grey help text, and `#hint` at the bottom for status messages.

After changing the state from outside the panel, for example from a keyboard shortcut, call
`syncPanel()` so the controls catch up.
