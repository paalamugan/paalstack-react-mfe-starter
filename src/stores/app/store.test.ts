import { beforeEach, describe, expect, it } from 'vitest';

import { useAppStore } from './store';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const initialState = useAppStore.getState();
const resetStore = () => useAppStore.setState(initialState, true);

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('useAppStore', () => {
  beforeEach(() => {
    resetStore();
  });

  // ── Initial state ─────────────────────────────────────────────────────────

  describe('initial state', () => {
    it('isLoading is false', () => {
      expect(useAppStore.getState().isLoading).toBe(false);
    });

    it('notification is null', () => {
      expect(useAppStore.getState().notification).toBeNull();
    });
  });

  // ── setLoading ────────────────────────────────────────────────────────────

  describe('setLoading', () => {
    it('sets isLoading to true', () => {
      useAppStore.getState().setLoading(true);
      expect(useAppStore.getState().isLoading).toBe(true);
    });

    it('sets isLoading back to false', () => {
      useAppStore.getState().setLoading(true);
      useAppStore.getState().setLoading(false);
      expect(useAppStore.getState().isLoading).toBe(false);
    });
  });

  // ── showNotification ──────────────────────────────────────────────────────

  describe('showNotification', () => {
    it('sets the notification message', () => {
      useAppStore.getState().showNotification('Operation successful');
      expect(useAppStore.getState().notification).toBe('Operation successful');
    });

    it('overwrites an existing notification', () => {
      useAppStore.getState().showNotification('First message');
      useAppStore.getState().showNotification('Second message');
      expect(useAppStore.getState().notification).toBe('Second message');
    });
  });

  // ── clearNotification ─────────────────────────────────────────────────────

  describe('clearNotification', () => {
    it('sets notification back to null', () => {
      useAppStore.getState().showNotification('Hello');
      useAppStore.getState().clearNotification();
      expect(useAppStore.getState().notification).toBeNull();
    });

    it('is safe to call when notification is already null', () => {
      expect(() => useAppStore.getState().clearNotification()).not.toThrow();
      expect(useAppStore.getState().notification).toBeNull();
    });
  });

  // ── reset ─────────────────────────────────────────────────────────────────

  describe('reset', () => {
    it('resets all state to initial values', () => {
      useAppStore.getState().setLoading(true);
      useAppStore.getState().showNotification('Some message');

      useAppStore.getState().reset();

      expect(useAppStore.getState().isLoading).toBe(false);
      expect(useAppStore.getState().notification).toBeNull();
    });
  });
});
