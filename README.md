# Still / Life

An oil-painted, abstract still-life puzzle game: five studies and fourteen ways to find order. Observe, rearrange, and discover more than one solution in each scene.

## Play

Live game: https://runriotcomeon.github.io/still-life-atelier/

The title screen offers Play, chapter selection, instructions, and settings. During play, open settings or return to the menu without losing the current arrangement.


Open `dist/index.html` in a browser, or serve the static files locally:

```sh
python -m http.server 8000 --directory dist
```

Then visit http://localhost:8000. No build step or package installation is required.

## Features

- Five puzzles with multiple solutions, progressive hints, undo, and saved progress.
- Original generated oil-painting assets and a dedicated game emblem.
- English by default, with Chinese, Japanese, Spanish, French, and German available in Settings.
- Bundled fonts, touch and mouse interactions, and optional sound.

## Project layout

- `dist/`: complete playable game, code, artwork, and bundled fonts.
- `outputs/`: design document, asset prompts, rule validation report, and downloadable game archive.
- `.openai/hosting.json`: configuration for the existing Sites deployment.

Font licenses are included in `dist/assets/fonts/`. This repository does not grant a general open-source license for the game or its artwork.
