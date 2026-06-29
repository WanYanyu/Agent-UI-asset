# Coding Coach Pet v7 Acting Spec

## Goal

v7 turns the current three mascot packages into three distinct pets with different acting systems. Bluebot remains the default pet. Bytecat and Nono are new pet personalities, not alternate skins on the same animation skeleton.

The product state machine does not change: `idle`, `reading`, `running`, `judging`, `success`, and `needs-fix` still map only to frontend/backend events. No mascot action may imply hidden-test visibility, correctness certainty, or judging authority beyond the actual system result.

## Package Model

Keep the existing runtime contract so the app can keep loading sequence frames by manifest.

- `skin`: remains for backward compatibility.
- `petId`: new stable pet identity, same value as `skin` for these three packages.
- `actingProfile`: new object describing the pet's motion language.
- `assetVersion`: `7.0.0`.
- `packageType`: `source+runtime` for full packages, `runtime` for slim packages.
- `stateOrder`: `idle`, `reading`, `running`, `judging`, `success`, `needs-fix`.
- `transitionOrder`: `reading_to_running`, `running_to_judging`, `judging_to_success`, `judging_to_needs-fix`.

Recommended output names:

```text
bluebot-sequence-v7-acting/
bytecat-sequence-v7-acting/
nono-sequence-v7-acting/
bluebot-sequence-v7-runtime/
bytecat-sequence-v7-runtime/
nono-sequence-v7-runtime/
```

## Shared Technical Rules

- Canvas: `512x512`, transparent background.
- Runtime exports: `128x128`, `96x96`, `64x64` WebP with alpha.
- Optional source export: `256x256` WebP.
- Keep important pixels inside the central `80%` of the 512 canvas.
- No visible text, logo, watermark, code, screenshots, hidden-case symbols, trophy icons, or pass/fail marks.
- `needs-fix` must feel supportive, never disappointed, mocking, angry, or shameful.
- Looped states should have clean wrap continuity.
- Result states should be short one-shots and then return to `idle`.
- Current high-frame production shape can continue:
  - Looping states: `24` frames.
  - Result states: `20` frames.
  - Transitions: `10` frames.

## Pet 1: Bluebot

### Acting Profile

Bluebot is the default pet: reliable, calm, technical, and easy to read. It should feel like the baseline Coding Coach Agent launcher. Its movement language is mechanical, centered, and precise.

Do not make Bluebot too playful. Its job is to be the stable reference pet.

### Base Prompt

```text
A light-blue intelligent small robot companion for a coding practice app, clean high-quality pixel-art UI mascot, compact rounded body, small square head with rounded corners, expressive bright eyes on a white face screen, cyan highlights, tiny warm yellow accent lights, short arms and legs, friendly focused posture, calm reliable engineering personality, centered full body on a 512x512 canvas, transparent background, generous safe padding, simple recognizable silhouette readable at 64px, consistent character design, no text, no logo, no code snippets, no UI screenshot, no watermark, no extra characters, no complex background.
```

Negative prompt:

```text
photorealistic, dark mood, complex background, text, logo, watermark, code screenshot, human programmer, cluttered props, inconsistent character, cropped body, blurry edges, excessive detail, scary expression, mocking failure, hidden test references, correctness guarantee symbols, trophy, pass mark, fail mark
```

### State Acting

#### `idle`

Motion language: calibrated standby.

Frame plan:

- Frames `000-005`: gentle breathing expansion, antenna light warms slightly.
- Frames `006-009`: screen blink, tiny eye compression.
- Frames `010-017`: return from blink, body recenters with minimal sway.
- Frames `018-023`: antenna light settles, loop returns to frame `000`.

Prompt:

```text
Using the same Bluebot mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for idle. Bluebot stands in a calibrated standby pose with slow breathing, a tiny screen blink, and a small warm antenna-light pulse. Keep the body centered and mechanical, friendly but quiet, readable at 64px, no text, no logo, no code, no background.
```

#### `reading`

Motion language: screen scan and small diagnostic panel.

Frame plan:

- Frames `000-004`: Bluebot raises a small abstract panel.
- Frames `005-011`: face-screen scan line moves downward, eyes track it.
- Frames `012-017`: head tilts one or two pixels toward the panel.
- Frames `018-023`: scan line fades and pose returns to start.

Prompt:

```text
Using the same Bluebot mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for reading. Bluebot calmly studies a small abstract diagnostic panel with no readable marks while a subtle scan line passes across its face screen. The action says context reading and planning, not judging correctness. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code, no hidden-case symbols, no background.
```

#### `running`

Motion language: precise keyboard execution.

Frame plan:

- Frames `000-003`: hands move to a tiny floating keyboard.
- Frames `004-011`: alternating left/right mechanical typing cycle.
- Frames `012-017`: two small cyan/yellow sparks flicker near the keyboard.
- Frames `018-023`: typing cycle returns to frame `000` pose for loop sync.

Prompt:

```text
Using the same Bluebot mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for running. Bluebot types on a tiny floating keyboard-like prop with no letters, using precise alternating mechanical hand motion and one or two compact cyan/yellow pixel sparks. The energy is focused and orderly, suitable for running samples or checks. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code snippets, no background.
```

#### `judging`

Motion language: neutral diagnostics.

Frame plan:

- Frames `000-005`: keyboard lowers and a diagnostic panel appears.
- Frames `006-012`: chest and antenna lights pulse slowly.
- Frames `013-018`: eyes focus from panel to viewer, then back.
- Frames `019-023`: panel returns to start position.

Prompt:

```text
Using the same Bluebot mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for judging. Bluebot waits in a neutral diagnostic posture with a small abstract status panel and slow cyan light pulses. The mood is patient and focused, showing formal submission polling without implying that Bluebot knows the result. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code, no hidden-case symbols, no pass/fail marks, no background.
```

#### `success`

Motion language: brief reliable confirmation.

Frame plan:

- Frames `000-004`: small crouch, antenna light brightens.
- Frames `005-010`: one compact hop, arms lift slightly.
- Frames `011-015`: two tiny cyan/yellow sparkles appear.
- Frames `016-019`: settle back toward idle.

Prompt:

```text
Using the same Bluebot mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for success. Bluebot makes one compact happy hop with bright friendly eyes, a warm antenna flash, and one or two tiny cyan/yellow pixel sparkles. The celebration is brief and quiet, suitable for an accepted result or completed Agent action. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code, no trophy, no confetti burst, no background.
```

#### `needs-fix`

Motion language: calm maintenance notice.

Frame plan:

- Frames `000-004`: Bluebot tilts head gently.
- Frames `005-010`: small amber dot or alert bubble blinks.
- Frames `011-015`: one hand raises in a supportive hint gesture.
- Frames `016-019`: return to calm posture.

Prompt:

```text
Using the same Bluebot mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for needs-fix. Bluebot gives a calm maintenance-style coaching nudge with supportive eyes, a small amber alert dot or simple alert bubble, and one small raised-hand hint gesture. The state can represent wrong answer, runtime error, timeout, system error, or command failure without blame. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code, no angry expression, no mocking failure, no background.
```

### Transitions

- `reading_to_running`: diagnostic panel lowers, keyboard rises from the same centerline.
- `running_to_judging`: wait for a running sync frame, then keyboard folds into a diagnostic panel.
- `judging_to_success`: panel fades, antenna light brightens, body enters compact hop.
- `judging_to_needs-fix`: panel fades, amber alert appears, hand raises gently.

## Pet 2: Bytecat

### Acting Profile

Bytecat is a new pet: agile, curious, quick, and study-buddy-like. It should not reuse Bluebot's mechanical staging. Its movement language is driven by ears, tail, paws, and body weight.

Bytecat can be more lively than Bluebot, but it must remain quiet enough for a coding UI.

### Base Prompt

```text
A mint-green agile coding companion cat mascot for a programming practice app, clean high-quality pixel-art UI mascot, rounded compact body, large expressive eyes, small headset-like ear accents, soft teal and cream palette, striped fluffy tail, tiny collar light, friendly clever study-buddy personality, centered full body on a 512x512 canvas, transparent background, generous safe padding, simple recognizable silhouette readable at 64px, consistent character design, no text, no logo, no code snippets, no UI screenshot, no watermark, no extra characters, no complex background.
```

Negative prompt:

```text
photorealistic, dark mood, complex background, text, logo, watermark, code screenshot, human programmer, cluttered props, inconsistent character, cropped body, blurry edges, excessive detail, scary expression, mocking failure, sad collapse, hidden test references, correctness guarantee symbols, trophy, pass mark, fail mark
```

### State Acting

#### `idle`

Motion language: attentive tail rhythm.

Frame plan:

- Frames `000-005`: gentle breathing while tail curls left.
- Frames `006-009`: ear flick and blink.
- Frames `010-017`: tail curls right, paws stay planted.
- Frames `018-023`: ears settle and loop returns cleanly.

Prompt:

```text
Using the same Bytecat mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for idle. Bytecat sits or stands in a calm attentive pose with a soft tail sway, one small ear flick, and a blink. The pose is curious and ready, not hyperactive. Keep the same mint-green cat design, centered full body, clean silhouette, readable at 64px, no text, no logo, no code, no background.
```

#### `reading`

Motion language: curious lean-in.

Frame plan:

- Frames `000-004`: Bytecat leans toward a small abstract notebook or magnifier.
- Frames `005-010`: ears angle forward, eyes widen slightly.
- Frames `011-016`: one paw touches the notebook edge; tail pauses.
- Frames `017-023`: head lifts and loop returns.

Prompt:

```text
Using the same Bytecat mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for reading. Bytecat leans forward with curious eyes toward a tiny abstract notebook or magnifier with no readable marks. Its ears angle forward and one paw lightly touches the prop, communicating context reading and planning. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code, no UI screenshot, no background.
```

#### `running`

Motion language: fast paw typing.

Frame plan:

- Frames `000-003`: Bytecat drops into a forward work stance.
- Frames `004-011`: front paws alternate rapidly on a tiny keyboard.
- Frames `012-017`: tail flicks in time with the typing.
- Frames `018-023`: body bounce returns to sync pose.

Prompt:

```text
Using the same Bytecat mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for running. Bytecat leans forward and rapidly taps a tiny floating keyboard-like prop with quick alternating front-paw motion, while its tail flicks in rhythm and a few small teal pixel sparks appear. The action is agile and compact, suitable for running samples or checks. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code snippets, no background.
```

#### `judging`

Motion language: composed waiting.

Frame plan:

- Frames `000-005`: Bytecat sits more upright, keyboard disappears.
- Frames `006-011`: tail wraps partly around the body.
- Frames `012-017`: ears hold still; eyes watch a small result panel.
- Frames `018-023`: panel bobs subtly and returns to start.

Prompt:

```text
Using the same Bytecat mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for judging. Bytecat sits upright and composed, tail wrapping partly around its body while it watches a tiny abstract status panel with no readable marks. The mood is attentive and patient, showing formal submission polling without implying certainty about the result. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code, no hidden-case symbols, no pass/fail marks, no background.
```

#### `success`

Motion language: quick playful bounce.

Frame plan:

- Frames `000-003`: Bytecat crouches slightly, tail lifts.
- Frames `004-009`: small springy hop, front paws lift.
- Frames `010-014`: ears perk, tail forms a happy curve, tiny sparkles appear.
- Frames `015-019`: lands softly and settles.

Prompt:

```text
Using the same Bytecat mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for success. Bytecat makes a quick springy hop with front paws lifted, perked ears, a happy tail curve, and one or two tiny teal/yellow sparkles. The celebration is bright but brief, suitable for accepted or completed Agent actions. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code, no trophy, no exaggerated confetti, no background.
```

#### `needs-fix`

Motion language: gentle coaching gesture.

Frame plan:

- Frames `000-004`: ears dip slightly, eyes stay supportive.
- Frames `005-009`: Bytecat raises one paw with a small amber alert bubble.
- Frames `010-014`: tail curls inward, then relaxes.
- Frames `015-019`: ears return upward, posture stays encouraging.

Prompt:

```text
Using the same Bytecat mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for needs-fix. Bytecat gives a gentle coaching nudge: ears dip only slightly, one paw raises beside a small amber alert bubble, and the expression stays supportive and curious. The state can represent wrong answer, runtime error, timeout, system error, or command failure without shame. Keep the same camera angle, centered full body, clean silhouette, readable at 64px, no text, no logo, no code, no sad collapse, no angry expression, no mocking failure, no background.
```

### Transitions

- `reading_to_running`: Bytecat closes the notebook with a paw and drops into the keyboard stance.
- `running_to_judging`: wait for a paw-typing sync pose, then Bytecat sits upright and tail wraps in.
- `judging_to_success`: tail pops upward first, then the springy hop starts.
- `judging_to_needs-fix`: ears dip, amber bubble appears, paw raises.

## Pet 3: Nono

### Acting Profile

Nono is a new pet: a hovering orbital scanner. It should not use the same handheld-prop vocabulary as Bluebot or Bytecat. Its movement language is driven by hovering, rotation, side-wing micro-adjustments, core light, projection panels, and scan rings.

Nono can feel more futuristic, but it must still be friendly and readable at `64px`.

### Base Prompt

```text
A small hovering orbital scanner mascot for a programming practice app, clean high-quality pixel-art UI mascot, rounded white and silver body with glossy black face screen, cyan core lights, two compact side fins or winglets, tiny antenna-like sensors, friendly focused expression made of simple cyan eyes, futuristic but warm companion personality, centered full body on a 512x512 canvas, transparent background, generous safe padding, simple recognizable silhouette readable at 64px, consistent character design, no text, no logo, no code snippets, no UI screenshot, no watermark, no extra characters, no complex background.
```

Negative prompt:

```text
photorealistic, dark mood, complex background, text, logo, watermark, code screenshot, human programmer, cluttered props, inconsistent character, cropped body, blurry edges, excessive detail, scary expression, weapon, drone camera surveillance mood, mocking failure, hidden test references, correctness guarantee symbols, trophy, pass mark, fail mark
```

### State Acting

#### `idle`

Motion language: hovering stabilization.

Frame plan:

- Frames `000-005`: Nono floats upward a few pixels; side fins angle down.
- Frames `006-010`: core light pulses slowly; eyes blink.
- Frames `011-017`: Nono floats downward; side fins angle up.
- Frames `018-023`: micro-rotation returns to frame `000`.

Prompt:

```text
Using the same Nono mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for idle. Nono hovers calmly with a tiny vertical float, small side-fin stabilization, a slow cyan core-light pulse, and a simple screen blink. Keep the orbital scanner identity, centered body, generous safe padding, clean silhouette, readable at 64px, no text, no logo, no code, no background.
```

#### `reading`

Motion language: projection scan.

Frame plan:

- Frames `000-004`: a small translucent cyan projection panel appears near Nono.
- Frames `005-011`: a scan beam or arc passes across the projection.
- Frames `012-017`: Nono tilts toward the projection; core light brightens.
- Frames `018-023`: projection dims and returns to start.

Prompt:

```text
Using the same Nono mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for reading. Nono projects a small translucent cyan abstract panel or scan sheet with no readable marks while a soft scan arc passes across it. The action says context reading and planning, not judging correctness. Keep the hovering orbital scanner identity, centered body, generous safe padding, clean silhouette, readable at 64px, no text, no logo, no code, no UI screenshot, no background.
```

#### `running`

Motion language: projected input and propulsion pulse.

Frame plan:

- Frames `000-003`: Nono lowers slightly and opens a tiny projection keyboard.
- Frames `004-011`: projection keys flicker abstractly while side fins pulse.
- Frames `012-017`: cyan data particles orbit once around the body.
- Frames `018-023`: propulsion pulse returns to sync pose.

Prompt:

```text
Using the same Nono mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for running. Nono hovers above a tiny abstract projection keyboard with no letters, side fins pulsing like small thrusters while a few cyan data particles orbit compactly around its body. The action is futuristic and compact, suitable for running samples or checks. Keep the orbital scanner identity, centered body, generous safe padding, clean silhouette, readable at 64px, no text, no logo, no code snippets, no background.
```

#### `judging`

Motion language: formal scan ring.

Frame plan:

- Frames `000-004`: projection keyboard collapses into a ring.
- Frames `005-012`: a cyan scan ring rotates around Nono's face screen.
- Frames `013-018`: core light pulses slowly; side fins hold steady.
- Frames `019-023`: ring returns to start rotation angle.

Prompt:

```text
Using the same Nono mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for judging. Nono hovers nearly still while a small cyan scan ring or diagnostic arc rotates around its face screen, with a slow core-light pulse. The mood is neutral and focused, showing formal submission polling without implying it knows the result. Keep the orbital scanner identity, centered body, generous safe padding, clean silhouette, readable at 64px, no text, no logo, no code, no hidden-case symbols, no pass/fail marks, no background.
```

#### `success`

Motion language: luminous orbit flourish.

Frame plan:

- Frames `000-003`: Nono compresses downward slightly, core light charges.
- Frames `004-009`: small upward float and one quarter-turn rotation.
- Frames `010-014`: cyan ring brightens and emits two small sparkles.
- Frames `015-019`: returns to front-facing hover.

Prompt:

```text
Using the same Nono mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for success. Nono performs a small upward hover flourish with a short quarter-turn rotation, a bright cyan core-light pulse, and one or two tiny sparkles. The celebration is crisp and brief, suitable for accepted or completed Agent actions. Keep the orbital scanner identity, centered body, generous safe padding, clean silhouette, readable at 64px, no text, no logo, no code, no trophy, no exaggerated confetti, no background.
```

#### `needs-fix`

Motion language: amber caution ring.

Frame plan:

- Frames `000-004`: Nono descends slightly, side fins soften downward.
- Frames `005-010`: amber caution ring blinks once around the core.
- Frames `011-015`: face eyes stay supportive; ring fades to a small amber dot.
- Frames `016-019`: Nono floats back to a calm hover.

Prompt:

```text
Using the same Nono mascot character and proportions as the reference, create transparent 512x512 pixel-art UI animation keyframes for needs-fix. Nono gives a gentle system caution: it descends slightly, shows a small amber caution ring or dot near the core, and keeps supportive cyan eyes. The state can represent wrong answer, runtime error, timeout, system error, or command failure without blame. Keep the orbital scanner identity, centered body, generous safe padding, clean silhouette, readable at 64px, no text, no logo, no code, no angry expression, no warning sign text, no mocking failure, no background.
```

### Transitions

- `reading_to_running`: projection scan sheet folds into projection keyboard.
- `running_to_judging`: wait for a propulsion sync frame, then projection keyboard collapses into scan ring.
- `judging_to_success`: scan ring brightens and becomes the success orbit flourish.
- `judging_to_needs-fix`: scan ring slows, shifts to amber caution ring, and Nono descends slightly.

## Acting Profile JSON Shape

Add this field to each v7 manifest:

```json
{
  "petId": "bluebot",
  "actingProfile": {
    "id": "default-engineer",
    "role": "default pet",
    "motionLanguage": ["mechanical", "centered", "precise"],
    "signatureParts": ["face screen", "antenna light", "small diagnostic panel"],
    "stateGestures": {
      "idle": "calibrated standby with antenna pulse",
      "reading": "screen scan with abstract panel",
      "running": "precise mechanical keyboard typing",
      "judging": "neutral diagnostic pulse",
      "success": "compact hop and tiny sparkles",
      "needs-fix": "amber maintenance notice and raised-hand hint"
    }
  }
}
```

## QA Gates

Before accepting v7 assets:

1. Same state across pets must not share the same pose skeleton.
2. Bytecat must use ear, tail, paw, and body-weight acting in every state.
3. Nono must use hover, projection, scan ring, side fins, and core-light acting in every state.
4. Bluebot must remain the most stable and least distracting pet.
5. Each state must still map cleanly to the same Agent event meaning.
6. `reading`, `running`, and `judging` must be distinguishable at `64x64`.
7. `needs-fix` must stay supportive and non-shaming.
8. No text, code, logos, screenshots, hidden-case references, or pass/fail marks.
9. All important pixels must stay inside the central `80%` of the canvas.
10. Loop boundaries and transition entry frames must be checked in the viewer.

## Recommended Production Flow

1. Generate one refreshed base/reference sheet for Bytecat and Nono only if current identity cannot support the acting profile.
2. Generate state keyframes in order: `idle`, `reading`, `running`, `judging`, `success`, `needs-fix`.
3. For each state, approve keyframes before producing in-betweens.
4. Generate transitions from approved state endpoint frames.
5. Export full and runtime packages.
6. Add `actingProfile` metadata to manifest.
7. Verify in localhost viewer at `128`, `96`, and `64`.

