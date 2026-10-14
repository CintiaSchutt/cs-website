import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from the root of cintiaschutt.com (see public/CNAME),
// so no `base` is needed. `public/` is copied into `dist/` untouched.
export default defineConfig({
  plugins: [react()],
});
