# Agent UI Asset

Coding Coach pet mascot assets and local preview tools.

中文说明见 [README.zh-CN.md](README.zh-CN.md).

## Contents

- `outputs/bluebot-sequence-v6-full-frame-acting-v6-1/`: full Bluebot package.
- `outputs/bytecat-sequence-v6-full-frame-acting-v6-1/`: full Bytecat package.
- `outputs/nono-sequence-v6-full-frame-acting-v6-1/`: full Nono package.
- `outputs/*-sequence-v6-1-runtime/`: slim runtime packages with `128`, `96`, and `64` WebP frames.
- `outputs/coding-coach-pet-v7-acting-spec.md`: v7 acting-system design.
- `outputs/coding-coach-pet-v7-acting-profiles.json`: machine-readable v7 acting profiles.
- `outputs/pet-sequence-manifest.schema.json`: manifest schema.
- `viewer/`: local browser viewer for sequence playback and v7 acting-profile review.

## Local Preview

From the repository root:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open:

- Sequence viewer: `http://127.0.0.1:8765/viewer/index.html`
- v7 acting profiles: `http://127.0.0.1:8765/viewer/v7-acting.html`

## Notes

Bluebot is the default pet. Bytecat and Nono are intended to become distinct pets with their own acting systems, not alternate skins on the same animation skeleton.
