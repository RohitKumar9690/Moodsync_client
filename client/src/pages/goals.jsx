// components/Goals.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGoal, getGoals, deleteGoal, updateGoal } from "../hooks/goalhook";
import { motion, AnimatePresence } from "framer-motion";
import DeleteModal from "../utils/modals/deleteModal";
import { showSuccess } from "../utils/toast";

export default function Goals() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.authUser);
  const { goals, loading } = useSelector((state) => state.goals);

  useEffect(() => {
    if (user?.id) dispatch(getGoals(user.id));
  }, [dispatch, user]);

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim() || !date) return;

    const goalData = {
      user_id: user?.id || 0,
      title,
      description: desc,
      completed: false,
      target_date: date,
    };

    const action = editId
      ? updateGoal({ ...goalData, id: editId })
      : createGoal(goalData);

    dispatch(action).then(() => {
      dispatch(getGoals(user.id)); 
    });

    setEditId(null);
    setTitle("");
    setDesc("");
    setDate("");
  };

  const handleEdit = (goal) => {
    setTitle(goal.title);
    setDesc(goal.description);
    setDate(goal.target_date);
    setEditId(goal.id);
  };
  console.log(goals);
const handleDelete = (data) =>
 {
setDeleteId(data);
setDeleteModalOpen(true);
 }
console.log(deleteId);

const handleOpenDeleteModal = () =>{
  if(deleteId){
    dispatch(deleteGoal(deleteId.id)).then(() => {
      dispatch(getGoals(user.id));
    });
    showSuccess("Goal deleted successfully!");
    setDeleteId(null);
    setDeleteModalOpen(false);
  }
 
}
  return (
    <div className="space-y-10 px-4">
      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl text-white space-y-4 border border-white/20">
        <h2 className="text-2xl font-bold text-center">
          {editId ? "✏️ Edit Goal" : "🚀 Set a Goal"}
        </h2>

        <input
          type="text"
          placeholder="Goal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white"
        />

        <div className="flex justify-between items-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Saving..." : editId ? "Update Goal" : "Add Goal"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setTitle("");
                setDesc("");
                setDate("");
              }}
              className="ml-4 text-sm text-red-400 hover:text-red-500"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Goal List */}
      <div>
        <h3 className="text-2xl font-semibold text-white text-center mb-6">
          📊 Your Goals
        </h3>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            <AnimatePresence>
              {goals?.length > 0 ? (
                [...goals].reverse().map((goal) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-md p-5 rounded-xl text-white shadow-md border border-white/20"
                  >
                    <h4 className="text-lg font-bold">{goal.title}</h4>
                    <p className="text-sm text-gray-300 mt-1">{goal.description}</p>
                    <p className="text-sm mt-1">Target: {goal.target_date}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleEdit(goal)}
                        className="text-sm px-3 py-1 bg-yellow-400/20 hover:bg-yellow-400/30 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(goal);
                        }}
                        className="text-sm px-3 py-1 bg-red-400/20 hover:bg-red-400/30 rounded"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          dispatch(updateGoal({ ...goal, completed: !goal.completed }))
                            .then(() => dispatch(getGoals(user.id))) // Refresh goals after update
                        }
                        className={`text-sm px-3 py-1 rounded ${goal.completed
                          ? "bg-green-500/30 hover:bg-green-500/40"
                          : "bg-blue-500/20 hover:bg-blue-500/30"
                          }`}
                      >
                        {goal.completed ? "Completed" : "Mark Done"}
                      </button>

                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-white text-center col-span-full">No goals yet</p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
     <DeleteModal
  isOpen={deleteModalOpen}
  onClose={() => {
    setDeleteModalOpen(false);
    setDeleteId(null);
  }}
  onConfirm={handleOpenDeleteModal}
/>

    </div>
  );
}
