import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [tsconfigPaths()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_NOTION_API_END_POINT,
          changeOrigin: false,
          rewrite: (path) => path.replace(/^\/notion/, ''),
          secure: false,
        },
        '/emoji': {
          target: process.env.VITE_EMOJI_API_ENO_POINT,
          changeOrigin: false,
          rewrite: (path) => path.replace(/^\/emoji/, ''),
          secure: false,
        },
      },
    },
  });
};
