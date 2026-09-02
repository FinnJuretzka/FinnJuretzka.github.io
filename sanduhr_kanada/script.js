(function () {
  "use strict";

  // Zeitraum der Flugbewegung
  // 4. September 2026, 13:15 Uhr  ->  19. Januar 2027, 11:05 Uhr
  var FLIGHT_START = new Date(2026, 8, 4, 13, 15, 0);
  var FLIGHT_END   = new Date(2027, 0, 19, 11, 5, 0);

  // Start- und Endpunkt der eingezeichneten Linie,
  // gemessen als Prozent von Breite/Höhe des Kartenbilds (Karte.png)
  var LINE_START = { x: 6.09, y: 48.81 };
  var LINE_END   = { x: 82.10, y: 48.28 };

  var plane = document.getElementById("plane");
  var elDays = document.getElementById("cd-days");
  var elHours = document.getElementById("cd-hours");
  var elMinutes = document.getElementById("cd-minutes");
  var elSeconds = document.getElementById("cd-seconds");

  var countdownEnded = false;

  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  function pad(n, len) {
    var s = String(Math.trunc(n));
    while (s.length < len) s = "0" + s;
    return s;
  }

  function updatePlane(now) {
    var total = FLIGHT_END - FLIGHT_START;
    var elapsed = now - FLIGHT_START;
    var progress = clamp01(elapsed / total);

    var x = LINE_START.x + (LINE_END.x - LINE_START.x) * progress;
    var y = LINE_START.y + (LINE_END.y - LINE_START.y) * progress;

    plane.style.left = x + "%";
    plane.style.top = y + "%";
  }

  function setCountdownZero() {
    elDays.textContent = pad(0, 3);
    elHours.textContent = pad(0, 2);
    elMinutes.textContent = pad(0, 2);
    setSecondsDigits(0, 0);
  }

  function setSecondsDigits(seconds, centi) {
    var s = pad(seconds, 2);
    var c = pad(centi, 2);
    var s0 = document.getElementById("cd-s-0");
    var s1 = document.getElementById("cd-s-1");
    var sep = document.getElementById("cd-s-sep");
    var c0 = document.getElementById("cd-c-0");
    var c1 = document.getElementById("cd-c-1");
    if (s0) s0.textContent = s.charAt(0);
    if (s1) s1.textContent = s.charAt(1);
    if (sep) sep.textContent = ",";
    if (c0) c0.textContent = c.charAt(0);
    if (c1) c1.textContent = c.charAt(1);
  }

  function updateCountdown(now) {
    // If we've reached or passed the end time, stop updating the countdown
    if (now >= FLIGHT_END) {
      setCountdownZero();
      countdownEnded = true;
      return;
    }

    var remainingMs = FLIGHT_END - now;

    // in Hundertstelsekunden rechnen, damit die letzten beiden Stellen
    // sauber und dauerhaft durchlaufen
    var totalCenti = Math.floor(remainingMs / 10);

    var centi = totalCenti % 100;
    var totalSeconds = Math.floor(totalCenti / 100);

    var seconds = totalSeconds % 60;
    var totalMinutes = Math.floor(totalSeconds / 60);

    var minutes = totalMinutes % 60;
    var totalHours = Math.floor(totalMinutes / 60);

    var hours = totalHours % 24;
    var days = Math.floor(totalHours / 24);

    elDays.textContent = pad(days, 3);
    elHours.textContent = pad(hours, 2);
    elMinutes.textContent = pad(minutes, 2);
    setSecondsDigits(seconds, centi);
  }

  function tick() {
    var now = new Date();
    updatePlane(now);
    // Only update the countdown while it hasn't reached zero
    if (!countdownEnded) updateCountdown(now);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
