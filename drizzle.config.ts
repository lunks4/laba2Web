import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dbCredentials: {
    url: 'db.sqlite3'
  },
  dialect: 'sqlite',
  out: './src/server/db/migrations',
  schema: './src/server/db/schema.ts',
  casing: 'snake_case',
})
