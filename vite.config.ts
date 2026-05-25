import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const tourApiKey = env.VITE_TOUR_API_KEY ?? env.TOUR_API_KEY ?? ''

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/tourapi': {
          target: 'https://apis.data.go.kr/B551011/KorService2',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/tourapi/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (!tourApiKey) {
                return
              }

              const [pathname, query = ''] = proxyReq.path.split('?')
              const params = new URLSearchParams(query)
              params.delete('serviceKey')
              params.set('serviceKey', tourApiKey)
              proxyReq.path = `${pathname}?${params.toString()}`
            })
          },
        },
      },
    },
  }
})
