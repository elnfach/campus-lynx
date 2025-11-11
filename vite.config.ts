import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'
import * as fs from "node:fs";

const getModuleAliases = () => {
    const modulesPath = path.resolve(__dirname, './src/app/modules')
    if (!fs.existsSync(modulesPath)) { return {} }
    const modules = fs.readdirSync(modulesPath)

    const aliases: Record<string, string> = {}
    modules.forEach(module => {
        if (fs.statSync(path.join(modulesPath, module)).isDirectory()) {
            aliases[`#${module.toLowerCase()}`] = path.join(modulesPath, module)
        }
    })
    return aliases
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      ...getModuleAliases(),
    },
  },
})