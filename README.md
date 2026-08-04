# CycleCompass 🩺

**CycleCompass** is a menstrual health tracking app built for people managing **PCOS (Polycystic Ovary Syndrome)**. It lets users log their menstrual cycle and the symptoms associated with each stage, and generate a monthly report of cycles and symptoms that can be shared with a **gynaecologist or endocrinologist** for consultation.

---

## ✨ Features

- **User authentication** — register and log in securely (passwords hashed with bcrypt, sessions via JWT).
- **Onboarding** — capture profile details such as age, height, weight, and PCOS status.
- **Daily check-in** — record whether it's a period day, the period day number, and flow.
- **Symptom tracking** — log bloating, facial hair growth, acne, hair fall, mood, energy level, weight, cravings, and notes.
- **Journal** — write, view, and delete personal journal entries.
- **Health history** — review past cycles and symptoms over time.
- **Report generation** — compile cycles and symptoms into a report to share with a doctor.
- **AI Assist** — an assistant screen for guidance and insights.
- **Profile management** — view and manage account settings.

---

## 🧱 Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React Native (Expo), TypeScript, React Navigation, Axios |
| Backend   | Node.js, Express 5 |
| Database  | MySQL (via `mysql2`) |
| Auth      | JSON Web Tokens (`jsonwebtoken`), bcrypt |

---

## 📁 Project Structure

```
CycleCompass/
├── backend/
│   ├── config/          # MySQL connection
│   ├── controllers/     # Business logic (auth, cycle, symptoms, journal, report, onboarding)
│   ├── middleware/      # JWT auth middleware
│   ├── routes/          # Express route definitions
│   └── server.js        # App entry point
│
└── frontend/
    ├── assets/          # Images and icons
    ├── components/      # Reusable UI (BottomNavigation, HistoryCard, PhoneFrame)
    ├── navigation/      # React Navigation stacks
    ├── screens/         # App screens (Login, Register, Dashboard, Journal, etc.)
    ├── services/        # Axios API client
    └── App.tsx          # Root component
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MySQL](https://www.mysql.com/) server
- [Expo](https://expo.dev/) tooling / Expo Go app (for running the mobile app)

### 1. Clone the repository

```bash
git clone https://github.com/Ritu252/CycleCompass.git
cd CycleCompass
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=cyclecompass
```

Make sure MySQL is running and the database contains the required tables (`users`, `cycles`, `symptoms`, `journal_entries`).

Start the server:

```bash
npm start        # or: npx nodemon server.js
```

The API runs on **http://localhost:3000**.

### 3. Frontend setup

```bash
cd frontend
npm install
npm start        # starts the Expo dev server
```

Then run on a device/emulator:

```bash
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

> **Note:** The frontend points to `http://localhost:3000` (see `frontend/services/api.ts`). When running on a physical device, update the `baseURL` to your machine's LAN IP address.

---

## 📡 API Reference

All protected routes require an `Authorization: Bearer <token>` header.

### Auth
| Method | Endpoint            | Auth | Description            |
|--------|---------------------|------|------------------------|
| POST   | `/api/auth/register`| ❌   | Register a new user    |
| POST   | `/api/auth/login`   | ❌   | Log in, returns a JWT  |

### Onboarding
| Method | Endpoint                    | Auth | Description                 |
|--------|-----------------------------|------|-----------------------------|
| PUT    | `/api/onboard/profile/:id`  | ❌   | Update profile (age, height, weight, PCOS status) |

### Cycles
| Method | Endpoint       | Auth | Description          |
|--------|----------------|------|----------------------|
| POST   | `/api/cycle`   | ✅   | Add a cycle entry    |

### Symptoms
| Method | Endpoint         | Auth | Description        |
|--------|------------------|------|--------------------|
| POST   | `/api/symptoms`  | ✅   | Add symptom entry  |

### Journal
| Method | Endpoint            | Auth | Description               |
|--------|---------------------|------|---------------------------|
| POST   | `/api/journal`      | ✅   | Add a journal entry       |
| GET    | `/api/journal`      | ✅   | Get all journal entries   |
| DELETE | `/api/journal/:id`  | ✅   | Delete a journal entry    |

### Reports
| Method | Endpoint       | Auth | Description                          |
|--------|----------------|------|-------------------------------------|
| GET    | `/api/report`  | ✅   | Get combined cycles + symptoms data |

---

## 📄 License

This project is licensed under the terms of the [LICENSE](LICENSE) file included in the repository.
