🎉 Quince RSVP Application

A full-stack RSVP system built for managing guest attendance for a Quinceañera event.
Guests can submit RSVPs through a public form, while admins can securely view, export, and manage guest entries.

Live Site:
👉 https://quince-rsvp.netlify.app/

✨ Features
Guest-facing

Mobile-friendly RSVP form

Fields for:

Name

Phone number

Attendance status

Number of guests

Number of kids

Honeypot spam protection

Real-time countdown to event date

Admin-only

Secure admin access using an API key

View all RSVPs in a clean table layout

Export guest list as CSV

Delete RSVPs if guests cancel or change plans

Phone numbers formatted for readability

 Tech Stack
Frontend

HTML

CSS

Vanilla JavaScript

Hosted on Netlify

Backend

ASP.NET Core Web API (C#)

Entity Framework Core

SQLite database

Hosted on Render

📁 Project Structure
quince-app/
├── frontend/               # Netlify-hosted static site
│   ├── index.html          # Home + countdown
│   ├── rsvp.html           # RSVP form
│   ├── admin.html          # Admin dashboard
│   ├── styles.css
│   ├── rsvp.js
│   ├── admin.js
│   └── countdown.js
│
├── QuinceBackend/          # ASP.NET backend (Render)
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Program.cs
│
└── README.md

🔐 Admin Security

Admin routes are protected using a custom request header:

X-Admin-Key


The key is validated server-side

Admin-only endpoints:

GET /api/rsvps/admin

DELETE /api/rsvps/{id}

🌐 API Endpoints
Public

POST /api/rsvps
Submit a new RSVP

Admin

GET /api/rsvps/admin
Retrieve all RSVPs (admin key required)

DELETE /api/rsvps/{id}
Delete an RSVP by ID (admin key required)

🚀 Deployment
Frontend (Netlify)

Base directory: frontend

Publish directory: .

Auto-deploys from main branch

Backend (Render)

Connected to GitHub repo

Auto-deploy enabled on main

Environment variable required:

ADMIN_KEY=your-secret-key

🧪 Local Development
Frontend

Simply open:

frontend/index.html


or use a local server.

Backend
cd QuinceBackend
dotnet restore
dotnet run

📌 Future Improvements

RSVP status updates (instead of delete)

Admin search and filters

Soft-delete / undo delete

SMS confirmation (Twilio)

Multiple event support

👤 Author

Fabian Segura
Aspiring Backend / Full-Stack Developer
GitHub: https://github.com/bleufabs