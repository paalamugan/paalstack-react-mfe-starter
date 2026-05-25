/**
 * App-level Zustand store types.
 * Extend with your own global state shape.
 */

export type AppState = {
  /** Whether a global loading overlay is visible */
  isLoading: boolean;
  /** Global notification message (null when no message) */
  notification: string | null;
};

export type AppActions = {
  setLoading: (isLoading: boolean) => void;
  showNotification: (message: string) => void;
  clearNotification: () => void;
  reset: () => void;
};

export type AppStore = AppState & AppActions;
