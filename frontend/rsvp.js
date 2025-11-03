// rsvp.js
const API_BASE = "https://quince-app.onrender.com/api";


const form = document.getElementById("rsvpForm");
const msg  = document.getElementById("rsvpMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name:   document.getElementById("name").value.trim(),
    phone:  document.getElementById("phone").value.trim(),   // >=10 digits after stripping
    status: document.getElementById("status").value,         // "yes" or "maybe"
    guests: Number(document.getElementById("guests").value || 0),
    kids:   Number(document.getElementById("kids")?.value || 0)
  };

  try {
    const res = await fetch(`${API_BASE}/rsvps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await res.text());
    msg.textContent = "Thanks! Your RSVP was recorded.";
    form.reset();
  } catch (err) {
    msg.textContent = "Could not submit RSVP: " + err.message;
    console.error(err);
  }
});
