const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const mobileMenu = document.querySelector("#mobile-menu");
const durationInput = document.querySelector("[data-duration-input]");
const priceInput = document.querySelector("[data-price-input]");
const summary = document.querySelector("[data-booking-summary]");
const bookingForm = document.querySelector("[data-booking-form]");
const bodyZonesInput = document.querySelector("[data-body-zones-input]");
const sensationsInput = document.querySelector("[data-sensations-input]");
const pressureInput = document.querySelector("[data-pressure-input]");
const toneInput = document.querySelector("[data-tone-input]");
const recommendationInput = document.querySelector("[data-recommendation-input]");
const compassInput = document.querySelector("[data-compass-input]");
const sessionMapOutput = document.querySelector("[data-session-map-output]");
const focusSelect = document.querySelector("[data-focus-select]");
const bioPhoto = document.querySelector("[data-bio-photo]");
const compassTitle = document.querySelector("[data-compass-title]");
const compassSummary = document.querySelector("[data-compass-summary]");
const compassDuration = document.querySelector("[data-compass-duration]");
const compassPressure = document.querySelector("[data-compass-pressure]");
const compassPrep = document.querySelector("[data-compass-prep]");
const compassJournal = document.querySelector("[data-compass-journal]");
const compassApply = document.querySelector("[data-compass-apply]");
const notesField = document.querySelector("[data-notes-field]");
const ritualTitle = document.querySelector("[data-ritual-title]");
const ritualSummary = document.querySelector("[data-ritual-summary]");
const ritualWater = document.querySelector("[data-ritual-water]");
const ritualBody = document.querySelector("[data-ritual-body]");
const ritualReturn = document.querySelector("[data-ritual-return]");
const ritualApply = document.querySelector("[data-ritual-apply]");
const pricingModeButtons = document.querySelectorAll("[data-pricing-mode]");
const priceCards = document.querySelectorAll("[data-price-card]");
const durationButtons = document.querySelectorAll("[data-duration]");

const sessionMap = {
  zones: new Set(),
  sensations: new Set(),
  pressure: "light, nervous-system safe pressure",
  tone: "quiet grounding",
  recommendation: "",
};

const compassState = {
  goal: "stress",
  body: "sensitive",
  tone: "quiet",
  recommendation: "",
};

const ritualState = {
  focus: "reset",
  pace: "quiet",
  window: "today",
};

const compassPathways = {
  prenatal: {
    title: "Prenatal comfort massage",
    focus: "Prenatal comfort",
    duration: "90 minutes",
    pressure: "light, nervous-system safe pressure",
    tone: "quiet grounding",
    summary: "Side-lying comfort, bolstered hips and low back, gentle foot and ankle support, and provider-guided prenatal caution.",
    prep: "Share pregnancy stage, positioning needs, and any medical guidance before confirming.",
    journal: "journal/prenatal-comfort.html",
  },
  lymph: {
    title: "Lymphatic flow",
    focus: "Lymphatic flow",
    duration: "60 minutes",
    pressure: "light, nervous-system safe pressure",
    tone: "gentle conversation and coaching",
    summary: "Gentle rhythmic work for heaviness, swelling, travel fatigue, and a body that wants care without intensity.",
    prep: "Arrive hydrated and note swelling, recent travel, pregnancy, or provider guidance.",
    journal: "journal/prenatal-comfort.html",
  },
  headache: {
    title: "Head, jaw, and headache care",
    focus: "Head, jaw, and headache care",
    duration: "60 minutes",
    pressure: "focused structural pressure only where requested",
    tone: "gentle conversation and coaching",
    summary: "Focused scalp, jaw, neck, and shoulder work with clear pressure boundaries and frequent check-ins.",
    prep: "Share clenching patterns, screen strain, headache location, and pressure sensitivity.",
    journal: "journal/nervous-system-safe-touch.html",
  },
  restorative: {
    title: "Restorative therapeutic massage",
    focus: "Restorative therapeutic massage",
    duration: "90 minutes",
    pressure: "medium therapeutic pressure with frequent check-ins",
    tone: "gentle conversation and coaching",
    summary: "A flexible therapeutic session for hips, low back, posture, mobility, and whole-body restoration.",
    prep: "Mark the body areas that need focused work and the areas that need gentler pacing.",
    journal: "journal/nervous-system-safe-touch.html",
  },
  ritual: {
    title: "Energy-grounding ritual",
    focus: "Restorative therapeutic massage",
    duration: "120 minutes",
    pressure: "light, nervous-system safe pressure",
    tone: "water-inspired ritual and deep rest",
    summary: "A longer quiet session with breath, stillness, warm grounding, and slow transitions back into the day.",
    prep: "Choose ritual tone and share whether you want silence, aromatics, or guided grounding.",
    journal: "journal/water-breath-return.html",
  },
  nervous: {
    title: "Nervous-system reset",
    focus: "Nervous-system reset",
    duration: "90 minutes",
    pressure: "light, nervous-system safe pressure",
    tone: "quiet grounding",
    summary: "Quiet grounding, feather-light pressure, and slow breath-led work for a sensitive body carrying stress.",
    prep: "Arrive hydrated, share pressure boundaries, and choose silence or gentle guidance.",
    journal: "journal/nervous-system-safe-touch.html",
  },
};

const ritualFocus = {
  reset: {
    title: "Nervous-system landing",
    summary: "Keep the first hour soft: water nearby, dimmer light, loose clothing, and no immediate rush back into high-output tasks.",
    water: "Drink a full glass of water within the first hour, then sip steadily.",
    body: "Notice breath, jaw, shoulders, and the places that are no longer guarding as hard.",
    return: "Choose one small boundary for the rest of the day so the work can settle.",
  },
  prenatal: {
    title: "Prenatal comfort landing",
    summary: "Protect the softness after the session with side-lying rest, slow transitions, and support under the belly, knees, or low back.",
    water: "Sip water steadily and keep a snack nearby if pregnancy hunger or lightheadedness tends to arrive quickly.",
    body: "Notice hips, feet, low back, breath, and any swelling patterns Rose should track next time.",
    return: "Avoid stacking errands right after care when possible; give the body a clear landing window.",
  },
  relief: {
    title: "Focused relief integration",
    summary: "Let the treated area learn the new signal before testing it. Gentle movement is better than proving the tension is gone.",
    water: "Hydrate before caffeine or alcohol so tissue work has a calmer recovery window.",
    body: "Check the original pattern with curiosity: jaw clenching, shoulder lift, hip gripping, or low-back guarding.",
    return: "Use one slow range-of-motion check today and save heavier activity for when the body feels steady.",
  },
  flow: {
    title: "Lymph flow support",
    summary: "Keep the body warm, uncompressed, and gently moving so the session's light rhythm can continue.",
    water: "Sip water often and choose mineral-rich food if the body feels depleted.",
    body: "Notice rings, socks, ankles, face, and whole-body heaviness without forcing change.",
    return: "Take a short, easy walk or ankle pumps; skip tight waistbands and aggressive heat.",
  },
};

const ritualPace = {
  quiet: "Keep sound low and choose silence for the first transition after the session.",
  guided: "Write down one sentence Rose said or one body cue you want to remember.",
  ritual: "Add warm light, water, and one slow breath cycle before stepping back into the day.",
};

const ritualWindow = {
  today: "Today: preserve one pocket of quiet before normal demands return.",
  tonight: "Tonight: dim the room, loosen the jaw, and let sleep be part of the treatment.",
  tomorrow: "Tomorrow: notice what changed before deciding what still needs care.",
};

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const syncPricingMode = (mode) => {
  if (!priceCards.length) return;

  const isMembership = mode === "membership";
  priceCards.forEach((card) => {
    const value = card.querySelector("[data-price-value]");
    const label = card.querySelector("[data-price-label]");
    if (value) value.textContent = isMembership ? card.dataset.memberPrice : card.dataset.onetimePrice;
    if (label) label.textContent = isMembership ? card.dataset.memberLabel : card.dataset.onetimeLabel;
  });
};

pricingModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.pricingMode || "one-time";
    pricingModeButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    syncPricingMode(mode);
  });
});

syncPricingMode("one-time");

if (bioPhoto) {
  bioPhoto.addEventListener("error", () => {
    bioPhoto.closest(".bio-photo")?.classList.add("is-missing");
  });
}

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    }
  });
}

const selectDuration = (duration) => {
  const button = [...durationButtons].find((item) => item.dataset.duration === duration);
  if (!button) return;

  durationButtons.forEach((item) => {
    item.classList.remove("is-selected");
  });
  button.classList.add("is-selected");
  if (durationInput) durationInput.value = button.dataset.duration;
  if (priceInput) priceInput.value = button.dataset.price;
};

durationButtons.forEach((button) => {
  button.addEventListener("click", () => selectDuration(button.dataset.duration));
});

const applyBookingIntent = () => {
  if (!bookingForm) return;

  const params = new URLSearchParams(window.location.search);
  const focus = params.get("focus");
  const duration = params.get("duration");
  const note = params.get("note");

  if (focusSelect && focus) {
    const option = [...focusSelect.options].find((item) => item.value === focus || item.textContent === focus);
    if (option) focusSelect.value = option.value;
  }

  if (duration) selectDuration(duration);

  if (notesField && note && !notesField.value) {
    notesField.value = note;
  }
};

applyBookingIntent();

if (document.querySelector("[data-panorama-viewer]")) {
  import("./panorama-viewer.js")
    .then(({ initializePanoramaViewers }) => initializePanoramaViewers())
    .catch(() => {
      document.querySelectorAll("[data-panorama-viewer]").forEach((viewer) => {
        viewer.classList.add("has-panorama-fallback");
        const fallback = viewer.querySelector("[data-panorama-fallback]");
        const canvas = viewer.querySelector("[data-panorama-canvas]");
        if (fallback) fallback.hidden = false;
        if (canvas) canvas.hidden = true;
      });
    });
}

const listText = (items, fallback) => {
  const values = [...items];
  if (!values.length) return fallback;
  if (values.length === 1) return values[0];
  return `${values.slice(0, -1).join(", ")} and ${values.at(-1)}`;
};

const getRecommendation = () => {
  const zones = [...sessionMap.zones].join(" ");
  const sensations = [...sessionMap.sensations].join(" ");
  const combined = `${zones} ${sensations}`.toLowerCase();

  if (combined.includes("prenatal") || combined.includes("belly")) return "Prenatal comfort massage";
  if (combined.includes("swelling") || combined.includes("feet") || combined.includes("ankles")) return "Lymphatic flow";
  if (combined.includes("head") || combined.includes("jaw") || combined.includes("scalp")) return "Head, jaw, and headache care";
  if (combined.includes("nervous") || combined.includes("stress") || combined.includes("bracing") || combined.includes("breath")) return "Nervous-system reset";
  if (combined.includes("hips") || combined.includes("back") || combined.includes("sacrum")) return "Restorative therapeutic massage";
  return "";
};

const syncSessionMap = () => {
  sessionMap.recommendation = getRecommendation();

  if (bodyZonesInput) bodyZonesInput.value = [...sessionMap.zones].join(", ");
  if (sensationsInput) sensationsInput.value = [...sessionMap.sensations].join(", ");
  if (pressureInput) pressureInput.value = sessionMap.pressure;
  if (toneInput) toneInput.value = sessionMap.tone;
  if (recommendationInput) recommendationInput.value = sessionMap.recommendation;

  if (!sessionMapOutput) return;

  if (!sessionMap.zones.size) {
    sessionMapOutput.textContent = "Choose one or more body areas to begin your session map.";
    return;
  }

  const zones = listText(sessionMap.zones, "your selected areas");
  const sensations = listText(sessionMap.sensations, "general discomfort");
  const recommendation = sessionMap.recommendation ? ` Suggested pathway: ${sessionMap.recommendation}.` : "";
  sessionMapOutput.textContent = `Session map: ${zones}. Feeling: ${sensations}. Pressure: ${sessionMap.pressure}. Tone: ${sessionMap.tone}.${recommendation}`;
};

document.querySelectorAll("[data-zone]").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.zone;
    if (!value) return;
    const isSelected = sessionMap.zones.has(value);
    if (isSelected) {
      sessionMap.zones.delete(value);
    } else {
      sessionMap.zones.add(value);
    }
    button.classList.toggle("is-selected", !isSelected);
    button.setAttribute("aria-pressed", String(!isSelected));
    syncSessionMap();
  });
});

document.querySelectorAll("[data-sensation]").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.sensation;
    if (!value) return;
    const isSelected = sessionMap.sensations.has(value);
    if (isSelected) {
      sessionMap.sensations.delete(value);
    } else {
      sessionMap.sensations.add(value);
    }
    button.classList.toggle("is-selected", !isSelected);
    button.setAttribute("aria-pressed", String(!isSelected));
    syncSessionMap();
  });
});

const setSingleChoice = (selector, valueKey, stateKey) => {
  document.querySelectorAll(selector).forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(selector).forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-selected");
      button.setAttribute("aria-pressed", "true");
      sessionMap[stateKey] = button.dataset[valueKey];
      syncSessionMap();
    });
  });
};

setSingleChoice("[data-pressure]", "pressure", "pressure");
setSingleChoice("[data-tone]", "tone", "tone");
syncSessionMap();

const getCompassPathway = () => {
  if (compassState.goal === "prenatal") return compassPathways.prenatal;
  if (compassState.goal === "ritual" || compassState.tone === "ceremonial") return compassPathways.ritual;
  if (compassState.body === "swollen") return compassPathways.lymph;
  if (compassState.body === "clenched") return compassPathways.headache;
  if (compassState.goal === "pain" || compassState.body === "hips") return compassPathways.restorative;
  return compassPathways.nervous;
};

const getCompassTone = () => {
  if (compassState.tone === "guided") return "gentle conversation and coaching";
  if (compassState.tone === "ceremonial") return "water-inspired ritual and deep rest";
  return "quiet grounding";
};

const syncCompass = () => {
  const pathway = getCompassPathway();
  const tone = getCompassTone();
  compassState.recommendation = pathway.title;

  if (compassTitle) compassTitle.textContent = pathway.title;
  if (compassSummary) compassSummary.textContent = pathway.summary;
  if (compassDuration) compassDuration.textContent = pathway.duration;
  if (compassPressure) compassPressure.textContent = pathway.pressure;
  if (compassPrep) compassPrep.textContent = pathway.prep;
  if (compassJournal) compassJournal.href = pathway.journal;
  if (compassInput) {
    compassInput.value = `${pathway.title}; ${pathway.duration}; ${pathway.pressure}; ${tone}. Prep: ${pathway.prep}`;
  }
};

document.querySelectorAll("[data-compass-key]").forEach((button) => {
  button.addEventListener("click", () => {
    const { compassKey, compassValue } = button.dataset;
    if (!compassKey || !compassValue) return;

    document.querySelectorAll(`[data-compass-key="${compassKey}"]`).forEach((item) => {
      item.classList.remove("is-selected");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("is-selected");
    button.setAttribute("aria-pressed", "true");
    compassState[compassKey] = compassValue;
    syncCompass();
  });
});

const clickMatchingButton = (selector, value) => {
  const match = [...document.querySelectorAll(selector)].find((button) => button.dataset.duration === value || button.dataset.pressure === value || button.dataset.tone === value);
  match?.click();
};

if (compassApply) {
  compassApply.addEventListener("click", () => {
    const pathway = getCompassPathway();
    const tone = getCompassTone();
    if (focusSelect) focusSelect.value = pathway.focus;
    clickMatchingButton("[data-duration]", pathway.duration);
    clickMatchingButton("[data-pressure]", pathway.pressure);
    clickMatchingButton("[data-tone]", tone);
    if (recommendationInput) recommendationInput.value = pathway.title;
    if (compassInput) {
      compassInput.value = `${pathway.title}; ${pathway.duration}; ${pathway.pressure}; ${tone}. Prep: ${pathway.prep}`;
    }
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

syncCompass();

const getRitualPlan = () => {
  const focus = ritualFocus[ritualState.focus] || ritualFocus.reset;
  const pace = ritualPace[ritualState.pace] || ritualPace.quiet;
  const window = ritualWindow[ritualState.window] || ritualWindow.today;
  return {
    ...focus,
    return: `${focus.return} ${pace} ${window}`,
  };
};

const syncRitual = () => {
  const plan = getRitualPlan();
  if (ritualTitle) ritualTitle.textContent = plan.title;
  if (ritualSummary) ritualSummary.textContent = plan.summary;
  if (ritualWater) ritualWater.textContent = plan.water;
  if (ritualBody) ritualBody.textContent = plan.body;
  if (ritualReturn) ritualReturn.textContent = plan.return;
};

document.querySelectorAll("[data-ritual-key]").forEach((button) => {
  button.addEventListener("click", () => {
    const { ritualKey, ritualValue } = button.dataset;
    if (!ritualKey || !ritualValue) return;

    document.querySelectorAll(`[data-ritual-key="${ritualKey}"]`).forEach((item) => {
      item.classList.remove("is-selected");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("is-selected");
    button.setAttribute("aria-pressed", "true");
    ritualState[ritualKey] = ritualValue;
    syncRitual();
  });
});

if (ritualApply) {
  ritualApply.addEventListener("click", () => {
    const plan = getRitualPlan();
    const ritualNote = `Aftercare request: ${plan.title}. ${plan.summary} Water: ${plan.water} Body: ${plan.body} Return: ${plan.return}`;
    if (notesField) {
      notesField.value = notesField.value ? `${notesField.value}\n\n${ritualNote}` : ritualNote;
    }
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

syncRitual();

const journalLibrary = document.querySelector("[data-journal-library]");

if (journalLibrary) {
  const cards = [...journalLibrary.querySelectorAll("[data-journal-card]")];
  const pageSizeSelect = journalLibrary.querySelector("[data-journal-page-size]");
  const rangeLabel = journalLibrary.querySelector("[data-journal-showing]");
  const pageLabel = journalLibrary.querySelector("[data-journal-page-label]");
  const previousButton = journalLibrary.querySelector("[data-journal-prev]");
  const nextButton = journalLibrary.querySelector("[data-journal-next]");
  const filterButtons = [...document.querySelectorAll("[data-journal-filter]")];
  let currentPage = 1;
  let activeFilter = "all";

  const getPageSize = () => Number(pageSizeSelect?.value || 12);
  const getVisibleCards = () =>
    activeFilter === "all" ? cards : cards.filter((card) => card.dataset.journalCategory === activeFilter);

  const getActiveFilterLabel = () => {
    const button = filterButtons.find((filterButton) => filterButton.dataset.journalFilter === activeFilter);
    return button?.childNodes[0]?.textContent?.trim() || "";
  };

  const syncJournalLibrary = () => {
    const visibleCards = getVisibleCards();
    const pageSize = getPageSize();
    const totalPages = Math.max(1, Math.ceil(visibleCards.length / pageSize));
    currentPage = Math.min(currentPage, totalPages);

    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, visibleCards.length);

    cards.forEach((card) => {
      const filteredIndex = visibleCards.indexOf(card);
      card.hidden = filteredIndex === -1 || filteredIndex < start || filteredIndex >= end;
    });

    if (rangeLabel) {
      const filterLabel = activeFilter === "all" ? "" : ` in ${getActiveFilterLabel()}`;
      rangeLabel.textContent = visibleCards.length
        ? `Showing ${start + 1}-${end} of ${visibleCards.length} articles${filterLabel}`
        : "No articles match this filter";
    }

    if (pageLabel) {
      pageLabel.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    if (previousButton) previousButton.disabled = currentPage === 1;
    if (nextButton) nextButton.disabled = currentPage === totalPages;
  };

  pageSizeSelect?.addEventListener("change", () => {
    currentPage = 1;
    syncJournalLibrary();
  });

  previousButton?.addEventListener("click", () => {
    currentPage = Math.max(1, currentPage - 1);
    syncJournalLibrary();
    journalLibrary.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  nextButton?.addEventListener("click", () => {
    currentPage += 1;
    syncJournalLibrary();
    journalLibrary.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.journalFilter || "all";
      currentPage = 1;

      filterButtons.forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("is-selected", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });

      syncJournalLibrary();
      journalLibrary.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  syncJournalLibrary();
}

if (bookingForm && summary) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const name = formData.get("name");
    const focus = formData.get("focus");
    const duration = formData.get("duration");
    const price = formData.get("price");
    const bodyZones = formData.get("bodyZones");
    const sensations = formData.get("sensations");
    const pressure = formData.get("pressure");
    const tone = formData.get("tone");
    const recommendation = formData.get("recommendation");
    const careCompass = formData.get("careCompass");

    summary.hidden = false;
    summary.replaceChildren();

    const title = document.createElement("strong");
    title.textContent = "Request preview";

    summary.append(
      title,
      document.createElement("br"),
      document.createTextNode(`${name}, your ${duration} ${focus} request draft is ready. Session rate: ${price}.`),
      document.createElement("br"),
      document.createTextNode("Review these details before sending them through Rose's confirmed contact method. Rose will confirm timing, comfort needs, and the best appointment path before care."),
    );

    if (bodyZones) {
      summary.append(
        document.createElement("br"),
        document.createTextNode(`Session map: ${bodyZones}. Sensations: ${sensations || "not specified"}. Pressure: ${pressure}. Tone: ${tone}.`),
      );
    }

    if (recommendation) {
      summary.append(
        document.createElement("br"),
        document.createTextNode(`Suggested care pathway from the map: ${recommendation}.`),
      );
    }

    if (careCompass) {
      summary.append(
        document.createElement("br"),
        document.createTextNode(`Care Compass: ${careCompass}`),
      );
    }
  });
}
