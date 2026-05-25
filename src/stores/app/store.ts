/**
 * App-level Zustand store.
 *
 * Provides global UI state (loading, notifications).
 * Extend AppState / AppActions in ./type.ts to add your own state.
 *
 * Usage:
 *   import { useAppStore } from '@/hooks/useAppStore';
 *   const { isLoading, setLoading } = useAppStore();
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { type AppStore } from './type';

const initialState = {
  isLoading: false,
  notification: null,
};

export const useAppStore = create<AppStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),

      showNotification: (message) => set({ notification: message }, false, 'showNotification'),

      clearNotification: () => set({ notification: null }, false, 'clearNotification'),

      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'AppStore' }
  )
);
