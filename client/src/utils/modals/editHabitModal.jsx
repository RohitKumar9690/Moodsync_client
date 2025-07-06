import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState, useEffect } from 'react'

export default function HabitModal({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData = {
    title: '',
    type: 'good',
    start_date: '',
    end_date: '',
  },
}) {
  const [formData, setFormData] = useState(initialData)

  useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    onSubmit?.(formData)
    onClose()
  }
  const titleText = mode === 'edit' ? '✏️ Edit Habit' : '➕ Add Habit'

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <DialogPanel className="w-full max-w-lg rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10 text-white p-6 transition-all">
          <DialogTitle className="text-lg font-bold mb-4">{titleText}</DialogTitle>

          <div className="space-y-4">
            <div>
              <label className="text-sm">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
                placeholder="Enter habit title"
              />
            </div>

            <div>
              <label className="text-sm">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                <option value="good">Good</option>
                <option value="bad">Bad</option>
                <option value="quit">Quit</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
              />
            </div>

            <div>
              <label className="text-sm">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 text-sm text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
