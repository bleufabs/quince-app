// admin.js
const API_BASE = "https://<YOUR-RENDER-SERVICE>.onrender.com/api";

const keyInput = document.getElementById("adminKey");
const loadBtn  = document.getElementById("loadBtn");
const rowsEl   = document.getElementById("rsvpRows");
const tableSec = document.getElementById("guestList");
const errorMsg = document.getElementById("errorMsg");
const csvBtn   = document.getElementById("csvBtn");

loadBtn.addEventListener("click", async () => {
  const adminKey = keyInput.value.trim();
  if (!adminKey) { errorMsg.textContent = "Enter your admin key."; return; }

  try {
    const res = await fetch(`${API_BASE}/rsvps/admin`, {
      headers: { "X-Admin-Key": adminKey }
    });
    if (!res.ok) throw new Error("Invalid or unauthorized key.");

    const data = await res.json();
    errorMsg.textContent = "";
    tableSec.style.display = "block";
    rowsEl.innerHTML = "";

    for (const r of data) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${r.phone}</td>
        <td>${r.status}</td>
        <td>${r.guests}</td>
        <td>${r.kids}</td>
        <td>${new Date(r.createdAtUtc).toLocaleString()}</td>`;
      rowsEl.appendChild(tr);
    }
  } catch (err) {
    errorMsg.textContent = err.message;
    tableSec.style.display = "none";
  }
});

csvBtn?.addEventListener("click", () => {
  const rows = [["ID","Name","Phone","Status","Guests","Kids","Created"]];
  rowsEl.querySelectorAll("tr").forEach(tr => {
    rows.push([...tr.children].map(td => `"${td.textContent.replace(/"/g,'""')}"`));
  });
  const blob = new Blob([rows.map(r=>r.join(",")).join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "rsvps.csv";
  a.click();
});
