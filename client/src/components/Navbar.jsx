import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AvatarDropdown from "./AvatarDropdown";
import { FaGithub, FaLinkedin} from "react-icons/fa";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const links = [
    { name: "Home", to: "/" },
    { name: "Mood", to: "/mood" },
    { name: "Journal", to: "/journal" },
    { name: "Goals", to: "/goals" },
    { name: "Habits", to: "/habits" },
    { name: "Profile", to: "/profile" },
    { name: "About", to: "/about" },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/RohitKumar9690" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/rohit-kumar-a40901274/" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center rounded-b-xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:backdrop-blur-md hover:bg-white/20 hover:shadow-lg border-b border-white/20">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl">
          😊 MoodSync
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="relative text-white font-bold px-3 py-1 hover:text-purple-300 transition duration-300
             after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
             after:bg-purple-300 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>

          ))}

          {/* Contact Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowContact((prev) => !prev)}
              className="text-white px-3 py-1 font-bold rounded hover:bg-white/20 transition "
            >
              Contact Me
            </button>

            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-4 bg-white/20 backdrop-blur-lg border border-white/30 text-white rounded-lg shadow-lg p-3 space-x-3"
                >
                  {socialLinks.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-300 transition text-xl"
                    >
                      {item.icon}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/10 backdrop-blur-md px-4 py-2 rounded-b-xl border-b border-white/20 space-y-2"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block text-white font-bold py-2 px-3 rounded hover:bg-white/20 transition"
              >
                {link.name}
              </Link>
            ))}

            {/* Contact Me Inline Section */}
            <div className="pt-2 border-t border-white/20 ">
              <p className="text-white text-sm mb-2 font-bold">Contact Me:</p>
              <div className="flex gap-4 text-xl ">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 transition"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <AvatarDropdown />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
