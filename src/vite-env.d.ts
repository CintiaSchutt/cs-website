/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Set to "true" to show dev-only placeholder entries in a production build. */
  readonly VITE_SHOW_PLACEHOLDERS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
