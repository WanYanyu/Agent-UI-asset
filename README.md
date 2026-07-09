# Agent UI Asset

Coding Coach pet mascot runtime assets and source PNG frames.

中文说明见 [README.zh-CN.md](README.zh-CN.md).

## Contents

- `outputs/bluebot-sequence-v6-1-runtime/`: Bluebot runtime WebP package.
- `outputs/bytecat-sequence-v6-1-runtime/`: Bytecat runtime WebP package.
- `outputs/nono-sequence-v6-1-runtime/`: Nono runtime WebP package.
- `outputs/wizard-sequence-v6-1-runtime/`: partial Xiao Locke Wizard runtime WebP package.
- `outputs/*-sequence-v6-full-frame-acting-v6-1/`: source PNG packages with `512` frames plus `manifest.json`.
- `outputs/pet-sequence-manifest.schema.json`: manifest schema.
- `viewer/`: local browser viewer for runtime and source PNG playback.

## Package Layout

Runtime packages are the frontend integration target:

```text
outputs/<skin>-sequence-v6-1-runtime/
  manifest.json
  128/
  96/
  64/
```

Source packages keep editable/re-exportable PNG frames:

```text
outputs/<skin>-sequence-v6-full-frame-acting-v6-1/
  manifest.json
  512/
```

Wizard is currently partial: `idle`, `reading`, `judging`, and `success` are exported; `running` and `needs-fix` are marked unavailable in the manifests.

## Local Preview

From the repository root:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open:

- Sequence viewer: `http://127.0.0.1:8765/viewer/index.html`

## Notes

Use runtime packages in the app. Use source PNG packages only for review, re-export, or future asset production.
