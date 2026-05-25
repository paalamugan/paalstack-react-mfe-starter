import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the env module so we can control VITE_DEBUG_MODE in tests
vi.mock('@/env', () => ({
  env: {
    VITE_API_BASE_URL: 'https://api.example.com',
    VITE_DEBUG_MODE: true,
  },
}));

import { logger } from './logger';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('warn', () => {
    it('always calls console.warn', () => {
      logger.warn('something went wrong');
      expect(console.warn).toHaveBeenCalledWith('[WARN]', 'something went wrong');
    });

    it('passes multiple arguments', () => {
      logger.warn('msg', { detail: 1 });
      expect(console.warn).toHaveBeenCalledWith('[WARN]', 'msg', { detail: 1 });
    });
  });

  describe('error', () => {
    it('always calls console.error', () => {
      const err = new Error('boom');
      logger.error('failure', err);
      expect(console.error).toHaveBeenCalledWith('[ERROR]', 'failure', err);
    });
  });

  describe('info (debug mode enabled)', () => {
    it('calls console.warn with [INFO] prefix when debug mode is on', () => {
      logger.info('app started');
      expect(console.warn).toHaveBeenCalledWith('[INFO]', 'app started');
    });
  });

  describe('debug (debug mode enabled)', () => {
    it('calls console.warn with [DEBUG] prefix when debug mode is on', () => {
      logger.debug('state', { count: 5 });
      expect(console.warn).toHaveBeenCalledWith('[DEBUG]', 'state', { count: 5 });
    });
  });
});
