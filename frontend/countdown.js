document.addEventListener("DOMContentLoaded", () => {
  const EVENT_START = new Date(2026, 3, 24, 18, 0, 0); // Apr 24, 2026 @ 6:00 PM
  const EVENT_END = new Date(2026, 3, 25, 0, 0, 0);   // Apr 25, 2026 @ 12:00 AM

  const timerEl = document.querySelector(".timer");
  if (!timerEl) return;

  const pad2 = (n) => String(n).padStart(2, "0");

  function splitTime(diffMs) {
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }

  function renderCountdown(prefixText, diffMs) {
    const { days, hours, minutes, seconds } = splitTime(diffMs);

    timerEl.innerHTML = `
      <div class="countdown-wrap">
        <div class="countdown-title">${prefixText}</div>
        <div class="countdown">
          <div class="unit"><span class="num">${days}</span><span class="label">Days</span></div>
          <div class="unit"><span class="num">${pad2(hours)}</span><span class="label">Hours</span></div>
          <div class="unit"><span class="num">${pad2(minutes)}</span><span class="label">Min</span></div>
          <div class="unit"><span class="num">${pad2(seconds)}</span><span class="label">Sec</span></div>
        </div>
      </div>
    `;
  }

  function update() {
    const now = new Date();

    if (now < EVENT_START) {
      renderCountdown("Event starts in", EVENT_START - now);
      return;
    }

    if (now >= EVENT_START && now < EVENT_END) {
      renderCountdown("🎉 Happening now! Ends in", EVENT_END - now);
      return;
    }

    timerEl.textContent = "Thank you for celebrating with us! 💛";
    clearInterval(interval);
  }

  update();
  const interval = setInterval(update, 1000);
});
