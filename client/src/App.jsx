import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MoodTracker from "./pages/MoodTracker";
import Journal from "./pages/JournalEntry";
import Goals from "./pages/Goals";
import Home from "./pages/home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import Habit from "./pages/habit";
import HabitDetails from "./components/habitsdeatils";
import JournalRead from "./components/JournalRead";
import About from "./pages/about";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoute";

export default function App() {
  return (
    <Routes>
 
      {/* Public routes */}
      <Route
        path="signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />



      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mood" element={<MoodTracker />} />
          <Route path="journal" element={<Journal />} />
          <Route path="goals" element={<Goals />} />
          <Route path="about" element={<About />} />
          <Route path="habits" element={<Habit />} />
          <Route path="habit/:id" element={<HabitDetails />} />
          <Route path="journal/:id" element={<JournalRead />} />
        </Route>
      </Route>
    </Routes>
  );
}
