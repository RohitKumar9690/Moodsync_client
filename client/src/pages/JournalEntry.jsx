import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createJournal,
  getJournals,
  deleteJournal,
  updateJournal,
} from "../hooks/journalhook";
import { getMoods } from "../hooks/moodhook";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../utils/modals/deleteModal";



export default function JournalEntry() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [journalToDelete, setJournalToDelete] = useState(null);

  const dispatch = useDispatch();
  const { journals, loading } = useSelector((state) => state.journals);
  const { moods } = useSelector((state) => state.mood);
  const user = useSelector((state) => state.user.authUser);
  const navigate = useNavigate();

  const emojis = {
    1: "😭", 2: "😢", 3: "😔", 4: "😟", 5: "🙂", 6: "😊", 7: "😄", 8: "😁", 9: "😆", 10: "🤩"
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(getMoods(user.id));
      dispatch(getJournals(user.id));
    }
  }, [dispatch, user]);

  const handleSubmit = () => {
    if (!title.trim() && !content.trim()) return;

    const journalData = {
      user_id: user?.id || 0,
      title,
      content,
      mood_linked: selectedMood,
    };

    const action = editId
      ? updateJournal({ id: editId, title, content, mood_linked: selectedMood })
      : createJournal(journalData);

    dispatch(action).then(() => {
      dispatch(getJournals(user.id)); // 🔄 Refresh after action
    });

    setEditId(null);
    setTitle("");
    setContent("");
    setSelectedMood(null);
  };
  const handleDeleteClick = (journal) => {
    setJournalToDelete(journal);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!journalToDelete) return;

    dispatch(deleteJournal(journalToDelete.id)).then(() => {
      dispatch(getJournals(user.id));
      setDeleteModalOpen(false);
      setJournalToDelete(null);
    });
  };
  // console.log(selectedMood);


  const handleEdit = (journal) => {
    setEditId(journal.id);
    setTitle(journal.title);
    setContent(journal.content);
    setSelectedMood(journal.mood_linked || null);
  };

  const getEmoji = (moodId) => {
    const mood = moods.find((m) => m.id === moodId);
    return mood ? emojis[mood.mood_level] : "";
  };

  return (
    <div className="space-y-10 px-4">
      {/* Journal Form (Create or Edit) */}
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl text-white space-y-4 border border-white/20 transition-all duration-300">
        <h2 className="text-2xl font-bold text-center">
          {editId ? "✏️ Edit Journal Entry" : "📔 Create Journal Entry"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
        />

        <textarea
          rows="4"
          placeholder="Write how you feel..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white auo placeholder-white/70"
        />

        <div>
          <label className="block mb-1 text-sm">Link to Mood:</label>
          <select
            value={selectedMood || ""}
            onChange={(e) => setSelectedMood(Number(e.target.value))}
            className="w-full p-2 rounded-lg bg-white/20 border border-white/30 text-white"
          >
            <option value="">-- Select a mood --</option>
            {moods.map((mood) => (
              <option key={mood.id} value={mood.id}>
                {emojis[mood.mood_level]}{" "}
                {mood.note ? `"${mood.note}"` : mood.mood_type} (Level {mood.mood_level})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setTitle("");
                setContent("");
                setSelectedMood(null);
              }}
              className="ml-4 text-sm text-red-400 hover:text-red-500"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setJournalToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />


      {/* Journal List */}
      <div>
        <h3 className="text-2xl font-semibold text-white text-center mb-6">📝 Recent Journals</h3>
        <div className="flex justify-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            <AnimatePresence>
              {journals?.length > 0 ? (
                [...journals].reverse().map((journal) => (
                  <motion.div
                    key={journal.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl text-white shadow-md relative transition-all hover:shadow-xl hover:scale-[1.02]"
                  >
                    {/* Mood Emoji and Title */}
                    <div className="flex items-start gap-3 mb-3">
                      {journal.mood_linked && (
                        <div className="text-4xl">{getEmoji(journal.mood_linked)}</div>
                      )}
                      <h4 className="text-lg font-bold leading-snug mt-1">📝 {journal.title}</h4>
                    </div>

                    {/* Content Preview */}
                    <p className="text-sm text-gray-300 mb-3 line-clamp-3 leading-relaxed">
                      {journal.content}
                    </p>

                    {/* Date */}
                    <p className="text-xs text-indigo-300 mb-4">
                      <span className="font-semibold">📅 Date:</span>{" "}
                      {new Date(journal.created_at).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-auto ">
                      <button
                        onClick={() => navigate(`/journal/${journal.id}`)}
                        className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white/90 transition"
                      >
                        📖 Read More
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(journal)}
                          className="text-xs px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-200 rounded-md transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(journal)}
                          className="text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-md transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-white text-center col-span-full">No journal entries yet</p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
