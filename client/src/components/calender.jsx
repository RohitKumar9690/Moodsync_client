import React, { useState } from "react";
import {
  eachDayOfInterval,
  format,
  startOfMonth,
  endOfMonth,
  getDay,
  parseISO,
  isBefore,
  isToday,
  addMonths,
  subMonths,
  isAfter,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

export default function GlassyCalendar({ start, end, onClick, entriesMap = {} }) {
  const parsedStart = parseISO(start);
  const parsedEnd = parseISO(end);

  const [currentMonth, setCurrentMonth] = useState(startOfMonth(parsedEnd));
  const [direction, setDirection] = useState(0);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const hasPrevMonth = isAfter(currentMonth, startOfMonth(parsedStart));
  const hasNextMonth = isBefore(currentMonth, startOfMonth(parsedEnd));

  const handlePrev = () => {
    if (hasPrevMonth) {
      setDirection(-1);
      setCurrentMonth((prev) => subMonths(prev, 1));
    }
  };

  const handleNext = () => {
    if (hasNextMonth) {
      setDirection(1);
      setCurrentMonth((prev) => addMonths(prev, 1));
    }
  };

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg text-white max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrev}
          disabled={!hasPrevMonth}
          className={`text-xl px-3 py-1 rounded hover:bg-white/20 transition ${
            !hasPrevMonth && "opacity-30 cursor-not-allowed"
          }`}
        >
          ⬅️
        </button>
        <motion.h2
          key={format(currentMonth, "yyyy-MM")}
          initial={{ opacity: 0, y: direction > 0 ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction > 0 ? -20 : 20 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-bold text-center"
        >
          {format(currentMonth, "MMMM yyyy")}
        </motion.h2>
        <button
          onClick={handleNext}
          disabled={!hasNextMonth}
          className={`text-xl px-3 py-1 rounded hover:bg-white/20 transition ${
            !hasNextMonth && "opacity-30 cursor-not-allowed"
          }`}
        >
          ➡️
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2 text-sm font-semibold text-center text-white/60">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={format(currentMonth, "yyyy-MM")}
          initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="grid grid-cols-7 gap-2 gap-y-4 text-sm font-semibold"
        >
          {Array(getDay(startOfMonth(currentMonth)))
            .fill(null)
            .map((_, i) => <div key={`blank-${i}`} />)}

          {days.map((date, i) => {
            const dateStr = format(date, "yyyy-MM-dd");
            const entry = entriesMap[dateStr];
            const isPastOrToday = isBefore(date, new Date()) || isToday(date);

            let bgClass = "bg-white/5 text-white";
            let borderClass = "";
            let hover = "hover:bg-white/20";
            let icon = null;

            if (entry?.completed) {
              bgClass = "bg-green-600/20 text-green-300";
              icon = "✅";
              borderClass = "border border-green-400/50";
            } else if (entry?.skipped) {
              bgClass = "bg-yellow-400/20 text-yellow-200";
              icon = "⏭️";
              borderClass = "border border-yellow-300/50";
            } else if (!isPastOrToday) {
              bgClass = "text-white/30";
              hover = "";
            }

            return (
              <motion.div
                key={dateStr}
                onClick={() => isPastOrToday && onClick?.(entry || { date: dateStr })}
                className={`aspect-square flex flex-col justify-center items-center rounded-xl cursor-pointer ${bgClass} ${borderClass} transition-all ${hover}`}
                title={dateStr}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
              >
                <span className="text-[11px]">{format(date, "d")}</span>
                {icon && (
                  <span className="text-md">{icon}</span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
