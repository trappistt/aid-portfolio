import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

function chromeDevtoolsJson() {
  return {
    name: 'chrome-devtools-json',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url !== '/.well-known/appspecific/com.chrome.devtools.json') {
          return next()
        }
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            workspace: {
              root: projectRoot,
              uuid: '7c2e1a4b-9d18-4f3e-8a6c-2b0f5d91e4a7',
            },
          })
        )
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), chromeDevtoolsJson()],
  server: {
    port: 3000,
    open: true,
  },
})



