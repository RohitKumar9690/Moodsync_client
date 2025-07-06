import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMood, getMoods, deleteMood, updateMood } from "../hooks/moodhook";
import { motion, AnimatePresence } from "framer-motion";
import DeleteModal from "../utils/modals/deleteModal";
import { showSuccess } from "../utils/toast";

export default function MoodTracker() {
  const [moodLevel, setMoodLevel] = useState(5);
  const [moodType, setMoodType] = useState("happy");
  const [note, setNote] = useState("");
  const [emoji, setEmoji] = useState("🙂");
  const [animate, setAnimate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteShowmodel, setDeleteShowmodel] = useState(false);
  const[selectedMood, setSelectedMood] = useState(null);

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

  return (
    <div className="space-y-6">
      {/* Mood Form */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-white space-y-4">
        <h2 className="text-xl font-bold text-center">
          {editId ? "Edit Mood" : "How are you feeling?"}
        </h2>

        <div className="flex justify-center">
          <div
            className={`text-5xl transition-transform duration-300 ${
              animate ? "scale-125" : "scale-100"
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
            {loading ? "Saving..." : "Save Mood"}
        </button>
      </div>

      {/* Recent Moods */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
    Recently Tracked Moods
  </h2>
     <div className="mt-8 flex justify-center">
      
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl px-4">
    {loading ? (
      <p className="text-white text-center col-span-full w-full">Loading moods...</p>
    ) : moods?.length > 0 ? (
      <AnimatePresence>
        {[...moods].reverse().map((mood) => (
          <motion.div
            key={mood.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-md p-4 rounded-lg text-white shadow relative text-center"
          >
            <div className="text-4xl">{emojis[mood.mood_level]}</div>
            <div className="mt-2 font-semibold capitalize">{mood.mood_type}</div>
            <div className="text-sm text-gray-300">Level: {mood.mood_level}</div>
            {mood.note && (
              <div className="text-sm mt-1 italic text-gray-200">"{mood.note}"</div>
            )}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => handleEdit(mood)}
                className="text-sm px-2 py-1 bg-yellow-400/20 hover:bg-yellow-400/30 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(mood)}
                className="text-sm px-2 py-1 bg-red-400/20 hover:bg-red-400/30 rounded"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    ) : (
      <p className="text-white text-center col-span-full w-full">No moods yet</p>
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
