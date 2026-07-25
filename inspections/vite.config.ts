import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'http'

// Dev-only: routes /api/* requests to the local Vercel-style handler modules
// (Vercel itself serves them in preview/production; this just mirrors that
// locally so `npm run dev` works without the Vercel CLI).
function vercelApiDevMiddleware(): Plugin {
  return {
    name: 'vercel-api-dev-middleware',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api', async (req: IncomingMessage, res: ServerResponse, next) => {
        try {
          const url = new URL(req.url || '/', 'http://localhost')
          let pathname = url.pathname === '/' ? '/index' : url.pathname
          const modulePath = `/api${pathname}.ts`

          let mod
          try {
            mod = await server.ssrLoadModule(modulePath)
          } catch {
            // Fall back to dynamic segment file, e.g. /api/inspections/abc -> /api/inspections/[id].ts
            const segments = pathname.split('/').filter(Boolean)
            if (segments.length === 0) return next()
            const last = segments[segments.length - 1]
            const dynamicPath = `/api/${segments.slice(0, -1).join('/')}/[id].ts`.replace('//', '/')
            try {
              mod = await server.ssrLoadModule(dynamicPath)
              ;(req as any)._dynamicParam = last
            } catch {
              return next()
            }
          }

          const handler = mod.default
          if (typeof handler !== 'function') return next()

          const query: Record<string, string> = {}
          url.searchParams.forEach((value, key) => {
            query[key] = value
          })
          if ((req as any)._dynamicParam) {
            query.id = (req as any)._dynamicParam
          }
          ;(req as any).query = query

          if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            const chunks: Buffer[] = []
            for await (const chunk of req) chunks.push(chunk as Buffer)
            const raw = Buffer.concat(chunks).toString('utf-8')
            try {
              ;(req as any).body = raw ? JSON.parse(raw) : {}
            } catch {
              ;(req as any).body = {}
            }
          }

          ;(res as any).status = (code: number) => {
            res.statusCode = code
            return res
          }
          ;(res as any).json = (body: unknown) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(body))
          }

          await handler(req, res)
        } catch (err) {
          console.error('[api dev middleware]', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Internal error' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), vercelApiDevMiddleware()],
  server: {
    port: 5174,
  },
})
