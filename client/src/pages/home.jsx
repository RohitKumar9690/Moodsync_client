import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MoodSelector from "../components/MoodSelector";
import { useSelector, useDispatch } from "react-redux";
import { createMood, getMoods } from "../hooks/moodhook";
import { gethabitCreateType } from "../hooks/habitshook"
import { useNavigate } from "react-router-dom"
import { getJournals } from "../hooks/journalhook";
import { getGoals } from "../hooks/goalhook";
export default function Home() {
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [goals, setGoals] = useState([]);
  const [thought, setThought] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleMoodSelection = (mood) => {
    if (!user?.id) return;

    const data = {
      user_id: user.id,
      mood_level: mood.mood_level,
      mood_type: mood.type,
      note: ""
    };
    dispatch(createMood(data));
  };

  const moodEmojis = {
    1: "😭",
    2: "😢",
    3: "😔",
    4: "😟",
    5: "🙂",
    6: "😊",
    7: "😄",
    8: "😁",
    9: "😆",
    10: "🤩",
  };


  const user = useSelector((state) => state.user.authUser);
  const journal = useSelector((state) => state.journals.journals);
  const goal = useSelector((state) => state.goals.goals);
  const mood = useSelector((state) => state.mood.moods);
  const habits = useSelector((state) => state.habits.habits);
  // console.log(mood);
  // console.log(goal);
  // console.log(user);
  // console.log(habits);

  const todayDateISO = new Date().toISOString().split("T")[0];
  const rawLatestMood = Array.isArray(mood)
    ? [...mood]
      .filter((m) => m.created_at.startsWith(todayDateISO))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
    : null;

  const latestMood = rawLatestMood
    ? {
      level: rawLatestMood.mood_level,
      type: rawLatestMood.mood_type,
      dateISO: rawLatestMood.created_at.split("T")[0],
    }
    : null;


  // console.log(latestMood);
  // console.log();
  const handleNavigate = (id) => {
    // console.log("habit id", id);
    navigate(`/habit/${id}`);

  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  useEffect(() => {
    if (mood && Array.isArray(mood)) {
      const transformed = mood.map((m) => ({
        date: new Date(m.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        level: m.mood_level,
        type: m.mood_type,
      }));

      setMoods(transformed.reverse());
    }
    if (journal) setJournals(journal);
    if (goal) setGoals(goal);

    const thoughts = [
      "🌱 Growth is a journey, not a race.",
      "🌟 Every emotion is valid.",
      "💧 Breathe. Relax. Reflect.",
      "🌈 It’s okay to have down days.",
      "🔥 Small steps = Big changes.",
    ];
    setThought(thoughts[Math.floor(Math.random() * thoughts.length)]);

  }, [mood, journal, goal]);
  useEffect(() => {
    if (user?.id) {
      dispatch(getMoods(user.id));
      dispatch(gethabitCreateType(user.id));
      dispatch(getJournals(user.id));
      dispatch(getGoals(user.id));
    }
  }, [user?.id, dispatch]);




  return (
    <div className="w-full px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">

        {/* Ask How are you today */}
        <motion.div
          className="glass p-6 rounded-xl shadow-xl col-span-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 
             bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 
             bg-clip-text  drop-shadow-sm animate-fade-in"
          >
            👋 {getGreeting()}, {user?.name || "User"}!
          </h2>

          {latestMood?.dateISO === todayDateISO ? (
            // If mood already set for today, show mood card
            <div className="w-full my-4 flex flex-col sm:flex-row items-center sm:items-start bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl p-4 shadow-md gap-4">
              <div className="text-5xl">{moodEmojis?.[latestMood?.level]}</div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-white/60">Your mood today is</p>
                <p className="text-xl font-bold capitalize">
                  {latestMood?.type}
                </p>
              </div>
            </div>
          ) : (
            // If today's mood not set, show selector
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <MoodSelector onSelect={handleMoodSelection} />
              </div>
            </div>
          )}

        </motion.div>

        {/* Mood Chart */}
        <motion.div
          className="glass p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold mb-4">Mood Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={moods}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis
                domain={[1, 10]}
                stroke="#ccc"
                tickFormatter={(level) => moodEmojis[level] || level}
              />
              <Tooltip
                formatter={(value) => `${moodEmojis[value]} (${value})`}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="level"
                stroke=""
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>

        </motion.div>

        {/* Thought of the Day */}
        <motion.div
          className="glass p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-white mb-2">💭 Thought of the Day</h2>
          <p className="text-white text-lg">{thought}</p>
        </motion.div>



        <motion.div
          className="glass p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-white mb-4" onClick={() => navigate(`/journal`)}>Recent Journals</h2>
          {journals.length === 0 ? (
            <p className="col-span-full text-center text-white/60 italic">No journals yet.</p>
          ) : (
            <ul className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">
              {journals.map((j, index) => (
                <li
                  key={j.id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-xl text-white shadow-lg flex flex-col justify-between transition hover:bg-white/20"
                >
                  {/* Top Section */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{moodEmojis?.[j?.mood_level] || "📝"}</div>
                    <p className="text-lg font-semibold truncate">{j.title}</p>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-white/70 break-words line-clamp-3 mb-4 ml-1">
                    {j.content}
                  </p>

                  {/* Footer with button */}
                  <div className="text-right mt-auto">
                    <button
                      className="text-sm px-4 py-1 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition"
                      onClick={() => navigate(`/journal/${j.id}`)}
                    >
                      Read More
                    </button>
                  </div>
                </li>
              ))}
            </ul>

          )}

        </motion.div>

        {/* Goals */}
        <motion.div
          className="glass p-6 rounded-xl shadow-xl "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white mb-4" onClick={() => navigate(`/goals`)}>📌 Today's Goals</h2>

          {goals.length === 0 ? (
            <p className="col-span-full text-center text-white/60 italic">No goals yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`p-5 rounded-xl backdrop-blur-lg border border-white/20 shadow-md transition hover:bg-white/20 
        ${goal.completed ? "bg-green-500/10 text-green-300" : "bg-yellow-500/10 text-yellow-200"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-lg font-semibold">{goal.title}</p>
                    <span className="text-xl">{goal.completed ? "✅" : "⏳"}</span>
                  </div>
                  <p className="text-sm text-white/60">
                    {goal.completed ? "Completed" : "In Progress"}
                  </p>
                </div>
              ))}
            </div>
          )}

        </motion.div>
        <motion.div
          className="glass p-6 rounded-xl shadow-xl col-span-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Habits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {habits.filter(habit => {
              if (!habit.end_date) return true;
              const today = new Date();
              const endDate = new Date(habit.end_date);
              return endDate >= today;
            }).length === 0 ? (
              <div className="col-span-full text-center text-white/60 italic">
                No habits yet added
              </div>
            ) : (
              habits
                .filter(habit => {
                  if (!habit.end_date) return true;
                  const today = new Date();
                  const endDate = new Date(habit.end_date);
                  return endDate >= today;
                })
                .map(habit => {
                  const totalDays = habit?.progress?.total_days || 0;
                  const completed = habit?.progress?.completed_days || 0;
                  const skipped = habit?.progress?.skipped_days || 0;

                  const percentCompleted = totalDays
                    ? Math.round(((completed + skipped) / totalDays) * 100)
                    : 0;

                  const typeBadge =
                    habit.type === "good"
                      ? { label: "🌟 Good Habit", color: "bg-green-500/20 text-green-300" }
                      : habit.type === "bad"
                        ? { label: "⚠️ Bad Habit", color: "bg-red-500/20 text-red-300" }
                        : { label: "🚫 To Quit", color: "bg-yellow-500/20 text-yellow-300" };

                  return (
                    <div
                      key={habit.id}
                      className="relative border border-white/10 rounded-2xl p-4 bg-white/5 backdrop-blur-md shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer space-y-3"
                      onClick={() => handleNavigate(habit.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${typeBadge.color}`}>
                          {typeBadge.label}
                        </span>
                        <span className="text-[11px] text-white/40">
                          Start: {habit.start_date || "N/A"}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-white break-words leading-tight">
                        {habit.title}
                      </h3>

                      <div className="space-y-1">
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${percentCompleted >= 70
                                ? "bg-green-400"
                                : percentCompleted >= 30
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                              } transition-all`}
                            style={{ width: `${percentCompleted}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-white/60 text-right">
                          {percentCompleted}% completed
                        </div>
                      </div>

                      <div className="text-xs text-white/60 italic">
                        Ends on: {habit.end_date || "N/A"}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
