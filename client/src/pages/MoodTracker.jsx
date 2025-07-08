import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMood, getMoods, deleteMood, updateMood } from "../hooks/moodhook";
import { motion, AnimatePresence } from "framer-motion";
import DeleteModal from "../utils/modals/deleteModal";
import { showSuccess } from "../utils/toast";
import Loader from "../utils/loaders/loader2";

export default function MoodTracker() {
  const [moodLevel, setMoodLevel] = useState(5);
  const [moodType, setMoodType] = useState("happy");
  const [note, setNote] = useState("");
  const [emoji, setEmoji] = useState("🙂");
  const [animate, setAnimate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteShowmodel, setDeleteShowmodel] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const user = useSelector((state) => state.user.authUser);
  const { loading, moods } = useSelector((state) => state.mood);
  const dispatch = useDispatch();

  const emojis = {
    1: "😭", 2: "😢", 3: "😔", 4: "😟", 5: "🙂",
    6: "😊", 7: "😄", 8: "😁", 9: "😆", 10: "🤩",
  };

  useEffect(() => {
    setEmoji(emojis[moodLevel]);
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timeout);
  }, [moodLevel]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getMoods(user.id));
    }
  }, [dispatch, user]);

  const handleSave = () => {
    if (!user?.id) return;

    const moodData = {
      user_id: user.id,
      mood_level: moodLevel,
      mood_type: moodType,
      note,
    };

    if (editId) {
      dispatch(updateMood({ ...moodData, id: editId })).then(() => {
        resetForm();
        dispatch(getMoods(user.id));
        showSuccess("Mood updated successfully");
      });
    } else {
      dispatch(createMood(moodData)).then(() => {
        resetForm();
        dispatch(getMoods(user.id));
        showSuccess("Mood created successfully!");
      });
    }
  };

  const handleEdit = (mood) => {
    setMoodLevel(mood.mood_level);
    setMoodType(mood.mood_type);
    setNote(mood.note || "");
    setEditId(mood.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (data) => {
    setSelectedMood(data);
    setDeleteShowmodel(true);
  };
  // console.log(selectedMood);

  const handleDeleteConfirm = () => {
    if (selectedMood) {
      dispatch(deleteMood(selectedMood.id)).then(() => {
        dispatch(getMoods(user.id));
        setDeleteShowmodel(false);
        setSelectedMood(null);
        showSuccess("Mood deleted successfully!");

      });
    }
  };

  const resetForm = () => {
    setMoodLevel(5);
    setMoodType("happy");
    setNote("");
    setEditId(null);
  };
  // console.log(moods);

  return (
    <div className="space-y-6">
      {/* Mood Form */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-white space-y-4">
        <h2 className="text-xl font-bold text-center">
          {editId ? "Edit Mood" : "How are you feeling?"}
        </h2>

        <div className="flex justify-center">
          <div
            className={`text-5xl transition-transform duration-300 ${animate ? "scale-125" : "scale-100"
              }`}
          >
            {emoji}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-center">Mood Level: {moodLevel}</label>
          <input
            type="range"
            min={1}
            max={10}
            value={moodLevel}
            onChange={(e) => setMoodLevel(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <select
          value={moodType}
          onChange={(e) => setMoodType(e.target.value)}
          className="w-full p-2 rounded bg-white/20 border border-white/30 text-white"
        >
          {["happy", "sad", "angry", "calm", "anxious", "tired"].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note"
          className="w-full p-2 rounded bg-white/20 border border-white/30 text-white"
        />

        <button
          onClick={handleSave}
          className={`w-full ${loading ? "bg-indigo-400" : "bg-indigo-500 hover:bg-indigo-600"} py-2 rounded text-white font-semibold transition`}
        >
      Save Mood
        </button>
      </div>

      {/* Recent Moods */}
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Recently Tracked Moods
      </h2>

        <div className="flex justify-center items-center px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {loading ? (
              <div className="text-white text-center col-span-full"><Loader/></div>
            ) : moods?.length > 0 ? (
              <AnimatePresence>
                {[...moods].reverse().map((mood) => (
                  <motion.div
                    key={mood.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:shadow-xl backdrop-blur-sm p-6 rounded-2xl text-white shadow-md relative text-center transition-all duration-300"
                  >
                    <div className="text-5xl mb-3">{emojis[mood.mood_level]}</div>
                    <h3 className="text-lg font-bold capitalize mb-1">{mood.mood_type}</h3>
                    <p className="text-sm text-gray-300 mb-1">
                      <span className="font-semibold text-indigo-400">Level:</span> {mood.mood_level}
                    </p>
                    <p className="text-sm text-gray-300 mb-4">
                      <span className="font-semibold text-indigo-400">📅 Date:</span>{" "}
                      {new Date(mood.created_at).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <div className="flex justify-center gap-3 mt-4">
                      <button
                        onClick={() => handleEdit(mood)}
                        className="text-sm px-3 py-1.5 bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30 rounded-lg transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(mood)}
                        className="text-sm px-3 py-1.5 bg-red-500/20 text-red-200 hover:bg-red-500/30 rounded-lg transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <p className="text-white text-center col-span-full">No moods yet</p>
            )}
          </div>
        </div>
      <DeleteModal
        isOpen={deleteShowmodel}
        onClose={() => {
          setDeleteShowmodel(false);
          setSelectedMood(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
