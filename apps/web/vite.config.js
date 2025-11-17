import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  // Verifica se estamos rodando no ambiente de CI/CD do GitHub
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

  return {
    plugins: [react()],
    // Se for GitHub Actions, usa o repo. Se for Docker/Local, usa a raiz '/'
    base: isGitHubActions ? '/boocamp2-entrega-final/' : '/',
    server: {
      port: 8080,
      host: true
    }
  };
});