import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  habitById,
  habitComplete,
  createEntry,
  updateHabit,
  deleteHabit,
  habitSkip,
} from "../hooks/habitshook";
import DeleteButton from "../utils/buttons/deleteButton";
import EditButton from "../utils/buttons/editButton";
import ButtonGroup from "../utils/buttons/habbitButton";
import DeleteModal from "../utils/modals/deleteModal";
import HabitModal from "../utils/modals/editHabitModal";
import EditEntryModal from "../utils/modals/editEntriesModal";
import GlassyCalendar from "./calender";
import { showSuccess } from "../utils/toast";

const COLORS = ["#4ade80", "#f87171", "#facc15"];

export default function HabitDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const selectedHabit = useSelector((state) => state.habits.selectedHabit);
  const user = useSelector((state) => state.user.authUser);
  const entries = selectedHabit?.entries || [];
  const [showEdit, setShowEdit] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showEntryModal, setShowEntryModal] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteHabit(id)).then(() => navigate('/habits'));
    showSuccess("Habit deleted successfully!");
  };

  const handleEdit = (updatedata) => {
    if (id) dispatch(updateHabit({ id, ...updatedata }));
  };

  useEffect(() => {
    if (id) dispatch(habitById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!id || !user?.id) return;
    const createMissingEntries = async () => {
      const result = await dispatch(habitById(id));
      const habit = result?.payload;
      if (!habit || !habit.entries) return;
      const today = new Date();
      const start = new Date(habit.start_date);
      const end = new Date(habit.end_date);
      const finalDate = today < end ? today : end;
      const existingDates = new Set(habit.entries.map((e) => e.date));
      for (let date = new Date(start); date <= finalDate; date.setDate(date.getDate() + 1)) {
        const isoDate = date.toISOString().split("T")[0];
        if (!existingDates.has(isoDate)) {
          await dispatch(createEntry({
            habit_id: habit.id,
            user_id: user.id,
            date: isoDate,
            completed: false,
            skipped: false,
          }));
        }
      }
      dispatch(habitById(id));
    };
    createMissingEntries();
  }, [id, user?.id, dispatch]);

  const todayISO = new Date().toISOString().split("T")[0];
  const todayEntry = entries.find((e) => e.date === todayISO);

  const handleHabitDone = () => {
    if (todayEntry?.id) dispatch(habitComplete(todayEntry.id));
    showSuccess(`${selectedHabit.title} completed successfully!`);
  };

  const handleHabitSkip = () => {
    if (todayEntry?.id) dispatch(habitSkip(todayEntry.id));
    showSuccess(`${selectedHabit.title} skipped successfully!`);

  };

  const handleEntries = (entry) => {
    if (entry.completed) dispatch(habitComplete(entry.id));
    else if (entry.skipped) dispatch(habitSkip(entry.id));
    dispatch(habitById(id));
    setShowEntryModal(false);
    showSuccess(`${selectedHabit.title} updated successfully!`);
  };

  if (!selectedHabit) return <div className="text-white text-center p-10 text-xl">Loading Habit...</div>;

  const { title = "", type = "", start_date = "", end_date = "", progress = {} } = selectedHabit;

  const data = [
    { name: "Completed", value: progress.completed_days || 0 },
    { name: "Skipped", value: progress.skipped_days || 0 },
    { name: "Remaining", value: (progress.total_days || 0) - ((progress.completed_days || 0) + (progress.skipped_days || 0)) },
  ];

  const calculateLongestStreak = (entries) => {
    let maxStreak = 0, current = 0;
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].completed) {
        current++;
        maxStreak = Math.max(maxStreak, current);
      } else {
        current = 0;
      }
    }
    return maxStreak;
  };

  const entriesMap = entries.reduce((acc, entry) => {
    acc[entry.date] = entry;
    return acc;
  }, {});

  const longestStreak = calculateLongestStreak(entries);

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">📊 Habit Insights</h1>

      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">🧠 Habit Overview</h2>
          <div className="space-y-3 text-white/80">
            <div><span className="font-semibold text-white">Title:</span> {title}</div>
            <div className="capitalize"><span className="font-semibold text-white">Type:</span> {type}</div>
            <div><span className="font-semibold text-white">Start:</span> {start_date}</div>
            <div><span className="font-semibold text-white">End:</span> {end_date}</div>
            <div><span className="font-semibold text-white">Total Days:</span> {progress.total_days || 0}</div>
            <div><span className="font-semibold text-white">Longest Streak:</span> {longestStreak} days</div>
          </div>
          <div className="flex justify-center mt-4 mb-1">
            <ButtonGroup onComplete={handleHabitDone} onSkip={handleHabitSkip} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">📈 Progress Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
                {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-1 gap-4">
        <EditButton onClick={() => setShowEdit(true)} />
        <HabitModal isOpen={showEdit} onClose={() => setShowEdit(false)} onSubmit={handleEdit} mode="edit" initialData={{ title, type, start_date, end_date }} />
        <DeleteButton onClick={() => setShowDelete(true)} />
        <DeleteModal isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={() => handleDelete(id)} title="Delete Habit" description={`Are you sure you want to delete this ${title || "Habit"} ? All progress will be lost forever`} />
      </div>
      <div className="mt-10">
        <h2 className="flex justify-center text-2xl font-semibold mb-4">📋 Daily Entries</h2>

        <GlassyCalendar
          start={start_date}
          end={end_date}
          entriesMap={entriesMap}
          onClick={(entry) => {
            setSelectedEntry(entry);
            setShowEntryModal(true);
          }}
        />
      </div>


      <EditEntryModal
        isOpen={showEntryModal}
        onClose={() => setShowEntryModal(false)}
        entry={selectedEntry}
        onSubmit={handleEntries}
      />


      {/* <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">📋 Daily Entries</h2>
        {entries.length === 0 ? (
          <p className="text-white/50 italic">No entries available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {entries.map((entry) => {
              const statusClass = entry.completed ? "border-green-500/30 bg-green-500/10" : entry.skipped ? "border-yellow-500/30 bg-yellow-500/10" : "border-gray-500/30 bg-white/5";
              const labelClass = entry.completed ? "bg-green-500/20 text-green-300" : entry.skipped ? "bg-yellow-500/20 text-yellow-300" : "bg-gray-500/20 text-gray-300";
              const statusText = entry.completed ? "✅ Completed" : entry.skipped ? "⏭️ Skipped" : "⏳ Pending";
              const label = entry.completed ? "Done" : entry.skipped ? "Skipped" : "Pending";
              return (
                <div key={entry.id} onClick={() => { setSelectedEntry(entry); setShowEntryModal(true); }} className={`p-4 rounded-xl border shadow-sm flex justify-between items-center ${statusClass}`}>
                  <div>
                    <p className="text-lg font-medium">{entry.date}</p>
                    <p className="text-sm text-white/40">Status: {statusText}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${labelClass}`}>{label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div> */}
    </div>
  );
}
