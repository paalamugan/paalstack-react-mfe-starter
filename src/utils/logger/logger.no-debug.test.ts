/**
 * Tests for logger when VITE_DEBUG_MODE is OFF.
 * Kept in a separate file because vi.mock is hoisted and module-scoped,
 * so the debug flag is captured once at import time per file.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/env', () => ({
  env: {
    VITE_API_BASE_URL: 'https://api.example.com',
    VITE_DEBUG_MODE: false,
  },
}));

import { logger } from './logger';

describe('logger (debug mode OFF)', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('info does NOT call console.warn when debug mode is off', () => {
    logger.info('silent info');
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('debug does NOT call console.warn when debug mode is off', () => {
    logger.debug('silent debug', { count: 1 });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('warn still calls console.warn regardless of debug mode', () => {
    logger.warn('always visible');
    expect(console.warn).toHaveBeenCalledWith('[WARN]', 'always visible');
  });

  it('error still calls console.error regardless of debug mode', () => {
    logger.error('always logged');
    expect(console.error).toHaveBeenCalledWith('[ERROR]', 'always logged');
  });
});
