// components/AvatarDropdown.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-white/20 backdrop-blur-md text-white rounded-lg shadow-xl z-50 border border-white/30"
          >
            <ul className="text-sm">
              <li>
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-white/10 transition"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="block px-4 py-2 hover:bg-white/10 transition"
                >
                  Settings
                </a>
              </li>
              <li>
                <button
                  onClick={() => alert("Logging out...")}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
