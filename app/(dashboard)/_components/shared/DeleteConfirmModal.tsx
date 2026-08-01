"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your rental order.",
}: DeleteConfirmModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <AlertDialogHeader className="space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/50">
            <AlertTriangle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <AlertDialogTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 gap-6 sm:gap-0">
          <AlertDialogCancel
            disabled={isLoading}
            onClick={onClose}
            className="rounded-xl border border-zinc-200 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 mr-3 cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault(); 
              onConfirm();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 text-xs font-medium text-white transition-colors hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Order</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};