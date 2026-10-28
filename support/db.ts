import { Pool } from 'pg'
import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely'
import { Mission, Reservation, Ticket } from './types'

interface Database {
  missions: Mission
  reservations: Reservation
  tickets: Ticket
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString:
      'postgresql://postgres.jmpjjodupquwntivesle:fiZ3Zmd25zlEBuPx@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  }),
})

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
})

// ---- missions ----

export async function insertMission(mission: Mission) {
  await db.insertInto('missions').values(mission).execute()
}

export async function deleteMission(id: string) {
  await db.deleteFrom('missions').where('id', '=', id).execute()
}

export async function cleanMission(missionId: string) {
  await deleteTicket(missionId)
  await deleteReservation(missionId)
  await deleteMission(missionId)
}

export async function cleanAndInsertMission(mission: Mission) {
  await cleanMission(mission.id)
  await insertMission(mission)
}

// ---- reservations ----

export async function deleteReservation(missionId: string) {
  await db.deleteFrom('reservations').where('missionId', '=', missionId).execute()
}

// ---- tickets ----

export async function deleteTicket(missionId: string) {
  await db.deleteFrom('tickets').where('missionId', '=', missionId).execute()
}
