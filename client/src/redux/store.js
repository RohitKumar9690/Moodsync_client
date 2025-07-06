import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slicer/userslicer'
import moodReducer from './slicer/moodslicer'
import journalReducer from "./slicer/journalslicer"
import goalsReducer from "./slicer/goalsslicer"
import habitsReducer from "./slicer/habitsslicer"

export const store = configureStore({
  reducer: {user:userReducer,
    mood:moodReducer,
    journals:journalReducer,
    goals:goalsReducer,
    habits:habitsReducer
  },
})