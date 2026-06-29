const dataUrl = "../outputs/coding-coach-pet-v7-acting-profiles.json";
const stateTransitions = {
  reading: "reading_to_running",
  running: "running_to_judging",
  judging: "judging_to_success / judging_to_needs-fix",
};

const profileSummary = document.querySelector("#profileSummary");
const stateMatrix = document.querySelector("#stateMatrix");
const qaGates = document.querySelector("#qaGates");

function titleCase(value) {
  return value
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function chip(text) {
  const span = document.createElement("span");
  span.className = "chip";
  span.textContent = text;
  return span;
}

function renderProfiles(data) {
  profileSummary.innerHTML = "";
  for (const pet of Object.values(data.pets)) {
    const card = document.createElement("article");
    card.className = "profileCard";

    const head = document.createElement("div");
    head.className = "petHead";
    const name = document.createElement("div");
    name.className = "petName";
    name.textContent = pet.displayName;
    const role = document.createElement("div");
    role.className = `roleTag ${pet.role === "new pet" ? "new" : ""}`;
    role.textContent = pet.role;
    head.append(name, role);

    const summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = pet.actingProfile.summary;

    const chips = document.createElement("div");
    chips.className = "chips";
    for (const item of pet.actingProfile.motionLanguage) {
      chips.append(chip(item));
    }

    card.append(head, summary, chips);
    profileSummary.append(card);
  }
}

function renderMatrix(data) {
  stateMatrix.innerHTML = "";
  const blank = document.createElement("div");
  blank.className = "matrixHeader";
  blank.textContent = "State";
  stateMatrix.append(blank);

  for (const pet of Object.values(data.pets)) {
    const header = document.createElement("div");
    header.className = "matrixHeader";
    header.textContent = pet.displayName;
    stateMatrix.append(header);
  }

  for (const state of data.stateOrder) {
    const label = document.createElement("div");
    label.className = "stateLabel";
    label.textContent = titleCase(state);
    stateMatrix.append(label);

    for (const pet of Object.values(data.pets)) {
      const card = document.createElement("article");
      card.className = "stateCard";
      const h3 = document.createElement("h3");
      h3.textContent = pet.actingProfile.id;
      const gesture = document.createElement("div");
      gesture.className = "gesture";
      gesture.textContent = pet.actingProfile.stateGestures[state];
      card.append(h3, gesture);

      const transitionKeys = Object.keys(pet.actingProfile.transitionGestures).filter((key) =>
        key.startsWith(`${state}_`),
      );
      if (stateTransitions[state] || transitionKeys.length) {
        const transition = document.createElement("div");
        transition.className = "transition";
        const text = transitionKeys
          .map((key) => `${titleCase(key)}: ${pet.actingProfile.transitionGestures[key]}`)
          .join(" | ");
        transition.innerHTML = `<strong>Transition</strong> ${text || stateTransitions[state]}`;
        card.append(transition);
      }

      stateMatrix.append(card);
    }
  }
}

function renderQa(data) {
  qaGates.innerHTML = "";
  const h2 = document.createElement("h2");
  h2.textContent = "QA Gates";
  const list = document.createElement("ol");
  for (const gate of data.qaGates) {
    const li = document.createElement("li");
    li.textContent = gate;
    list.append(li);
  }
  qaGates.append(h2, list);
}

async function main() {
  try {
    const response = await fetch(dataUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load acting profiles: ${response.status}`);
    const data = await response.json();
    renderProfiles(data);
    renderMatrix(data);
    renderQa(data);
  } catch (error) {
    profileSummary.innerHTML = `<div class="error">${error.message}</div>`;
  }
}

main();
