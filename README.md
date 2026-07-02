# AI Resume Bullet Point Improver

AI-powered web app that transforms weak resume bullet points into strong,
ATS-friendly, achievement-oriented statements — built with Azure AI Foundry.

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios
- **Backend:** Python, FastAPI, Pydantic
- **AI:** Azure AI Foundry / Azure OpenAI

## Status
🚧 In active development — Phase 1 complete (project scaffolding).

## Getting Started

### Backend
\`\`\`bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
cp .env.example .env        # fill in your Azure credentials
uvicorn app.main:app --reload
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
cp .env.example .env
npm run dev
\`\`\`