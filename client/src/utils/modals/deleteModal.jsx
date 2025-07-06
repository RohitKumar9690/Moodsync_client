'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function DeleteModal({ isOpen, onClose, onConfirm, title = "Delete Item", description }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <DialogPanel className="w-full max-w-md rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10 text-white p-6 transition-all">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
              <p className="mt-1 text-sm text-white/70">
                {description ||
                  "Are you sure you want to delete this item? This action cannot be undone."}
              </p>
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
              onClick={() => {
                onConfirm?.()
                onClose()
              }}
              className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-sm font-semibold text-white"
            >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
