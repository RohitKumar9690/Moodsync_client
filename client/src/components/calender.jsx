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
  isAfter
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

export default function GlassyCalendar({ start, end, onClick, entriesMap = {} }) {
  const parsedStart = parseISO(start);
  const parsedEnd = parseISO(end);

  const [currentMonth, setCurrentMonth] = useState(startOfMonth(parsedEnd));
  const [direction, setDirection] = useState(0); // -1 for back, 1 for forward

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
    <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg text-white max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrev}
          disabled={!hasPrevMonth}
          className={`text-lg px-2 py-1 rounded ${hasPrevMonth ? "hover:bg-white/20" : "opacity-30 cursor-not-allowed"}`}
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
          className={`text-lg px-2 py-1 rounded ${hasNextMonth ? "hover:bg-white/20" : "opacity-30 cursor-not-allowed"}`}
        >
          ➡️
        </button>
      </div>

      {/* Week Labels */}
      <div className="grid grid-cols-7 mb-2 text-sm font-medium text-center text-white/60">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid with Animation */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
        
      key={format(currentMonth, "yyyy-MM")}
      initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
      transition={{ duration: 0.4,ease: "easeInOut"  }}
      className="grid grid-cols-7 gap-2 text-sm font-semibold"
    >
          {/* Blank cells */}
          {Array(getDay(startOfMonth(currentMonth)))
            .fill(null)
            .map((_, i) => <div key={`blank-${i}`} />)}

          {days.map((date, i) => {
            const dateStr = format(date, "yyyy-MM-dd");
            const entry = entriesMap[dateStr];
            const isPastOrToday = isBefore(date, new Date()) || isToday(date);

            let bgClass = "bg-white/5 text-white";
            let borderClass = "";
            let icon = "";
            let hover = "hover:bg-white/20";

            if (entry?.completed) {
              bgClass = "bg-green-500/20 text-green-300";
              icon = "Done";
              borderClass = "border border-green-400/50";
            } else if (entry?.skipped) {
              bgClass = "bg-yellow-400/20 text-yellow-300";
              icon = "Skip";
              borderClass = "border border-yellow-300/50";
            } else if (!isPastOrToday) {
              bgClass = "text-white/30";
              icon = "";
              hover = "";
            }

            return (
              <motion.div
                key={dateStr}
                onClick={() => isPastOrToday && onClick?.(entry || { date: dateStr })}
                className={`aspect-square flex flex-col justify-center items-center rounded-xl cursor-pointer ${bgClass} ${borderClass} transition-all ${hover}`}
                title={dateStr}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
              >
                <span className="text-[11px]">{format(date, "d")}</span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${bgClass}`}>{icon}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
