# CreatorTrust MVP - Local Setup Guide

This guide will help you run the CreatorTrust MVP on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Python 3.12+** - [Download here](https://www.python.org/downloads/)
2. **Poetry** (Python package manager) - [Installation guide](https://python-poetry.org/docs/#installation)
   - Quick install: `curl -sSL https://install.python-poetry.org | python3 -`
3. **Node.js 18+** and **npm** - [Download here](https://nodejs.org/)
4. **Git** - [Download here](https://git-scm.com/downloads)

## Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/zukoife/MVPP2.git
cd MVPP2/creatortrustmvp
```

### Step 2: Start the Backend

Open a terminal and run:

```bash
# Navigate to backend directory
cd backend

# Install dependencies
poetry install

# Start the backend server
poetry run fastapi dev app/main.py
```

The backend will start on **http://127.0.0.1:8000**

You should see output like:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

**Keep this terminal open** - the backend needs to keep running.

### Step 3: Start the Frontend

Open a **new terminal** (keep the backend running) and run:

```bash
# Navigate to frontend directory (from the creatortrustmvp folder)
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will start on **http://localhost:5173**

You should see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 4: Open the Application

Open your web browser and go to: **http://localhost:5173**

You should see the CreatorTrust login page!

## Using the Application

### Register a New Account

1. Click "Sign up" on the login page
2. Choose your account type:
   - **Creator** - for influencers and content creators
   - **Brand** - for businesses looking to hire creators
3. Fill in your email and password
4. Click "Sign Up"

### Complete Your Profile

After registration, you'll be prompted to complete your profile:

**For Creators:**
- Full name
- Bio
- Niche (e.g., Fashion, Tech, Lifestyle)
- Location
- Social media handles (Instagram, YouTube, TikTok)
- Follower counts and engagement rates

**For Brands:**
- Company name
- Industry
- Website
- Description

### Explore Features

**As a Creator:**
- View available campaigns on the dashboard
- Browse campaigns and apply
- Submit content for approved campaigns
- Track your earnings and ratings

**As a Brand:**
- Create new campaigns
- Search and filter creators
- Review campaign applications
- Approve submitted content
- Release payments from escrow

## Important Notes

### Data Persistence

⚠️ **The backend uses an in-memory database** - this means:
- All data is stored in memory only
- When you restart the backend server, **all data will be lost**
- This is intentional for MVP testing and proof of concept
- You'll need to re-register accounts after restarting the backend

### API Documentation

Once the backend is running, you can view the interactive API documentation at:
- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

## Troubleshooting

### Backend Issues

**Problem: "poetry: command not found"**
- Solution: Install Poetry using: `curl -sSL https://install.python-poetry.org | python3 -`
- Then restart your terminal

**Problem: "Python version not supported"**
- Solution: Make sure you have Python 3.12 or higher installed
- Check with: `python --version` or `python3 --version`

**Problem: Port 8000 already in use**
- Solution: Stop any other applications using port 8000, or change the port in the backend startup command

**Problem: Backend crashes or shows errors**
- Solution: Make sure all dependencies are installed: `poetry install`
- Check the terminal output for specific error messages

### Frontend Issues

**Problem: "npm: command not found"**
- Solution: Install Node.js from https://nodejs.org/

**Problem: Port 5173 already in use**
- Solution: Stop any other applications using port 5173, or Vite will automatically use the next available port

**Problem: "Cannot connect to backend" or API errors**
- Solution: Make sure the backend is running on http://127.0.0.1:8000
- Check the `.env` file in the frontend directory - it should contain: `VITE_API_URL=http://127.0.0.1:8000`

**Problem: Blank page or component errors**
- Solution: Clear your browser cache and refresh
- Check the browser console (F12) for error messages
- Make sure `npm install` completed successfully

### General Issues

**Problem: Changes not showing up**
- Solution: Both the backend and frontend have auto-reload enabled
- If changes don't appear, try:
  - Refreshing your browser (Ctrl+R or Cmd+R)
  - Restarting the development servers

## Development

### Project Structure

```
creatortrustmvp/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py      # API endpoints
│   │   ├── models.py    # Data models
│   │   ├── database.py  # In-memory database
│   │   └── auth.py      # Authentication utilities
│   └── pyproject.toml   # Python dependencies
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # UI components
│   │   ├── contexts/    # React contexts
│   │   └── lib/         # Utilities and API client
│   └── package.json     # Node dependencies
│
└── API_SPEC.md         # Complete API documentation
```

### Making Changes

**Backend Changes:**
1. Edit files in `backend/app/`
2. The server will auto-reload
3. Test your changes using the API docs at http://127.0.0.1:8000/docs

**Frontend Changes:**
1. Edit files in `frontend/src/`
2. The page will auto-reload in your browser
3. Check the browser console (F12) for any errors

## Tech Stack

- **Backend**: FastAPI (Python), JWT authentication, bcrypt password hashing
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui components
- **Database**: In-memory (for MVP)
- **Routing**: React Router
- **HTTP Client**: Fetch API

## Need Help?

If you encounter any issues not covered in this guide:
1. Check the terminal output for error messages
2. Check the browser console (F12) for frontend errors
3. Review the API documentation at http://127.0.0.1:8000/docs
4. Check the API_SPEC.md file for endpoint details

## Next Steps

Once you've tested the MVP locally, you can:
1. Deploy to production for live testing
2. Add PostgreSQL database for data persistence
3. Integrate real social media APIs (Instagram, YouTube, TikTok)
4. Add OAuth social login
5. Integrate payment gateways (Paystack/Flutterwave)
6. Add more features and improvements
