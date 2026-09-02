// ---------------------------------------------------------
// KONFIGURATION
// ---------------------------------------------------------
// Ordner, in dem pro Song jeweils eine .mp3, .json und .jpg
// Datei mit gleichem Dateinamen (ohne Endung) liegen.
const CONFIG = {
  songsFolder: "songs",
  manifestFile: "songs/manifest.json",
  audioExt: ".mp3",
  imageExt: ".jpg",
  jsonExt: ".json",
};

// ---------------------------------------------------------
// STATE
// ---------------------------------------------------------
let playlist = []; // shuffled array of base filenames (ohne Endung)
let currentIndex = 0;
let isPlaying = false;

// ---------------------------------------------------------
// DOM ELEMENTE
// ---------------------------------------------------------
const audio = document.getElementById("audio");
const coverImg = document.getElementById("cover");
const progressBar = document.getElementById("progress");
const timeBar = document.getElementById("time-bar");
const elapsedEl = document.getElementById("elapsed");
const durationEl = document.getElementById("duration");
const artistEl = document.getElementById("artist");
const titleEl = document.getElementById("title");
const iconPlayPause = document.getElementById("icon-playpause");
const loveBtn = document.getElementById("love-btn");

const btnPlayPause = document.getElementById("btn-playpause");
const btnStop = document.getElementById("btn-stop");
const btnForward = document.getElementById("btn-forward");
const btnBackward = document.getElementById("btn-backward");

// ---------------------------------------------------------
// HILFSFUNKTIONEN
// ---------------------------------------------------------

// Fisher-Yates Shuffle -> bei jedem Neuladen der Seite eine
// neue, zufällige Reihenfolge
function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function formatTime(seconds) {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ":" + String(s).padStart(2, "0");
}

// ---------------------------------------------------------
// SONG LADEN
// ---------------------------------------------------------
async function loadSong(index, autoplay = false) {
  const base = playlist[index];
  if (!base) return;

  const audioPath = `${CONFIG.songsFolder}/${base}${CONFIG.audioExt}`;
  const imagePath = `${CONFIG.songsFolder}/${base}${CONFIG.imageExt}`;
  const jsonPath = `${CONFIG.songsFolder}/${base}${CONFIG.jsonExt}`;

  audio.src = audioPath;
  coverImg.src = imagePath;

  // Standardwerte, falls die JSON-Datei fehlt oder unvollständig ist
  let meta = { title: base, artist: "", lyrics: "" };

  try {
    const res = await fetch(jsonPath);
    if (res.ok) {
      const data = await res.json();
      meta = { ...meta, ...data };
    }
  } catch (err) {
    console.warn(`Konnte JSON für "${base}" nicht laden:`, err);
  }

  titleEl.textContent = meta.title || base;
  artistEl.textContent = meta.artist || "";

  progressBar.style.width = "0%";
  elapsedEl.textContent = "0:00";
  durationEl.textContent = "0:00";

  if (autoplay) {
    play();
  } else {
    pause();
  }
}

// ---------------------------------------------------------
// WIEDERGABE-STEUERUNG
// ---------------------------------------------------------
function play() {
  audio
    .play()
    .then(() => {
      isPlaying = true;
      iconPlayPause.className = "icon-pause btn";
    })
    .catch((err) => {
      // Browser blockiert evtl. Autoplay ohne Nutzerinteraktion
      console.warn("Wiedergabe konnte nicht gestartet werden:", err);
    });
}

function pause() {
  audio.pause();
  isPlaying = false;
  iconPlayPause.className = "icon-play btn";
}

function togglePlayPause() {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

function stop() {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  iconPlayPause.className = "icon-play btn";
  progressBar.style.width = "0%";
  elapsedEl.textContent = "0:00";
}

function nextSong() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex, true);
}

function prevSong() {
  // erste paar Sekunden -> Song neu starten, sonst zum vorherigen Song
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex, true);
}

// ---------------------------------------------------------
// EVENT LISTENER
// ---------------------------------------------------------
btnPlayPause.addEventListener("click", togglePlayPause);
btnStop.addEventListener("click", stop);
btnForward.addEventListener("click", nextSong);
btnBackward.addEventListener("click", prevSong);

loveBtn.addEventListener("click", () => {
  loveBtn.classList.toggle("active");
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration && !isSeeking) {
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = pct + "%";
    elapsedEl.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", nextSong);

audio.addEventListener("error", () => {
  const err = audio.error;
  if (err) {
    // code 1=ABORTED, 2=NETWORK, 3=DECODE, 4=SRC_NOT_SUPPORTED
    console.error(
      `Audio-Fehler (Code ${err.code}) beim Abspielen von "${audio.currentSrc}": ${err.message || "kein Codec/Format unterstützt"}`,
    );
  }
});

// ---------------------------------------------------------
// ZEITLEISTE: Klick UND Ziehen (Maus + Touch über Pointer Events)
// ---------------------------------------------------------
let isSeeking = false;

function updateSeekUI(clientX) {
  const rect = timeBar.getBoundingClientRect();
  let pct = (clientX - rect.left) / rect.width;
  pct = Math.min(Math.max(pct, 0), 1);
  progressBar.style.width = pct * 100 + "%";
  if (audio.duration) {
    elapsedEl.textContent = formatTime(pct * audio.duration);
  }
  return pct;
}

timeBar.addEventListener("pointerdown", (e) => {
  isSeeking = true;
  timeBar.setPointerCapture(e.pointerId);
  updateSeekUI(e.clientX);
});

timeBar.addEventListener("pointermove", (e) => {
  if (!isSeeking) return;
  updateSeekUI(e.clientX);
});

function endSeek(e) {
  if (!isSeeking) return;
  isSeeking = false;
  const pct = updateSeekUI(e.clientX);
  if (audio.duration) {
    audio.currentTime = pct * audio.duration;
  }
}

timeBar.addEventListener("pointerup", endSeek);
timeBar.addEventListener("pointercancel", () => {
  isSeeking = false;
});

// ---------------------------------------------------------
// INITIALISIERUNG
// ---------------------------------------------------------
async function init() {
  try {
    const res = await fetch(CONFIG.manifestFile);
    if (!res.ok) throw new Error("manifest.json nicht gefunden");
    const songs = await res.json(); // Array von Dateinamen ohne Endung

    playlist = shuffle(songs);
    currentIndex = 0;
    loadSong(currentIndex, false);
  } catch (err) {
    console.error("Playlist konnte nicht geladen werden:", err);
    titleEl.textContent = "Keine Songs gefunden";
    artistEl.textContent = "Bitte songs/manifest.json prüfen";
  }
}

init();
