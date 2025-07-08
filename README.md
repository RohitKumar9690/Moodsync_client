# 🧠 MoodSync – Mood, Habit & Journal Tracker

MoodSync is a modern fullstack application designed to help users track their **moods**, **habits**, **goals**, and **daily journals** in a beautifully animated and intuitive interface.
---

## screenshot
- ### 📝 Sign Up

<p align="center">
  <img src="https://github.com/user-attachments/assets/fb7ec26c-4c93-4a87-a4ba-07060df0f406" width="600" alt="Sign Up Screenshot">
</p>

<p align="center"><i>Sign UP</i></p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/1769624e-228b-499b-a177-397553c3a888" width="600" alt="Sign Up Screenshot">
</p>
<p align="center"><i>Log in</i></p>

![image](https://github.com/user-attachments/assets/1769624e-228b-499b-a177-397553c3a888)
![MoodSync-Habits-Tracker (1)](https://github.com/user-attachments/assets/b1c73f0d-39c8-4bfd-a50f-e9b427bcefa5)
![Screenshot 2025-07-08 125838](https://github.com/user-attachments/assets/426794fe-38e3-42f3-8539-d60ee7a31b80)
![Screenshot 2025-07-08 130001](https://github.com/user-attachments/assets/2847da4a-82d7-4c9e-bd0c-6c0326e05c60)
![Screenshot 2025-07-08 125953](https://github.com/user-attachments/assets/b38f808f-9d45-4629-96f1-ddf4cc8c7d17)
![Screenshot 2025-07-08 125859](https://github.com/user-attachments/assets/c443d3d7-687a-4c11-8aef-eea15ec79b01)
![Screenshot 2025-07-08 125953](https://github.com/user-attachments/assets/2cca31c5-ac46-4373-b4c1-d1e5eb325762)

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


### ⚙️ Backend

- ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
- ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
- 🔐 JWT Authentication
- 🛡️ Bcrypt Password Hashing
- 🗃️ SQLAlchemy

 ---
## 💎 UI & UX

- 🌌 **Glassmorphism Design** — iOS 18 inspired aesthetics
- 🌠 **Animated UI** using Framer Motion
- 📱 **Mobile-first Responsive Design**

---

## 🔐 Authentication Logic

- JWT tokens are issued upon login
- Tokens auto-expire after defined TTL
- Expired or invalid tokens auto-redirect users to `/login`
  
---
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
