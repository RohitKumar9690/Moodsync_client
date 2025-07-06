import { useState } from "react";
import { motion } from "framer-motion";

const moods = [
  {
    type: "depressed",
    emoji: "😭",
    label: "Depressed",
    mood_level: 1,
  },
  {
    type: "sad",
    emoji: "😢",
    label: "Sad",
    mood_level: 2,
  },
  {
    type: "angry",
    emoji: "😠",
    label: "Angry",
    mood_level: 3,
  },
  {
    type: "anxious",
    emoji: "😰",
    label: "Anxious",
    mood_level: 4,
  },
  {
    type: "tired",
    emoji: "😴",
    label: "Tired",
    mood_level: 5,
  },
  {
    type: "okay",
    emoji: "🙂",
    label: "Okay",
    mood_level: 6,
  },
  {
    type: "calm",
    emoji: "😌",
    label: "Calm",
    mood_level: 7,
  },
  {
    type: "happy",
    emoji: "😊",
    label: "Happy",
    mood_level: 8,
  },
  {
    type: "excited",
    emoji: "😁",
    label: "Excited",
    mood_level: 9,
  },
  {
    type: "ecstatic",
    emoji: "🤩",
    label: "Ecstatic",
    mood_level: 10,
  },
];

export default function MoodSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (mood) => {
    setSelected(mood.type);
    if (onSelect) onSelect(mood);
  };

  // Helper to detect video
  const isVideo = (url) => url.endsWith(".mp4");

  return (
    <div className="glass p-6 rounded-xl text-white text-center shadow-xl space-y-4">
      <h2 className="text-xl font-bold">💬 How do you feel today?</h2>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {moods.map((mood) => (
          <motion.div
            key={mood.type}
            onClick={() => handleSelect(mood)}
            className={`cursor-pointer p-2 rounded-lg transition ${selected === mood.type ? "ring-2 ring-indigo-400" : "hover:scale-105"
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full shadow-md bg-white/20 text-4xl">
              {mood.emoji}
            </div>


            <p className="mt-2 text-sm">{mood.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
