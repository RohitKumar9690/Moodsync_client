# 🧠 MoodSync – Mood, Habit & Journal Tracker

MoodSync is a modern fullstack application designed to help users track their **moods**, **habits**, **goals**, and **daily journals** in a beautifully animated and intuitive interface.

---

## ✨ Features

- 📝 Journal Logging with Mood Association
- 🎯 Goal Tracking
- 🔄 Good, Bad & Quit Habit Management
- 📅 Calendar Integration for Daily Views
- 📈 Progress Charts with Recharts
- 💡 Mood-based Emoji UI
- 🔐 JWT Authentication (Login/Register)
- 🎨 Responsive UI with Animations

---
## 🛠️ Technologies Used


### 🎨 Frontend

- ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?logo=framer&logoColor=white)
- ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?logo=redux&logoColor=white)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
- ![Recharts](https://img.shields.io/badge/Recharts-FF0000?logo=recharts&logoColor=white)
- ![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?logo=react&logoColor=white)
- ![React Hot Toast](https://img.shields.io/badge/Hot_Toast-FF8800?logo=react&logoColor=white)
- 🧠 HeadlessUI
- 🦸 Heroicons

### ⚙️ Backend

- ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
- ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
- 🔐 JWT Authentication
- 🛡️ Bcrypt Password Hashing
- 🗃️ SQLAlchemy

 ---
## 💎 UI & UX

- 🌌 **Glassmorphism Design** — iOS 16 inspired aesthetics
- 🌠 **Animated UI** using Framer Motion
- 📱 **Mobile-first Responsive Design**

---

## 🔐 Authentication Logic

- JWT tokens are issued upon login
- Tokens auto-expire after defined TTL
- Expired or invalid tokens auto-redirect users to `/login`
  
---
| Dashboard                                                                  | Habits                                                                | Habits Insight                                                                         |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![dash](![moodsyn netlify app_login(iPhone 12 Pro) (2)](https://github.com/user-attachments/assets/8f11d89a-931e-42b2-9ee3-7f22df3d7d13)) | ![Habits](![moodsyn netlify app_login(iPhone 12 Pro) (5)](https://github.com/user-attachments/assets/498bcd19-f75c-4395-acf8-6e5c689c9542)) | ![Habit Insight](![moodsyn netlify app_login(iPhone 12 Pro) (3)](https://github.com/user-attachments/assets/2c41d1a2-9e30-4116-afbc-3940b8aaba7d)) |

## 🚀 Getting Started

```bash
# Backend
cd server
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd client
npm install
npm run dev
