# ATLAS by People4Good 🌍

> **AI-Enabled Digital Transformation Platform for Grassroots Non-Profits (NGOs)**

ATLAS is an intuitive, mobile-first web platform tailored specifically for community-based non-profits, small charitable trusts, and frontline civil society organizations. It removes technical jargon, diagnoses digital operational maturity in under 5 minutes, and delivers a concrete, prioritized Action Roadmap with real-time progress tracking synced with MongoDB Atlas.

---

## 🌟 Key Features

1. **Mission-Driven Landing & Dashboard**:
   - Clear value proposition articulating the benefits of digital transformation for frontline teams.
   - 4 Core Pillars: Data & Beneficiary Records, Safe Team Coordination, Fast Donor Reporting, and Free NGO Tech Grants.
   - 1-Click "Explore with Sample Grassroots NGO" demo button for instant evaluation.

2. **Grassroots NGO Profile Form**:
   - Captures Organization Name, Staff/Volunteer Size (`1-5`, `6-15`, `16-50`, `50+`), Primary Cause (`Education`, `Healthcare`, `Rural Development`, `Women Empowerment`, etc.), Operating Environment (`Rural`, `Semi-Urban`, `Urban`, `Remote/Tribal`), and current IT support level.
   - Pre-fills realistic sample profiles with a single click.

3. **Guided Non-Technical Self-Assessment**:
   - 8 thoughtful, scenario-based multiple-choice questions assessing:
     - **Data Storage & Beneficiary Records** (moving from paper registers to offline mobile forms)
     - **Internal & Stakeholder Communication** (safe channels and beneficiary privacy)
     - **Team Digital Literacy & Skills** (democratizing tech fluency beyond a single "tech person")
     - **Operational Bottlenecks & Donor Reporting** (slashing grant reporting time from 5 days to 2 hours)
   - Real-world options with non-intimidating explanations and operational insight tooltips.

4. **Dynamic Results & Scoring Screen**:
   - **0 to 100 Readiness Score** dynamically calculated using weighted domain scoring.
   - **Maturity Tier Badge**:
     - `Basic / Foundational` (0 - 40 Pts)
     - `Emerging / Developing` (41 - 75 Pts)
     - `Established / Catalytic` (76 - 100 Pts)
   - Domain-level progress breakdown across all 4 operational areas.
   - **AI Diagnostic Summary**: Context-aware executive summary, identified strengths, critical bottlenecks, and a high-leverage quick win recommendation.
   - One-click print/export view.

5. **Action Roadmap & Interactive Progress Tracker**:
   - 3 to 4 prioritized, practical actions customized to the NGO's tier and weakest operational areas.
   - Each action includes: Priority level, Effort estimate (`Low: 1-3 days`, `Medium: 1-2 weeks`, `High: 1 month`), Grassroots Rationale, Concrete Implementation Checklist, and Recommended 100% Free NGO Tools (e.g. Google Workspace for Nonprofits, KoboToolbox, Canva for Nonprofits, TechSoup Grants).
   - **Interactive Status Toggles**: `Not Started` | `In Progress` | `Completed` with real-time MongoDB database synchronization and live completion percentage tracker.
   - Confetti celebration upon task milestone completions.
   - Ability to add custom local organization milestones.

---

## 🛠️ Tech Stack

- **Frontend**:
  - React 19 (Vite)
  - Tailwind CSS v4
  - Lucide React (Clean, modern icons)
  - Canvas Confetti
  - Responsive Mobile-First Design
- **Backend**:
  - Node.js & Express.js REST API
  - Mongoose (MongoDB Atlas ODM)
  - CORS, Dotenv
  - Automatic fallback mode: continues running seamlessly even if MongoDB is temporarily offline or unconfigured.
- **Database**:
  - MongoDB Atlas with schemas for `Organization`, `Assessment`, and `Roadmap`.

---

## 📁 Project Structure

```
att/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB Atlas connection manager with status reporting
│   ├── models/
│   │   ├── Organization.js        # Mongoose Schema for NGO Profiles
│   │   ├── Assessment.js          # Mongoose Schema for Guided Assessments & Scores
│   │   └── Roadmap.js             # Mongoose Schema for Prioritized Action Items
│   ├── routes/
│   │   ├── organizationRoutes.js  # CRUD endpoints for NGO profiles
│   │   ├── assessmentRoutes.js    # Assessment scoring & roadmap generation
│   │   └── roadmapRoutes.js       # Action status toggle & progress calculation
│   ├── utils/
│   │   └── assessmentData.js      # Non-technical question bank & scoring algorithms
│   ├── test-logic.js              # Verification test suite for scoring & roadmap engine
│   ├── .env.example               # Environment variables template
│   ├── .env                       # Local environment configuration
│   ├── server.js                  # Express application entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js           # REST API client with error handling
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Top navigation & live MongoDB status badge
│   │   │   ├── LandingHero.jsx    # Value proposition & 4 transformation pillars
│   │   │   ├── NGOProfileForm.jsx # Profile registration & demo prefill
│   │   │   ├── GuidedAssessment.jsx # 4-domain non-technical questionnaire
│   │   │   ├── ResultsScoringScreen.jsx # 0-100 score dial & AI diagnostic summary
│   │   │   ├── ActionRoadmapTracker.jsx # Interactive roadmap synced with MongoDB
│   │   │   └── Footer.jsx         # Open resources & mission attribution
│   │   ├── App.jsx                # Main 5-step state controller
│   │   ├── index.css              # Tailwind styles & animations
│   │   └── main.jsx
│   ├── vite.config.js             # Vite + Tailwind + Proxy configuration
│   └── package.json
│
├── package.json                   # Root orchestrator scripts
└── README.md                      # Comprehensive documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** v9+
- A free **MongoDB Atlas** cluster URI (optional — fallback mode is automatically active if not provided)

---

### 2. Configure MongoDB Atlas (Optional)
To connect to your MongoDB Atlas cluster:
1. Open `backend/.env`
2. Update `MONGODB_URI` with your connection string:
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/atlas_people4good?retryWrites=true&w=majority
```
> **Note**: If you don't have MongoDB installed locally or haven't set up Atlas yet, ATLAS automatically runs in self-contained simulation mode, storing data safely in memory so you can immediately experience all features!

---

### 3. Run the Backend Server
In the root directory or `backend/`:
```bash
cd backend
npm install
npm start
```
The backend starts at: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

---

### 4. Run the React Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health, uptime & MongoDB connection status |
| `GET` | `/api/assessments/questions` | Returns 8 non-technical assessment questions across 4 domains |
| `POST` | `/api/organizations` | Create or update an NGO profile |
| `GET` | `/api/organizations` | List all organizations |
| `GET` | `/api/organizations/:id` | Get NGO profile by ID |
| `POST` | `/api/assessments` | Submit answers, calculate score (0-100), assign tier, generate roadmap |
| `GET` | `/api/assessments/:id` | Get assessment results & AI summary |
| `GET` | `/api/roadmaps/:id` | Get roadmap action items and progress percentage |
| `PATCH` | `/api/roadmaps/:id/actions/:actionId` | Toggle action status (`Not Started`, `In Progress`, `Completed`) & sync with DB |
| `POST` | `/api/roadmaps/:id/actions` | Add a custom action item to roadmap |

---

## 🔒 Data Privacy & Grassroots Impact
ATLAS is designed specifically to protect grassroots communities:
- Recommends zero-cost, enterprise-grade NGO programs (Google for Nonprofits, TechSoup, Canva for Nonprofits).
- Emphasizes beneficiary consent, safeguarding child records, and removing sensitive identity data from open messaging groups.
- Empowers NGOs to present professional digital governance to institutional donors and foundation grantmakers.

