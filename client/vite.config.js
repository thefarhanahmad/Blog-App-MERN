// client/vite.config.js
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  build: {
    rollupOptions: {
      external: /^date-fns($|\/)/,
    },
  },
  base: '/',
};
