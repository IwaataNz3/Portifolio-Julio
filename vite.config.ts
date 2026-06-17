import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Define a base do site dinamicamente para o GitHub Pages
// Se o repo for "usuario.github.io", base é "/". Se for "portfolio", base é "/portfolio/".
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const basePath = repoName && !repoName.includes('.github.io') ? `/${repoName}/` : '/';

export default defineConfig({
  plugins: [react()],
  base: basePath,
})
