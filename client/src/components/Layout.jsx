// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">
      <Navbar />
      <main className="pt-20 px-4 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
