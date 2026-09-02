// ---------------------------------------------------------
// KONFIGURATION
// ---------------------------------------------------------
// Feste Playlist in Abspielreihenfolge. Jeder Eintrag muss
// exakt (Groß-/Kleinschreibung!) zu einer Datei
// songs/<Name>.mp3 passen - GitHub Pages unterscheidet das,
// auch wenn Windows lokal nicht meckert.
const playlist = ["Pachelbel Canon", "Destiny of Love"];

// ---------------------------------------------------------
// STATE
// ---------------------------------------------------------
let currentIndex = 0;
let isPlaying = false;
let started = false;

// ---------------------------------------------------------
// DOM ELEMENTE
// ---------------------------------------------------------
const audio = document.getElementById("audio");
const btn = document.getElementById("play-btn");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");

// ---------------------------------------------------------
// HILFSFUNKTIONEN
// ---------------------------------------------------------
function setIcon(playing) {
  iconPlay.style.display = playing ? "none" : "block";
  iconPause.style.display = playing ? "block" : "none";
  btn.classList.toggle("playing", playing);
  btn.setAttribute(
    "aria-label",
    playing ? "Pausieren" : "Pachelbel Canon und Destiny of Love abspielen",
  );
}

function loadSong(index) {
  audio.src = `songs/${playlist[index]}.mp3`;
}

// ---------------------------------------------------------
// WIEDERGABE-STEUERUNG
// ---------------------------------------------------------
function play() {
  audio
    .play()
    .then(() => {
      isPlaying = true;
      setIcon(true);
    })
    .catch((err) => {
      // z.B. Browser blockiert Wiedergabe oder Datei fehlt
      console.warn("Wiedergabe konnte nicht gestartet werden:", err);
      isPlaying = false;
      setIcon(false);
    });
}

function pause() {
  audio.pause();
  isPlaying = false;
  setIcon(false);
}

function toggle() {
  if (!started) {
    started = true;
    loadSong(currentIndex);
  }
  isPlaying ? pause() : play();
}

// ---------------------------------------------------------
// EVENT LISTENER
// ---------------------------------------------------------
btn.addEventListener("click", toggle);

audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % playlist.length;

  if (currentIndex === 0) {
    // Playlist einmal komplett durchgelaufen -> anhalten,
    // bereit für einen erneuten Durchlauf von vorne
    loadSong(currentIndex);
    isPlaying = false;
    setIcon(false);
  } else {
    loadSong(currentIndex);
    play();
  }
});

audio.addEventListener("error", () => {
  const err = audio.error;
  if (err) {
    // code 1=ABORTED, 2=NETWORK, 3=DECODE, 4=SRC_NOT_SUPPORTED
    console.error(
      `Audio-Fehler (Code ${err.code}) bei "${audio.currentSrc}": ${err.message || "Datei nicht gefunden oder Format nicht unterstützt"}`,
    );
  }
  isPlaying = false;
  setIcon(false);
});
