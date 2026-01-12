// admin.js
const API_BASE = "https://quince-app.onrender.com/api";

const keyInput = document.getElementById("adminKey");
const loadBtn  = document.getElementById("loadBtn");
const rowsEl   = document.getElementById("rsvpRows");
const tableSec = document.getElementById("guestList");
const errorMsg = document.getElementById("errorMsg");
const csvBtn   = document.getElementById("csvBtn");

// remember key for this tab
if (sessionStorage.getItem("ADMIN_KEY")) {
  keyInput.value = sessionStorage.getItem("ADMIN_KEY");
}

function fmtPhone(raw) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw ?? "";
}

function toCsv(items) {
  const header = ["id","name","phone","status","guests","kids","createdAtUtc"];
  const rows = items.map(r => [
    r.id,
    `"${String(r.name ?? "").replace(/"/g, '""')}"`,
    `"${String(r.phone ?? "").replace(/"/g, '""')}"`,
    r.status,
    r.guests,
    r.kids,
    r.createdAtUtc
  ].join(","));
  return [header.join(","), ...rows].join("\n");
}

async function loadList() {
  const adminKey = keyInput.value.trim();
  if (!adminKey) { alert("Please enter your admin key."); return; }

  sessionStorage.setItem("ADMIN_KEY", adminKey);

  errorMsg.textContent = "";
  tableSec.style.display = "block";
  rowsEl.innerHTML = `<tr><td colspan="8">Loading…</td></tr>`;

  try {
    const res = await fetch(`${API_BASE}/rsvps/admin`, {
      headers: { "X-Admin-Key": adminKey }
    });
    if (!res.ok) throw new Error("Invalid or unauthorized key.");

    const data = await res.json();
    let currentData = Array.isArray(data) ? [...data] : [];

    if (!Array.isArray(currentData) || currentData.length === 0) {
      rowsEl.innerHTML = `<tr><td colspan="8">No RSVPs yet.</td></tr>`;
      return;
    }

    rowsEl.innerHTML = "";

    const removeFromCurrent = (id) => {
      currentData = currentData.filter(x => x.id !== id);
      if (currentData.length === 0) {
        rowsEl.innerHTML = `<tr><td colspan="8">No RSVPs yet.</td></tr>`;
      }
    };

    for (const r of currentData) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${fmtPhone(r.phone)}</td>
        <td>${r.status}</td>
        <td>${r.guests}</td>
        <td>${r.kids}</td>
        <td>${new Date(r.createdAtUtc).toLocaleString()}</td>
        <td><button class="delete-btn" data-id="${r.id}">Delete</button></td>`;

      const btn = tr.querySelector(".delete-btn");
      btn.addEventListener("click", async () => {
        const ok = confirm(`Delete RSVP for "${r.name}"? This cannot be undone.`);
        if (!ok) return;

        btn.disabled = true;

        try {
          const delRes = await fetch(`${API_BASE}/rsvps/${r.id}`, {
            method: "DELETE",
            headers: { "X-Admin-Key": adminKey }
          });

          if (!delRes.ok) throw new Error("Delete failed.");

          tr.remove();
          removeFromCurrent(r.id);
        } catch (e) {
          console.error(e);
          alert("Could not delete RSVP. Please try again.");
          btn.disabled = false;
        }
      });

      rowsEl.appendChild(tr);
    }

    csvBtn.onclick = () => {
      const csv = toCsv(currentData);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement("a"), { href: url, download: "rsvps.csv" });
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    };

  } catch (err) {
    errorMsg.textContent = err.message;
    tableSec.style.display = "none";
  }
}

loadBtn.addEventListener("click", loadList);
keyInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); loadList(); }
});
