import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzleNode } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

/**
 * Node/TCP factory. Use locally (Mac dev, Docker, Hetzner VPS, anywhere with
 * raw socket access). Connection-pooled. Postgres-js.
 */
export function createDatabase(connectionString: string) {
  const sql = postgres(connectionString, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
    onnotice: () => {},
  })
  return drizzleNode(sql, { schema })
}

/**
 * Cloudflare Workers / Pages factory. Uses Neon's HTTP transport — no TCP
 * sockets, no connection pooling required. Works against any Neon database
 * (the URL must point at a Neon project's HTTP endpoint, typically
 * `postgres://USER:PASS@HOST/DB?sslmode=require`).
 *
 * Each query is a single HTTPS request, so cold-start cost is one TLS round
 * trip per query. For batched reads, prefer Drizzle's relational queries.
 */
export function createEdgeDatabase(connectionString: string) {
  const sql = neon(connectionString)
  return drizzleNeon(sql, { schema })
}

export type Database = ReturnType<typeof createDatabase>
export type EdgeDatabase = ReturnType<typeof createEdgeDatabase>