import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { gethabitCreateType, habitCreateType } from "../hooks/habitshook";
import { useNavigate } from "react-router-dom";
import HabitModal from "../utils/modals/editHabitModal";
import { showSuccess } from "../utils/toast";
const today = new Date().toISOString().split("T")[0];

const initialEntries = [
  { habit_id: 1, completed: true },
  { habit_id: 3, completed: true },
  { habit_id: 4, completed: false },
];

export default function Habbit() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.authUser);
  const habitded = useSelector((state) => state.habits.habits);
  const ent = useSelector((state) => state.habits.habits);
  // console.log(user);
  // console.log(ent.entries);




  const navigate = useNavigate();
  useEffect(() => {
    if (user?.id) dispatch(gethabitCreateType(user.id));
  }, [dispatch, user]);
  const [showModal, setShowModal] = useState(false);
  const handleNavigate = (id) => {
    // console.log(id)
    navigate(`/habit/${id}`);

  }

  const [habits, setHabits] = useState([]);
  const [entries, setEntries] = useState(initialEntries);
  // console.log("habitded", habitded);
  useEffect(() => {
    if (habitded?.length) {
      setHabits(habitded);
    }
  }, [habitded]);
  const handleToggle = (habitId) => {
    setEntries((prev) => {
      const exists = prev.find((e) => e.habit_id === habitId);
      if (exists) {
        return prev.map((e) =>
          e.habit_id === habitId ? { ...e, completed: !e.completed } : e
        );
      } else {
        return [...prev, { habit_id: habitId, completed: true }];
      }
    });
  };


  const getStatus = (habitId) =>
    entries.find((e) => e.habit_id === habitId)?.completed || false;

  const grouped = {
    good: habits.filter((h) => h.type === "good"),
    bad: habits.filter((h) => h.type === "bad"),
    quit: habits.filter((h) => h.type === "quit"),
  };

  const handleAddHabit = (data) => {

    const newhabit = {
      user_id: user.id,
      title: data.title,
      type: data.type,
      start_date: data.start_date,
      end_date: data.end_date
    }
    console.log(newhabit);
    showSuccess("Habit created successfully!");
    dispatch(habitCreateType(newhabit)).then(() => dispatch(gethabitCreateType(user.id)));
    setHabits((prev) => [...prev, newhabit]);
    setShowModal(false);
  };



  return (
  <div className="p-6 max-w-6xl mx-auto grid gap-6">
    <h1 className="text-3xl text-white font-bold mb-2">🧩 Your Habits</h1>

    {habitded.length === 0 ? (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">No habits yet!</h2>
      </div>
    ) : (
      <>
        {["good", "bad", "quit"].map((category) => (
          <motion.div
            key={category}
            className="glass rounded-xl p-5 border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4 capitalize">
              {category === "good" && "🌟 Good Habits"}
              {category === "bad" && "⚠️ Bad Habits"}
              {category === "quit" && "🚫 To Quit"}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {grouped[category].map((habit) => (
                <div
                  key={habit.id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-lg text-white flex justify-between items-center relative hover:bg-white/20 transition"
                >
                  <div onClick={() => handleNavigate(habit.id)} className="cursor-pointer">
                    <p className="text-lg font-medium">{habit.title}</p>
                    <p className="text-sm text-white/50">Today: {today}</p>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => handleNavigate(habit.id)}
                      className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition"
                    >
                      See More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </>
    )}

    {/* ➕ Add Habit Button */}
    <div className="mt-6 text-center">
      <button
        className="px-6 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition"
        onClick={() => setShowModal(true)}
      >
        ➕ Add Custom Habit
      </button>
    </div>

    {/* Habit Modal */}
    <HabitModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      onSubmit={handleAddHabit}
      initialData={{
        title: '',
        type: 'good',
        start_date: today,
        end_date: today,
      }}
      mode="create"
    />
  </div>
);

}
