# Agent UI Asset

Coding Coach pet mascot assets and local preview tools.

中文说明见 [README.zh-CN.md](README.zh-CN.md).

## Contents

- `outputs/bluebot-sequence-v7-acting/`: full Bluebot v7 package.
- `outputs/bytecat-sequence-v7-acting/`: full Bytecat v7 package.
- `outputs/nono-sequence-v7-acting/`: full Nono v7 package.
- `outputs/wizard-sequence-v6-full-frame-acting-v6-1/`: partial Xiao Locke Wizard package (`idle`, `reading`, `judging`, `success`; `running` and `needs-fix` are not exported yet).
- `outputs/*-sequence-v7-runtime/`: slim v7 runtime packages with `128`, `96`, and `64` WebP frames.
- `outputs/*-sequence-v6-1-*`: v6.1 historical packages kept for comparison and rollback.
- `outputs/coding-coach-pet-v7-acting-spec.md`: v7 acting-system design.
- `outputs/coding-coach-pet-v7-acting-profiles.json`: machine-readable v7 acting profiles.
- `outputs/pet-sequence-manifest.schema.json`: manifest schema.
- `outputs/pet-v7-qa-report.json`: v7 structure, dimensions, safe-zone, and transition-sync QA report.
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

Bluebot is the default pet. Bytecat and Nono are v7 pets with their own acting systems, not alternate skins on the same animation skeleton. Wizard is a partial Xiao Locke package and should not be treated as complete until `running` and `needs-fix` are approved and exported.
