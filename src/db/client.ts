import { SQL } from 'bun'
import { env } from '../config/env'

export const sql = new SQL(env.DATABASE_URL)

export const initDatabase = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS scam_analyses (
      id SERIAL PRIMARY KEY,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      asks_for_money DOUBLE PRECISION NOT NULL,
      asks_for_click DOUBLE PRECISION NOT NULL,
      pressure DOUBLE PRECISION NOT NULL,
      risk TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `

  console.log('Base de datos lista')
}