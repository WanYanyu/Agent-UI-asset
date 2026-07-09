const SKINS = [
  {
    id: "bluebot",
    label: "Bluebot",
    full: "../outputs/bluebot-sequence-v7-acting",
    runtime: "../outputs/bluebot-sequence-v7-runtime",
  },
  {
    id: "bytecat",
    label: "Bytecat",
    full: "../outputs/bytecat-sequence-v7-acting",
    runtime: "../outputs/bytecat-sequence-v7-runtime",
  },
  {
    id: "nono",
    label: "Nono",
    full: "../outputs/nono-sequence-v7-acting",
    runtime: "../outputs/nono-sequence-v7-runtime",
  },
  {
    id: "wizard",
    label: "Wizard",
    full: "../outputs/wizard-sequence-v6-full-frame-acting-v6-1",
    runtime: "../outputs/wizard-sequence-v6-1-runtime",
  },
];

const PACKAGE_OPTIONS = [
  { id: "runtime", label: "Runtime" },
  { id: "full", label: "Full" },
];

const BACKGROUNDS = [
  { id: "checker", label: "Checker" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

const app = {
  skin: "bluebot",
  packageType: "runtime",
  size: 128,
  background: "checker",
  selected: "idle",
  manifest: null,
  frame: 0,
  playing: true,
  speed: 1,
  lastTick: 0,
  cardFrameClock: 0,
};

const els = {
  skinTabs: document.querySelector("#skinTabs"),
  packageTabs: document.querySelector("#packageTabs"),
  sizeTabs: document.querySelector("#sizeTabs"),
  backgroundTabs: document.querySelector("#backgroundTabs"),
  speedInput: document.querySelector("#speedInput"),
  speedOutput: document.querySelector("#speedOutput"),
  activePath: document.querySelector("#activePath"),
  sequenceTitle: document.querySelector("#sequenceTitle"),
  sequenceMeta: document.querySelector("#sequenceMeta"),
  stageFrame: document.querySelector("#stageFrame"),
  stageImage: document.querySelector("#stageImage"),
  timeline: document.querySelector("#timeline"),
  playToggle: document.querySelector("#playToggle"),
  safeZoneInput: document.querySelector("#safeZoneInput"),
  manifestFacts: document.querySelector("#manifestFacts"),
  syncFacts: document.querySelector("#syncFacts"),
  sequenceGrid: document.querySelector("#sequenceGrid"),
};

function padFrame(frame) {
  return String(frame).padStart(3, "0");
}

function titleCase(value) {
  return value
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function activeSkin() {
  return SKINS.find((skin) => skin.id === app.skin);
}

function packageBase() {
  return activeSkin()[app.packageType];
}

function sequenceKind(name) {
  return app.manifest.states[name] ? "state" : "transition";
}

function sequenceDef(name) {
  return sequenceKind(name) === "state"
    ? app.manifest.states[name]
    : app.manifest.transitions[name];
}

function sequenceNames() {
  const stateNames = app.manifest.stateOrder.filter(
    (name) => app.manifest.states[name]?.available !== false,
  );
  const transitionNames = app.manifest.transitionOrder.filter(
    (name) => app.manifest.transitions[name]?.available !== false,
  );
  return [...stateNames, ...transitionNames];
}

function frameUrl(name, frame, size = app.size) {
  const frameId = padFrame(frame);
  const skin = app.manifest.skin;
  const kind = sequenceKind(name);
  const base = packageBase();
  let template;

  if (kind === "transition") {
    template =
      size === 512 && app.manifest.transitionSourcePathTemplate
        ? app.manifest.transitionSourcePathTemplate
        : app.manifest.transitionPathTemplate;
    return `${base}/${template
      .replaceAll("{size}", size)
      .replaceAll("{transition}", name)
      .replaceAll("{frame}", frameId)}`;
  }

  template =
    size === 512 && app.manifest.sourcePathTemplate
      ? app.manifest.sourcePathTemplate
      : app.manifest.pathTemplate;
  return `${base}/${template
    .replaceAll("{size}", size)
    .replaceAll("{state}", name)
    .replaceAll("{frame}", frameId)
    .replaceAll("{skin}", skin)}`;
}

function renderSegment(container, options, value, onSelect) {
  container.innerHTML = "";
  for (const option of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.label;
    button.disabled = option.disabled || false;
    button.setAttribute("aria-pressed", String(option.id === value));
    button.addEventListener("click", () => onSelect(option.id));
    container.append(button);
  }
}

function availableSizes() {
  return Object.keys(app.manifest.exports)
    .map(Number)
    .sort((a, b) => a - b);
}

function ensureSize() {
  const sizes = availableSizes();
  if (!sizes.includes(app.size)) {
    app.size = sizes.includes(128) ? 128 : sizes[sizes.length - 1];
  }
}

async function loadManifest() {
  const response = await fetch(`${packageBase()}/manifest.json`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load manifest: ${response.status}`);
  }
  app.manifest = await response.json();
  ensureSize();
  if (!sequenceNames().includes(app.selected)) {
    app.selected = "idle";
  }
  app.frame = 0;
}

function renderControls() {
  renderSegment(
    els.skinTabs,
    SKINS.map((skin) => ({ id: skin.id, label: skin.label })),
    app.skin,
    async (id) => {
      app.skin = id;
      await refresh();
    },
  );

  renderSegment(els.packageTabs, PACKAGE_OPTIONS, app.packageType, async (id) => {
    app.packageType = id;
    await refresh();
  });

  renderSegment(
    els.sizeTabs,
    availableSizes().map((size) => ({ id: size, label: `${size}` })),
    app.size,
    (size) => {
      app.size = Number(size);
      app.frame = Math.min(app.frame, sequenceDef(app.selected).frames - 1);
      renderAll();
    },
  );

  renderSegment(els.backgroundTabs, BACKGROUNDS, app.background, (id) => {
    app.background = id;
    renderAll();
  });
}

function setBackgroundClasses(node) {
  node.classList.remove("checker", "light", "dark");
  node.classList.add(app.background);
}

function renderStage() {
  const def = sequenceDef(app.selected);
  app.frame %= def.frames;
  els.sequenceTitle.textContent = titleCase(app.selected);
  els.sequenceMeta.textContent = `${def.frames} frames · ${def.fps} fps · ${
    def.loop ? "loop" : "one-shot"
  }`;
  els.stageImage.src = frameUrl(app.selected, app.frame);
  els.stageImage.alt = `${app.skin} ${app.selected} frame ${app.frame}`;
  setBackgroundClasses(els.stageFrame);
  els.stageFrame.classList.toggle("safe", els.safeZoneInput.checked);
  els.playToggle.textContent = app.playing ? "Pause" : "Play";
}

function renderTimeline() {
  const def = sequenceDef(app.selected);
  els.timeline.innerHTML = "";
  for (let index = 0; index < def.frames; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "frameThumb";
    button.classList.toggle("active", index === app.frame);
    button.addEventListener("click", () => {
      app.frame = index;
      app.playing = false;
      renderStage();
      renderTimeline();
    });

    const img = document.createElement("img");
    img.alt = "";
    img.src = frameUrl(app.selected, index);

    const label = document.createElement("span");
    label.textContent = padFrame(index);

    button.append(img, label);
    els.timeline.append(button);
  }
}

function renderFacts(target, rows) {
  target.innerHTML = "";
  for (const [key, value] of rows) {
    const dt = document.createElement("dt");
    dt.textContent = key;
    const dd = document.createElement("dd");
    dd.textContent = value;
    target.append(dt, dd);
  }
}

function renderInfo() {
  const manifest = app.manifest;
  const sync = manifest.playback?.syncTransitions?.running_to_judging;
  els.activePath.textContent = `${packageBase()} · ${app.size}px`;
  renderFacts(els.manifestFacts, [
    ["Skin", manifest.skin],
    ["Display", manifest.displayName],
    ["Version", manifest.assetVersion],
    ["Package", manifest.packageType],
    ["States", sequenceNames().filter((name) => manifest.states[name]).length],
    ["Transitions", sequenceNames().filter((name) => manifest.transitions[name]).length],
  ]);
  renderFacts(els.syncFacts, [
    ["Policy", manifest.playback?.loopingStateSwitchPolicy?.mode || "none"],
    ["Frames", sync?.compatibleEntryFrames?.join(", ") || "none"],
    ["Max wait", sync?.maxWaitMs ? `${sync.maxWaitMs} ms` : "none"],
    ["Fallback", manifest.playback?.loopingStateSwitchPolicy?.fallback || "none"],
  ]);
}

function renderGrid() {
  els.sequenceGrid.innerHTML = "";
  for (const name of sequenceNames()) {
    const def = sequenceDef(name);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "sequenceCard";
    card.classList.toggle("active", name === app.selected);
    card.dataset.sequence = name;
    card.addEventListener("click", () => {
      app.selected = name;
      app.frame = 0;
      app.playing = true;
      renderAll();
    });

    const mini = document.createElement("span");
    mini.className = `miniFrame ${app.background}`;
    const img = document.createElement("img");
    img.alt = "";
    img.dataset.sequenceImage = name;
    img.src = frameUrl(name, 0, Math.min(app.size, 128));
    mini.append(img);

    const body = document.createElement("span");
    const title = document.createElement("span");
    title.className = "sequenceName";
    title.textContent = titleCase(name);
    const stats = document.createElement("span");
    stats.className = "sequenceStats";
    stats.textContent = `${def.frames}f · ${def.fps}fps · ${
      sequenceKind(name) === "state" ? "state" : "transition"
    }`;
    body.append(title, stats);

    card.append(mini, body);
    els.sequenceGrid.append(card);
  }
}

function renderAll() {
  renderControls();
  renderStage();
  renderTimeline();
  renderInfo();
  renderGrid();
}

async function refresh() {
  try {
    await loadManifest();
    renderAll();
  } catch (error) {
    els.sequenceGrid.innerHTML = `<div class="errorBox">${error.message}</div>`;
  }
}

function advanceStage(now) {
  const def = sequenceDef(app.selected);
  const interval = 1000 / (def.fps * app.speed);
  if (now - app.lastTick < interval) return;
  app.lastTick = now;
  if (app.playing) {
    app.frame = (app.frame + 1) % def.frames;
    if (!def.loop && app.frame === 0) {
      app.playing = false;
    }
    renderStage();
    for (const thumb of els.timeline.querySelectorAll(".frameThumb")) {
      thumb.classList.remove("active");
    }
    els.timeline.children[app.frame]?.classList.add("active");
  }
}

function advanceCards(now) {
  if (now - app.cardFrameClock < 85) return;
  app.cardFrameClock = now;
  for (const img of els.sequenceGrid.querySelectorAll("[data-sequence-image]")) {
    const name = img.dataset.sequenceImage;
    const def = sequenceDef(name);
    const frame = Math.floor((now / 1000) * def.fps * app.speed) % def.frames;
    img.src = frameUrl(name, frame, Math.min(app.size, 128));
  }
}

function tick(now) {
  if (app.manifest) {
    advanceStage(now);
    advanceCards(now);
  }
  requestAnimationFrame(tick);
}

els.playToggle.addEventListener("click", () => {
  app.playing = !app.playing;
  renderStage();
});

els.safeZoneInput.addEventListener("change", renderStage);

els.speedInput.addEventListener("input", () => {
  app.speed = Number(els.speedInput.value);
  els.speedOutput.textContent = `${app.speed}x`;
});

refresh();
requestAnimationFrame(tick);
