import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime. In Vite, this must be 'VITE_'.
   */
  clientPrefix: 'VITE_',
  /**
   * Client-side environment variables. These are exposed to the browser
   * and must be prefixed with 'VITE_'.
   */
  client: {
    VITE_API_BASE_URL: z.url(),
    VITE_DEBUG_MODE: z
      .string()
      .transform((val) => val === 'true')
      .default(false),
  },
  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: import.meta.env,
  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   */
  emptyStringAsUndefined: true,
});
