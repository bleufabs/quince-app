const API_BASE = "https://quince-app.onrender.com/api";

const form = document.getElementById("rsvpForm");
const msg = document.getElementById("rsvpMsg");

function setMsg(text, type) {
  msg.textContent = text;
  msg.className = type ? `msg msg--${type}` : "msg";
}

function normalizePhone(input) {
  // keep only digits; backend already normalizes too, but this improves UX
  return input.replace(/\D/g, "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Honeypot: if filled, silently stop (likely bot)
  const trap = document.getElementById("website")?.value?.trim();
  if (trap) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  const name = document.getElementById("name").value.trim();
  const phoneRaw = document.getElementById("phone").value.trim();
  const phoneDigits = normalizePhone(phoneRaw);

  if (!name) {
    setMsg("Please enter your full name.", "error");
    submitBtn.disabled = false;
    return;
  }

  if (phoneDigits.length < 10) {
    setMsg("Please enter a valid phone number (at least 10 digits).", "error");
    submitBtn.disabled = false;
    return;
  }

  const payload = {
    name,
    phone: phoneDigits,
    status: document.getElementById("status").value,
    guests: Number(document.getElementById("guests").value || 0),
    kids: Number(document.getElementById("kids")?.value || 0)
  };

  try {
    setMsg("Submitting…", "info");

    const res = await fetch(`${API_BASE}/rsvps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(await res.text());

    setMsg("✅ Thanks! Your RSVP was recorded.", "success");
    form.reset();
  } catch (err) {
    setMsg(`❌ Could not submit RSVP: ${err.message}`, "error");
    console.error(err);
  } finally {
    submitBtn.disabled = false;
  }
});
