/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_SHARED_REMOTE_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DEBUG_MODE: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
