# sc

CLI tool to easily take screenshots and ask Claude Code or other AI about them.

macOS only. Uses `screencapture` to capture windows or the full screen, and provides Claude Code skills for quick visual Q&A.

## Installation

```bash
npm install -g .
```

## CLI Commands

### `sc select`

Select a target window for future captures. Shows an interactive list of all visible windows and saves your choice.

```bash
$ sc select
? Select the target window:
❯ Firefox — GitHub
  Terminal — zsh
  Blender — untitled

Saved: Firefox — GitHub
```

### `sc capture`

Take a screenshot of the previously selected window. The window does not need to be in the foreground. Outputs the saved file path.

```bash
$ sc capture
/Users/you/.config/sc/screenshots/Firefox_2026-04-07T07-14-30-803Z.png
```

You must run `sc select` first to choose a target window.

### `sc full-capture`

Take a screenshot of the entire screen. Outputs the saved file path.

```bash
$ sc full-capture
/Users/you/.config/sc/screenshots/FullScreen_2026-04-07T07-14-30-803Z.png
```

### `sc latest`

Print the path of the most recent screenshot.

```bash
$ sc latest
/Users/you/.config/sc/screenshots/Firefox_2026-04-07T07-14-30-803Z.png
```

## Claude Code Skills

This tool includes two Claude Code skills that combine screenshots with AI Q&A.

### `/sc <question>`

Captures the selected window and asks Claude Code about it.

```
/sc What does this error mean?
/sc How do I fix the layout shown here?
```

### `/scf <question>`

Captures the full screen and asks Claude Code about it.

```
/scf Which button should I click to create a repository?
/scf What is shown in this window?
```

## Configuration

All data is stored in `~/.config/sc/`:

- `window.json` — Selected target window info
- `screenshots/` — Captured screenshot images

## License

MIT
