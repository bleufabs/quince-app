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
  const d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) return `+1 (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  return raw;
}

function toCsv(rows) {
  const header = ["ID","Name","Phone","Status","Guests","Kids","Created"];
  const esc = (v) => `"${String(v).replaceAll('"','""')}"`;
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push([r.id, esc(r.name), esc(r.phone), r.status, r.guests, r.kids, r.createdAtUtc].join(","));
  }
  return lines.join("\n");
}

async function loadList() {
  const adminKey = keyInput.value.trim();
  if (!adminKey) { alert("Please enter your admin key."); return; }

  sessionStorage.setItem("ADMIN_KEY", adminKey);

  errorMsg.textContent = "";
  tableSec.style.display = "block";
  rowsEl.innerHTML = `<tr><td colspan="7">Loading…</td></tr>`;

  try {
    const res = await fetch(`${API_BASE}/rsvps/admin`, {
      headers: { "X-Admin-Key": adminKey }
    });
    if (!res.ok) throw new Error("Invalid or unauthorized key.");

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      rowsEl.innerHTML = `<tr><td colspan="7">No RSVPs yet.</td></tr>`;
      return;
    }

    rowsEl.innerHTML = "";
    for (const r of data) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${fmtPhone(r.phone)}</td>
        <td>${r.status}</td>
        <td>${r.guests}</td>
        <td>${r.kids}</td>
        <td>${new Date(r.createdAtUtc).toLocaleString()}</td>`;
      rowsEl.appendChild(tr);
    }

    csvBtn.onclick = () => {
      const csv = toCsv(data);
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
