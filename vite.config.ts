import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { peerDependencies } from './package.json';

import { copyFileSync } from 'fs';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      name: 'atomic-react',
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) =>
        `${entryName}${format === 'es' ? '.js' : '.cjs'}`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies || {}),
        // Subfolder imports
        'react/jsx-runtime',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  plugins: [
    dts({ rollupTypes: true }),
    {
      name: 'copy-files',
      closeBundle(): void {
        // Copy README.md to dist folder
        copyFileSync('README.md', 'dist/README.md');
        console.log('README.md copied to dist folder');
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
