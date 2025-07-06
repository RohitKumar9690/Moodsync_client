import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const features = [
  {
    title: "📔 Journal",
    description:
      "Capture your thoughts, reflect on your day, and record daily entries to stay mindful and self-aware.",
  },
  {
    title: "🎯 Goals",
    description:
      "Set, track, and complete personal goals. Stay motivated by celebrating your progress along the way.",
  },
  {
    title: "📊 Mood Tracker",
    description:
      "Log your mood with emojis, monitor your emotional trends, and gain self-awareness over time.",
  },
  {
    title: "🌀 Habit Types",
    description:
      "Track habits by type: Good (✅), Bad (⚠️), or Quit (🛑). Visualize consistency and stay accountable.",
  },
];

const About = () => {
  return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-white space-y-4">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold mb-4">About MoodSync</h1>
        <p className="text-lg text-indigo-200">
          MoodSync helps you track your emotions, habits, and goals with a beautiful, distraction-free interface. Built for personal growth and mindful living.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-white/20"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="text-xl font-bold text-white mb-2">
              {feature.title}
            </h2>
            <p className="text-indigo-100 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact / Footer Section */}
      <div className="mt-16 text-center">
        <motion.h3
          className="text-2xl font-semibold mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          👋 Made with love by Rohit Kumar
        </motion.h3>
        <p className="text-indigo-300 text-sm mb-4">Reach out or follow on social media:</p>
        <div className="flex justify-center gap-6 mt-4 text-2xl">
          <a
            href="https://www.linkedin.com/in/rohit-kumar-a40901274/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-white transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
