import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@heymantle/react',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      external: ['react', 'react-dom', '@heymantle/client'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@heymantle/client': 'MantleClient',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
}); 