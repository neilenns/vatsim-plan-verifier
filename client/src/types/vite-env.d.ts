/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_SERVER_URL: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
