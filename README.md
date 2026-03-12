🎉 Quince RSVP Application

A full-stack RSVP management system built to handle guest attendance for a Quinceañera event.

The application allows guests to submit RSVPs through a public form while providing administrators with secure tools to manage guest responses.

🔗 Live Site:
https://quince-rsvp.netlify.app/

✨ Features
Guest Interface

Mobile-friendly RSVP form

Guests can submit:

Full name

Phone number

Attendance status

Number of additional guests

Number of children

Honeypot spam protection

Live countdown timer to event date

Elegant event-themed UI

Admin Dashboard

Secure admin access using API key authentication

View all RSVPs in a structured table

Export guest list as CSV

Delete RSVPs if plans change

Phone numbers formatted automatically for readability

🧠 System Architecture

This project uses a separated frontend and backend architecture.

Frontend (Netlify)
        ↓
REST API
        ↓
ASP.NET Core Backend
        ↓
SQLite Database

The frontend communicates with the backend through a REST API to submit and retrieve RSVP data.

🛠 Tech Stack
Frontend

HTML

CSS

Vanilla JavaScript

Netlify (Hosting)

Backend

ASP.NET Core Web API

C#

Entity Framework Core

SQLite

Render (Hosting)

## 📁 Project Structure

```
quince-app/
│
├── frontend/                # Netlify-hosted static site
│   ├── index.html           # Home + countdown
│   ├── rsvp.html            # RSVP form
│   ├── admin.html           # Admin dashboard
│   ├── styles.css
│   ├── rsvp.js
│   ├── admin.js
│   └── countdown.js
│
├── QuinceBackend/           # ASP.NET backend (Render)
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Program.cs
│
└── README.md
```
🔐 Admin Security

Administrative routes are protected using a custom request header.

X-Admin-Key

The key is validated server-side before allowing access to protected endpoints.

Protected Endpoints
GET /api/rsvps/admin
DELETE /api/rsvps/{id}
🌐 API Endpoints
Public

Submit a new RSVP

POST /api/rsvps
Admin

Retrieve all RSVPs

GET /api/rsvps/admin

Delete an RSVP

DELETE /api/rsvps/{id}
🚀 Deployment
Frontend (Netlify)

Configuration

Base directory: frontend
Publish directory: .

Auto-deploys from the main branch.

Backend (Render)

Connected to the GitHub repository with automatic deployment.

Required environment variable:

ADMIN_KEY=your-secret-key
🧪 Local Development
Run Backend
cd QuinceBackend
dotnet restore
dotnet run
Run Frontend

Open:

frontend/index.html

or use a local web server.

🔮 Future Improvements (Planned v2)

This project currently supports a single event, but future versions may expand the platform into a reusable event management system.

Possible improvements include:

Multi-Event Support

Allow the system to manage RSVPs for multiple events such as:

Quinceañeras

Weddings

Birthdays

Family gatherings

This would likely involve adding an Event model and linking RSVPs to a specific event.

Photo Gallery

Allow guests to upload photos taken during the event.

Potential features:

Guest photo uploads

Shared photo gallery for attendees

Ability to download event photos

Moderation tools for admins

Possible storage solutions:

Dropbox API

Cloud storage providers

External file hosting services

👨‍💻 Author

Fabian Segura
Aspiring Backend / Full-Stack Developer

GitHub
https://github.com/bleufabs