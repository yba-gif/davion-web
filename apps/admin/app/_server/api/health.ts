import { app } from '../app'

export default app.defineCustomController({
    GET: async () => {
        return new Response(JSON.stringify({
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'admin-api',
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
    },
})
