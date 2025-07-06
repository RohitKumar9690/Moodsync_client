import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import React from 'react';

export default function EditEntryModal({ isOpen, onClose, entry, onSubmit }) {
  if (!entry) return null;

  const handleUpdate = (status) => {
    onSubmit({
      ...entry,
      completed: status === 'complete',
      skipped: status === 'skip',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <DialogPanel className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Edit Entry - {entry.date}</h3>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleUpdate('complete')}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white"
            >
              ✅ Mark Completed
            </button>
            <button
              onClick={() => handleUpdate('skip')}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md text-white"
            >
              ⏭️ Mark Skipped
            </button>
            <button
              onClick={() => handleUpdate('reset')}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-white"
            >
              🔁 Reset
            </button>
            <button
              onClick={onClose}
              className="mt-4 text-sm text-white/70 hover:underline"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
