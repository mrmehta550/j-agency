# J-Agency — Full-Stack Application Architecture

A modern, high-performance agency web platform decoupled into two independent applications:
- **Frontend:** React 19 + Vite SPA (deployed independently to **Vercel**).
- **Backend:** Django 6 REST Framework + WhiteNoise (deployed independently to **Render**).

---

## 1. Project Directory Structure

```text
j-agency/
│
├── frontend/                     # Independent React + Vite SPA
│   ├── src/                      # Components, Pages, CSS, API Client
│   ├── public/                   # Static public assets (images, icons, etc.)
│   ├── package.json              # React dependencies and scripts
│   ├── vite.config.js            # Vite build configuration
│   ├── index.html                # Entrypoint HTML
│   ├── vercel.json               # SPA client-side route rewrites
│   ├── .env.example              # Frontend environment variables template
│   └── README.md
│
├── backend/                      # Independent Django REST API Backend
│   ├── config/                   # Django settings, WSGI, ASGI, and root URLs
│   ├── api/                      # API entrypoint
│   ├── blog/                     # Blog Django app (Models, Views, Admin)
│   ├── casestudy/                # Case study Django app
│   ├── home/                     # Home, Contacts, Bookings Django app
│   ├── services/                 # Services Django app
│   ├── private/                  # Internal records (e.g., contacts.xlsx)
│   ├── templates/                # Server templates (robots.txt, etc.)
│   ├── static/                   # CSS, icons, images, videos
│   ├── staticfiles/              # Production collected static files
│   ├── media/                    # User-uploaded media files
│   ├── manage.py                 # Django CLI management script
│   ├── app.py                    # WSGI bridge for Render standard runners
│   ├── gunicorn.conf.py          # Production Gunicorn dynamic PORT binding
│   ├── requirements.txt          # Production Python dependencies
│   ├── Procfile                  # Process file for Render / PaaS deployment
│   ├── .python-version           # Pinned Python version (3.12.3)
│   └── .env.example              # Backend environment variables template
│
├── .gitignore                    # Global git ignore rules (secrets, venvs, dist)
└── README.md                     # Main documentation
```

---

## 2. Local Development Guide

### A. Running the Backend (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Activate your virtual environment:
   - **Windows:**
     ```powershell
     ..\venv\Scripts\activate
     ```
   - **Linux / macOS:**
     ```bash
     source ../venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure local environment variables:
   - Copy `.env.example` to `.env` inside `backend/`:
     ```bash
     cp .env.example .env
     ```
5. Run migrations:
   ```bash
   python manage.py migrate
   ```
6. Start the Django development server:
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
   *The backend will be live at `http://127.0.0.1:8000/` and the REST API at `http://127.0.0.1:8000/api/`.*

---

### B. Running the Frontend (React + Vite)

1. Open a new terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` inside `frontend/`:
     ```bash
     cp .env.example .env
     ```
   - In `frontend/.env`:
     ```env
     VITE_API_URL=http://127.0.0.1:8000
     ```
4. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   *The frontend will be live at `http://localhost:5173/`.*

---

## 3. Production Deployment Guide

### A. Deploy Backend to Render

1. Log in to [Render Dashboard](https://dashboard.render.com/) and create a new **Web Service**.
2. Connect your GitHub repository: `https://github.com/mrmehta550/j-agency`.
3. Set the service settings:
   - **Name:** `j-agency-backend`
   - **Region:** Choose closest to your target audience (e.g., Singapore / Frankfurt)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Python`
   - **Build Command:**
     ```bash
     pip install -r requirements.txt && python manage.py collectstatic --noinput
     ```
   - **Start Command:**
     ```bash
     gunicorn config.wsgi
     ```
4. In the **Environment Variables** tab, add:
   | Key | Value / Description |
   |---|---|
   | `PYTHON_VERSION` | `3.12.3` |
   | `DJANGO_DEBUG` | `False` |
   | `DJANGO_SECRET_KEY` | *(A strong random 50+ character secret key)* |
   | `ALLOWED_HOSTS` | `localhost,127.0.0.1,.onrender.com,.vercel.app` |
   | `DATABASE_URL` | *(Connection string of your Render PostgreSQL database)* |
   | `CORS_ALLOWED_ORIGINS` | `https://your-frontend-domain.vercel.app` |
   | `CSRF_TRUSTED_ORIGINS` | `https://*.onrender.com,https://*.vercel.app` |

---

### B. Deploy Frontend to Vercel

1. Log in to [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
2. Import the `j-agency` repository.
3. Configure the Project Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click `Edit` and select `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. In the **Environment Variables** section, add:
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://j-agency-backend.onrender.com` |
5. Click **Deploy**. Vercel will build and launch the frontend with client-side routing rewrites handled automatically via `frontend/vercel.json`.

---

## 4. Database & Migration Architecture

- **PostgreSQL in Production:** Configured via `DATABASE_URL` with connection pooling (`dj-database-url` + `psycopg[binary]`).
- **Development Fallbacks:** Automatic fallback to MySQL (if `MYSQLHOST` / `MYSQL_URL` is set) or SQLite3 for local development.
- **Migration Safety:** All existing Django migrations across `home`, `blog`, `casestudy`, `services`, `auth`, `admin`, and `sessions` are preserved in version control.
