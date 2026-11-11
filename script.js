const weeksEl = document.getElementById("weeks");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const targetDateEl = document.getElementById("target-date");
const messageEl = document.getElementById("message");
const messageBoxEl = document.getElementById("message-box");

const musicToggle = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");
const snowToggle = document.getElementById("snow-toggle");
const snowLabel = document.getElementById("snow-label");
const shareButton = document.getElementById("share-button");
const shareLabel = document.getElementById("share-label");
const factTextEl = document.getElementById("fact-text");
const sleepsNumberEl = document.getElementById("sleeps-number");
const sleepsLabelEl = document.getElementById("sleeps-label");
const seasonalLineEl = document.getElementById("seasonal-line");
const adventGridEl = document.getElementById("advent-grid");
const adventStatusEl = document.getElementById("advent-status");
const adventBadgeEl = document.getElementById("advent-badge");
const adventRevealEl = document.getElementById("advent-reveal");
const adventRevealKickerEl = document.getElementById("advent-reveal-kicker");
const adventRevealTitleEl = document.getElementById("advent-reveal-title");
const adventRevealTextEl = document.getElementById("advent-reveal-text");

function pad(value) {
  return String(value).padStart(2, "0");
}

function getChristmasTarget(now) {
  let year = now.getFullYear();
  const endOfChristmasDay = new Date(year, 11, 26, 0, 0, 0, 0);

  if (now >= endOfChristmasDay) {
    year += 1;
  }

  return new Date(year, 11, 25, 0, 0, 0, 0);
}


function updateBrowserTitle(now, christmas) {
  const msDay = 1000 * 60 * 60 * 24;
  const remainingMs = Math.max(0, christmas.getTime() - now.getTime());
  const daysRemaining = Math.ceil(remainingMs / msDay);

  const christmasEnd = new Date(
    christmas.getFullYear(),
    11,
    26,
    0,
    0,
    0,
    0
  );

  if (now >= christmas && now < christmasEnd) {
    document.title = "Merry Christmas! · Christmas Countdown";
    return;
  }

  const dayWord = daysRemaining === 1 ? "day" : "days";
  document.title = `${daysRemaining} ${dayWord} · Countdown to Christmas`;
}


function countSaturdaysUntilChristmas(now, christmas) {
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(christmas.getFullYear(), christmas.getMonth(), christmas.getDate());
  let count = 0;

  while (cursor < end) {
    if (cursor.getDay() === 6) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

function updatePersonalCountdown(now, christmas) {
  if (!sleepsNumberEl || !seasonalLineEl) return;

  const msDay = 1000 * 60 * 60 * 24;
  const christmasEnd = new Date(christmas.getFullYear(), 11, 26, 0, 0, 0, 0);

  if (now >= christmas && now < christmasEnd) {
    sleepsNumberEl.textContent = "0";
    sleepsLabelEl.textContent = "sleeps — Christmas is here";
    seasonalLineEl.textContent = "Merry Christmas! 🎄";
    return;
  }

  const sleeps = Math.max(0, Math.ceil((christmas.getTime() - now.getTime()) / msDay));
  const saturdays = countSaturdaysUntilChristmas(now, christmas);

  sleepsNumberEl.textContent = sleeps;
  sleepsLabelEl.textContent = sleeps === 1 ? "sleep until Christmas" : "sleeps until Christmas";

  let message;
  if (sleeps > 60) {
    message = "Plenty of time for plans, lists and a little festive anticipation.";
  } else if (sleeps > 30) {
    message = "The festive season is getting closer — the countdown is properly underway.";
  } else if (sleeps > 14) {
    message = "Christmas is within touching distance now.";
  } else if (sleeps > 7) {
    message = "Two weeks or less — the lights, music and festive plans are taking over.";
  } else if (sleeps > 1) {
    message = "This is the final festive stretch.";
  } else if (sleeps === 1) {
    message = "One more sleep. That’s it.";
  } else {
    message = "Christmas is here.";
  }

  const saturdayText =
    saturdays === 1 ? "1 Saturday left" : `${saturdays} Saturdays left`;
  seasonalLineEl.textContent = `${saturdayText} · ${message}`;
}

function updateCountdown() {
  const now = new Date();
  const christmas = getChristmasTarget(now);
  const christmasEnd = new Date(christmas.getFullYear(), 11, 26, 0, 0, 0, 0);

  updateBrowserTitle(now, christmas);
  updatePersonalCountdown(now, christmas);

  targetDateEl.textContent = `25 December ${christmas.getFullYear()}`;

  if (now >= christmas && now < christmasEnd) {
    weeksEl.textContent = "0";
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    messageEl.textContent = "🎅 Merry Christmas! 🎁";
    return;
  }

  let remaining = Math.max(0, christmas.getTime() - now.getTime());

  const msSecond = 1000;
  const msMinute = msSecond * 60;
  const msHour = msMinute * 60;
  const msDay = msHour * 24;

  const totalDays = Math.floor(remaining / msDay);
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  remaining %= msDay;
  const hours = Math.floor(remaining / msHour);

  remaining %= msHour;
  const minutes = Math.floor(remaining / msMinute);

  remaining %= msMinute;
  const seconds = Math.floor(remaining / msSecond);

  weeksEl.textContent = weeks;
  daysEl.textContent = days;
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  const sleeps = Math.ceil((christmas.getTime() - now.getTime()) / msDay);
  messageEl.textContent =
    sleeps === 1
      ? "🎁 Only 1 sleep until Christmas!"
      : `🎁 Only ${sleeps} sleeps until Christmas!`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* Christmas fact of the day */
const christmasFacts = [
  "The first commercial Christmas card was commissioned in London in 1843.",
  "Christmas crackers were invented in Victorian London by confectioner Tom Smith.",
  "The song Jingle Bells was first published in 1857.",
  "Silent Night was first performed in Austria on Christmas Eve in 1818.",
  "Tinsel was originally made from strands of real silver.",
  "The first electric Christmas tree lights were displayed in the 1880s.",
  "The twelve days of Christmas traditionally begin on Christmas Day.",
  "Mince pies once contained minced meat as well as fruit and spices.",
  "The robin became strongly associated with British Christmas cards during the Victorian era.",
  "The abbreviation Xmas has a long history: the X comes from the Greek letter chi.",
  "The Nutcracker ballet premiered in Saint Petersburg in 1892.",
  "Christmas stockings may be linked to legends about Saint Nicholas leaving secret gifts.",
  "Both male and female reindeer can grow antlers.",
  "Reindeer have specialised noses that help warm the cold air they breathe.",
  "Snowflakes form when water vapour freezes into ice crystals inside clouds.",
  "Holly has been used as a winter decoration for hundreds of years.",
  "A star is often placed on top of a Christmas tree to represent the Star of Bethlehem.",
  "An angel is another traditional Christmas tree topper.",
  "Father Christmas was originally more associated with festive cheer than delivering presents.",
  "Candy canes became associated with Christmas partly because their shape resembles a shepherd's crook.",
  "Some early artificial Christmas trees in Germany were made from dyed goose feathers.",
  "Boxing Day is celebrated on 26 December in the UK and several Commonwealth countries.",
  "The modern image of Santa Claus draws on traditions including Saint Nicholas and Father Christmas.",
  "In Sweden, Saint Lucia's Day on 13 December is an important part of the festive season.",
  "The large Christmas tree in Trafalgar Square is traditionally a gift from Oslo.",
  "Christmas markets in parts of Europe have traditions stretching back several centuries.",
  "A traditional British Christmas pudding is often made weeks before Christmas.",
  "The poinsettia is named after Joel Roberts Poinsett.",
  "The word Christmas comes from an Old English expression meaning Christ's Mass.",
  "Evergreen plants became winter symbols because they stay green when many other plants lose their leaves.",
  "Gingerbread houses became especially popular after the story Hansel and Gretel.",
  "In parts of Europe, Saint Nicholas Day is celebrated on 6 December.",
  "The phrase Merry Christmas has been used in English for hundreds of years.",
  "No two snowflakes are likely to have exactly the same detailed structure.",
  "Christmas wreaths are usually circular, a shape often associated with continuity."
];

function showFactOfTheDay() {
  if (!factTextEl) return;
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayNumber = Math.floor((now - start) / 86400000);
  factTextEl.textContent = christmasFacts[dayNumber % christmasFacts.length];
}
showFactOfTheDay();

/* Snow toggle */
let snowEnabled = true;

snowToggle.addEventListener("click", () => {
  snowEnabled = !snowEnabled;
  document.body.classList.toggle("snow-disabled", !snowEnabled);
  snowToggle.setAttribute("aria-pressed", String(snowEnabled));
  snowLabel.textContent = snowEnabled ? "Snow: On" : "Snow: Off";
  if (typeof createConfettiBurst === "function") createConfettiBurst(snowToggle, 32);
});

/* Music control: fuller Jingle Bells arrangement */
let audioContext = null;
let masterGain = null;
let musicEnabled = false;
let musicTimer = null;
let musicPos = 0;

// iPhone fallback: normal media playback is not muted by the Ring/Silent switch
// when started directly by a user gesture.
const isIPhone = /iPhone/i.test(navigator.userAgent);
let iphoneMusic = null;

function ensureIPhoneMusic() {
  if (!isIPhone) return null;
  if (!iphoneMusic) {
    iphoneMusic = new Audio("jingle-bells-iphone.wav");
    iphoneMusic.loop = true;
    iphoneMusic.preload = "auto";
    iphoneMusic.volume = 0.72;
  }
  return iphoneMusic;
}

const NOTES = {
  C3:130.81, D3:146.83, E3:164.81, F3:174.61, G3:196.00,
  C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392.00
};

const tune = [
  ["E4",1,"C3"],["E4",1,"C3"],["E4",2,"C3"],
  ["E4",1,"C3"],["E4",1,"C3"],["E4",2,"C3"],
  ["E4",1,"C3"],["G4",1,"G3"],["C4",1,"C3"],["D4",1,"G3"],["E4",4,"C3"],
  ["F4",1,"F3"],["F4",1,"F3"],["F4",1,"F3"],["F4",1,"F3"],
  ["F4",1,"F3"],["E4",1,"C3"],["E4",1,"C3"],["E4",0.5,"C3"],["E4",0.5,"C3"],
  ["E4",1,"C3"],["D4",1,"G3"],["D4",1,"G3"],["E4",1,"C3"],["D4",2,"G3"],["G4",2,"G3"],
  ["E4",1,"C3"],["E4",1,"C3"],["E4",2,"C3"],
  ["E4",1,"C3"],["E4",1,"C3"],["E4",2,"C3"],
  ["E4",1,"C3"],["G4",1,"G3"],["C4",1,"C3"],["D4",1,"G3"],["E4",4,"C3"],
  ["F4",1,"F3"],["F4",1,"F3"],["F4",1,"F3"],["F4",1,"F3"],
  ["F4",1,"F3"],["E4",1,"C3"],["E4",1,"C3"],["E4",0.5,"C3"],["E4",0.5,"C3"],
  ["G4",1,"G3"],["G4",1,"G3"],["F4",1,"F3"],["D4",1,"G3"],["C4",4,"C3"]
];
const beat = 285;

function ensureAudio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;

  // iOS may close the context when Safari / a Home Screen app is backgrounded.
  // Recreate it rather than trying to reuse a closed context.
  if (!audioContext || audioContext.state === "closed") {
    audioContext = new AC();

    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.11;

    const comp = audioContext.createDynamicsCompressor();
    masterGain.connect(comp);
    comp.connect(audioContext.destination);
  }

  return true;
}

function unlockAudioForIOS() {
  if (!audioContext) return;

  // Start a tiny silent buffer while we are still directly inside the user's tap.
  // This is a common way to unlock Web Audio on iPhone/iPad Safari and
  // Home Screen web apps without autoplaying audible sound.
  try {
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  } catch (error) {
    // If the silent unlock is not needed/supported, normal resume still follows.
  }
}

function tone(freq, dur, type="triangle", vol=.18, cutoff=1400, detune=0) {
  if (!freq || !audioContext) return;
  const now = audioContext.currentTime;
  const o = audioContext.createOscillator();
  const g = audioContext.createGain();
  const f = audioContext.createBiquadFilter();
  o.type = type;
  o.frequency.value = freq;
  o.detune.value = detune;
  f.type = "lowpass";
  f.frequency.value = cutoff;
  g.gain.setValueAtTime(.0001, now);
  g.gain.exponentialRampToValueAtTime(vol, now+.025);
  g.gain.exponentialRampToValueAtTime(.0001, now+dur);
  o.connect(f); f.connect(g); g.connect(masterGain);
  o.start(now); o.stop(now+dur+.03);
}

function playStep() {
  if (!musicEnabled) return;
  const [n,b,root] = tune[musicPos];
  const d = beat*b/1000;

  tone(NOTES[n], d*.9, "triangle", .23, 1700);
  tone(NOTES[n]*2, d*.82, "sine", .045, 2400);
  tone(NOTES[n], d*.9, "sine", .035, 1800, 4);

  const r = NOTES[root];
  tone(r, d*.78, "triangle", .09, 550);
  tone(r*1.25, d*.78, "sine", .04, 850);
  tone(r*1.5, d*.78, "sine", .04, 850);

  musicPos = (musicPos+1) % tune.length;
  musicTimer = setTimeout(playStep, beat*b);
}

async function startMusic() {
  // iPhone uses an ordinary HTML media element because iOS mutes Web Audio
  // when the Ring/Silent switch is on. This path is still user-initiated.
  if (isIPhone) {
    const media = ensureIPhoneMusic();
    try {
      media.currentTime = media.currentTime || 0;
      await media.play();
      musicEnabled = true;
      musicToggle.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Music: On";
    } catch (error) {
      musicLabel.textContent = "Tap Music again";
    }
    return;
  }

  if (!ensureAudio()) {
    musicLabel.textContent = "Music unavailable";
    musicToggle.disabled = true;
    return;
  }

  unlockAudioForIOS();

  try {
    if (audioContext.state === "suspended" || audioContext.state === "interrupted") {
      await audioContext.resume();
    }
  } catch (error) {
    musicLabel.textContent = "Tap Music again";
    return;
  }

  if (audioContext.state !== "running") {
    try {
      await audioContext.resume();
    } catch (error) {}
  }

  if (audioContext.state !== "running") {
    musicLabel.textContent = "Tap Music again";
    return;
  }

  musicEnabled = true;
  musicToggle.setAttribute("aria-pressed","true");
  musicLabel.textContent = "Music: On";
  playStep();
}

function stopMusic() {
  musicEnabled = false;

  if (isIPhone && iphoneMusic) {
    iphoneMusic.pause();
    iphoneMusic.currentTime = 0;
  }

  if (musicTimer) clearTimeout(musicTimer);
  musicTimer = null;
  musicPos = 0;
  musicToggle.setAttribute("aria-pressed","false");
  musicLabel.textContent = "Music: Off";
}

musicToggle.addEventListener("click", async () => {
  musicEnabled ? stopMusic() : await startMusic();
  createConfettiBurst(musicToggle, 32);
});

window.addEventListener("pagehide", () => {
  if (musicTimer) clearTimeout(musicTimer);
  musicTimer = null;
  musicEnabled = false;
});

// If an iPhone/iPad returns to the page after being backgrounded, keep the
// control state truthful. The next tap will resume/unlock audio again.
document.addEventListener("visibilitychange", () => {
  if (document.hidden && musicEnabled) {
    stopMusic();
  }
});


/* Confetti burst */
const confettiColours = [
  "#f7d23e",
  "#e5484d",
  "#3aa76d",
  "#59a5ff",
  "#ffffff",
  "#ff8ac6"
];

function createConfettiBurst(targetEl = messageBoxEl, pieceCount = 54) {
  if (!targetEl) return;

  const rect = targetEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  for (let i = 0; i < pieceCount; i += 1) {
    const piece = document.createElement("span");
    const angle = (-Math.PI / 2) + ((Math.random() - 0.5) * 2.0);
    const distance = 110 + Math.random() * 190;
    const driftX = Math.cos(angle) * distance;
    const driftY = Math.sin(angle) * distance + 170 + Math.random() * 70;
    const rotation = (Math.random() * 720 - 360).toFixed(0) + "deg";

    const shapeRoll = Math.random();
    if (shapeRoll < 0.33) {
      piece.className = "confetti-piece shape-circle";
    } else if (shapeRoll < 0.5) {
      piece.className = "confetti-piece shape-triangle";
    } else {
      piece.className = "confetti-piece";
    }

    const colour = confettiColours[Math.floor(Math.random() * confettiColours.length)];

    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.setProperty("--dx", `${driftX.toFixed(1)}px`);
    piece.style.setProperty("--dy", `${driftY.toFixed(1)}px`);
    piece.style.setProperty("--rot", rotation);

    if (piece.classList.contains("shape-triangle")) {
      piece.style.color = colour;
    } else {
      piece.style.background = colour;
    }

    piece.style.animationDuration = `${1200 + Math.random() * 500}ms`;

    document.body.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}

if (messageBoxEl) {
  messageBoxEl.addEventListener("click", () => createConfettiBurst(messageBoxEl, 54));

  messageBoxEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      createConfettiBurst(messageBoxEl, 54);
    }
  });
}




/* Progressive Advent Calendar */
const adventItems = [
  { type: "Festive fact", title: "A Victorian Christmas first", text: "The first commercial Christmas card was commissioned in London in 1843. A simple idea became a tradition that now travels in billions of envelopes and messages." },
  { type: "Tiny activity", title: "Make the room feel festive", text: "Turn off the main lights for ten minutes and switch on only your Christmas lights or a lamp. Instant December atmosphere." },
  { type: "Christmas joke", title: "A suitably terrible joke", text: "What do snowmen eat for breakfast? Frosted flakes." },
  { type: "Trivia", title: "Which song came first?", text: "Jingle Bells was published in 1857 — and it was not originally written specifically as a Christmas song." },
  { type: "Festive suggestion", title: "Choose tonight’s Christmas song", text: "Pick one festive song you have not heard yet this year and give it a proper listen rather than leaving it in the background." },
  { type: "Tradition", title: "Saint Nicholas Day", text: "6 December is Saint Nicholas Day in several European countries, with traditions that often include small gifts or sweets for children." },
  { type: "Tiny activity", title: "Send one unexpected message", text: "Message someone you have not spoken to for a while and wish them a good December. No group chat required." },
  { type: "Festive fact", title: "Why evergreen?", text: "Evergreen plants became powerful winter symbols because they stay green when much of the natural world looks bare." },
  { type: "Christmas joke", title: "Today’s groaner", text: "Why was the Christmas tree bad at knitting? It kept dropping its needles." },
  { type: "Trivia", title: "A silver surprise", text: "Early tinsel was made from real silver. It looked beautiful, but it tarnished — and it was far less practical than today’s version." },
  { type: "Tiny activity", title: "Five-minute festive reset", text: "Put away five things, straighten one room, then reward yourself with a hot drink. Consider it pre-Christmas damage control." },
  { type: "Festive fact", title: "Twelve days really do begin at Christmas", text: "Traditionally, the Twelve Days of Christmas begin on Christmas Day rather than ending on it." },
  { type: "Tradition", title: "Saint Lucia’s Day", text: "In Sweden, 13 December is Saint Lucia’s Day, marked by candlelight, singing and processions during one of the darkest parts of winter." },
  { type: "Festive suggestion", title: "Pick a Christmas film", text: "Choose one Christmas film for this week and actually schedule it. A plan is much more likely to happen than 'we should watch that sometime'." },
  { type: "Christmas joke", title: "Another cracker-worthy joke", text: "What do you call an elf wearing earmuffs? Anything you like — they can’t hear you." },
  { type: "Festive fact", title: "The Trafalgar Square tree", text: "Oslo has traditionally sent London a Christmas tree as a yearly gift of thanks for British support during the Second World War." },
  { type: "Tiny activity", title: "Make a mini festive playlist", text: "Choose exactly five Christmas songs: one classic, one modern, one guilty pleasure, one calm track and one wildcard." },
  { type: "Trivia", title: "A Christmas ballet", text: "The Nutcracker premiered in Saint Petersburg in 1892. It became far more closely associated with Christmas in later decades." },
  { type: "Festive suggestion", title: "Do one useful future-you favour", text: "Wrap one present, write one card, check one delivery or make one list. Just one." },
  { type: "Festive fact", title: "The robin connection", text: "Robins became especially associated with British Christmas cards in the Victorian era; red-coated postal workers were nicknamed 'robins' too." },
  { type: "Christmas joke", title: "Almost Christmas", text: "What is Santa’s favourite type of music? Wrap." },
  { type: "Tiny activity", title: "A two-minute gratitude list", text: "Write down three things that made this year better. They do not have to be profound." },
  { type: "Festive suggestion", title: "Christmas Eve Eve", text: "Pick one thing you can finish today so Christmas Eve feels calmer tomorrow." },
  { type: "Christmas Eve", title: "The final door", text: "You made it to Christmas Eve. Put the lists down for a moment, enjoy the lights, and notice the anticipation — this is the bit the whole countdown was for. 🎄" }
];

function getAdventUnlockCount(now) {
  const month = now.getMonth();
  const day = now.getDate();

  if (month < 11) return 0;
  if (month > 11) return 0;
  if (day >= 24) return 24;
  return Math.max(0, day);
}

function getOpenedAdventDays(year) {
  try {
    const raw = localStorage.getItem(`counttochristmas-advent-${year}`);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveOpenedAdventDays(year, days) {
  try {
    localStorage.setItem(`counttochristmas-advent-${year}`, JSON.stringify(days));
  } catch (error) {}
}

function revealAdventDay(day, button, year) {
  const item = adventItems[day - 1];
  if (!item || !adventRevealEl) return;

  adventRevealKickerEl.textContent = `Door ${day} · ${item.type}`;
  adventRevealTitleEl.textContent = item.title;
  adventRevealTextEl.textContent = item.text;
  adventRevealEl.hidden = false;

  document.querySelectorAll(".advent-door.is-selected").forEach((door) => {
    door.classList.remove("is-selected");
    door.setAttribute("aria-expanded", "false");
  });

  button.classList.add("is-open", "is-selected");
  button.setAttribute("aria-expanded", "true");

  const opened = getOpenedAdventDays(year);
  if (!opened.includes(day)) {
    opened.push(day);
    saveOpenedAdventDays(year, opened);
  }

  const marker = button.querySelector(".advent-door-state");
  if (marker) marker.textContent = "Opened";

  adventRevealEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderAdventCalendar() {
  if (!adventGridEl) return;

  const now = new Date();
  const year = now.getFullYear();
  const unlockCount = getAdventUnlockCount(now);
  const opened = getOpenedAdventDays(year);

  if (now.getMonth() < 11) {
    adventStatusEl.textContent = "The first door unlocks on 1 December. Come back each day for a new festive surprise.";
    adventBadgeEl.textContent = "Unlocks 1 Dec";
  } else if (unlockCount >= 24) {
    adventStatusEl.textContent = "All 24 doors are unlocked — open any one you missed.";
    adventBadgeEl.textContent = "All doors open";
  } else {
    adventStatusEl.textContent = `Doors 1–${unlockCount} are unlocked. Today’s door is ready whenever you are.`;
    adventBadgeEl.textContent = `Day ${unlockCount} of 24`;
  }

  adventGridEl.innerHTML = "";

  for (let day = 1; day <= 24; day += 1) {
    const isUnlocked = day <= unlockCount;
    const wasOpened = opened.includes(day);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "advent-door";
    button.dataset.day = String(day);
    button.setAttribute("aria-expanded", "false");

    if (!isUnlocked) {
      button.disabled = true;
      button.classList.add("is-locked");
      button.setAttribute("aria-label", `Advent door ${day}, locked`);
    } else {
      button.setAttribute("aria-label", `Open Advent door ${day}`);
      if (wasOpened) button.classList.add("is-open");
    }

    const number = document.createElement("span");
    number.className = "advent-door-number";
    number.textContent = String(day);

    const icon = document.createElement("span");
    icon.className = "advent-door-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = isUnlocked ? (wasOpened ? "✨" : "🎁") : "🔒";

    const state = document.createElement("span");
    state.className = "advent-door-state";
    state.textContent = !isUnlocked ? "Locked" : (wasOpened ? "Opened" : "Open me");

    button.append(number, icon, state);

    if (isUnlocked) {
      button.addEventListener("click", () => revealAdventDay(day, button, year));
    }

    adventGridEl.appendChild(button);
  }
}

renderAdventCalendar();

/* Share the countdown exactly as it appears when the button is pressed */
function getCurrentCountdownShareText() {
  const weeks = weeksEl.textContent.trim();
  const days = daysEl.textContent.trim();
  const hours = hoursEl.textContent.trim();
  const minutes = minutesEl.textContent.trim();
  const seconds = secondsEl.textContent.trim();
  const targetDate = targetDateEl.textContent.trim();

  return `🎄 Christmas Countdown 🎄

${weeks} weeks · ${days} days · ${hours} hours · ${minutes} minutes · ${seconds} seconds until Christmas!

🎅 ${targetDate}`;
}

function getShareUrl() {
  /*
    When hosted, this is the live webpage URL.
    When opened directly from a desktop file, sharing a file:// URL is not
    useful, so only the countdown text is shared.
  */
  return window.location.protocol === "http:" || window.location.protocol === "https:"
    ? window.location.href
    : "";
}

function setShareFeedback(text, stateClass = "") {
  if (!shareButton || !shareLabel) return;

  shareLabel.textContent = text;
  shareButton.classList.remove("share-success", "share-error");

  if (stateClass) {
    shareButton.classList.add(stateClass);
  }

  window.setTimeout(() => {
    shareLabel.textContent = "Share";
    shareButton.classList.remove("share-success", "share-error");
  }, 1800);
}

async function shareCountdown() {
  if (!shareButton) return;

  const text = getCurrentCountdownShareText();
  const url = getShareUrl();

  const shareData = {
    title: "Christmas Countdown",
    text: text
  };

  if (url) {
    shareData.url = url;
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      setShareFeedback("Shared!", "share-success");
    } else if (navigator.clipboard && window.isSecureContext) {
      const clipboardText = url ? `${text}\n\n${url}` : text;
      await navigator.clipboard.writeText(clipboardText);
      setShareFeedback("Copied!", "share-success");
    } else {
      /*
        Local index.html files are commonly tested outside a secure context,
        where Clipboard API may be unavailable. This fallback still lets the
        user copy the exact countdown.
      */
      const clipboardText = url ? `${text}\n\n${url}` : text;
      const textArea = document.createElement("textarea");
      textArea.value = clipboardText;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
      setShareFeedback("Copied!", "share-success");
    }

    if (typeof createConfettiBurst === "function") {
      createConfettiBurst(shareButton, 32);
    }
  } catch (error) {
    /*
      AbortError normally means the user simply closed the native share sheet,
      so don't present that as a failure.
    */
    if (error && error.name === "AbortError") {
      return;
    }

    setShareFeedback("Try again", "share-error");
  }
}

if (shareButton) {
  shareButton.addEventListener("click", shareCountdown);
}

