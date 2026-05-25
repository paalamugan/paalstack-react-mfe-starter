/**
 * Logger utility.
 *
 * Wraps `console` with a debug-mode guard so verbose logs are silenced in
 * production. Import and use `logger` instead of `console` throughout the app.
 *
 * Usage:
 *   import { logger } from '@/utils/logger';
 *   logger.info('User signed in', { userId });
 *   logger.error('API failed', error);
 */

import { env } from '@/env';

const isDebug = env.VITE_DEBUG_MODE;

export const logger = {
  info: (...args: unknown[]): void => {
    if (isDebug) {
      console.warn('[INFO]', ...args);
    }
  },
  debug: (...args: unknown[]): void => {
    if (isDebug) {
      console.warn('[DEBUG]', ...args);
    }
  },
  warn: (...args: unknown[]): void => {
    console.warn('[WARN]', ...args);
  },
  error: (...args: unknown[]): void => {
    console.error('[ERROR]', ...args);
  },
};
