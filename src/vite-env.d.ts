// This file is used to provide type definitions for Vite's client-side environment.
// The original line '/// <reference types="vite/client" />' was causing a resolution error.
// It has been replaced with a declaration for `process.env` to match the usage in the application code.
// This provides TypeScript with the necessary type information for `process.env.API_KEY` and resolves the build error.

declare var process: {
  env: {
    API_KEY: string;
  }
};
