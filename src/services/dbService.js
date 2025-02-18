import { openDB } from 'idb'

const dbName = 'quizDB'
const dbVersion = 1

const initDB = async () => {
  try {
    const db = await openDB(dbName, dbVersion, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('attempts')) {
          db.createObjectStore('attempts', { keyPath: 'id', autoIncrement: true })
        }
      },
      blocked() {
        throw new Error('Database blocked: Please close other tabs with this app')
      },
      blocking() {
        throw new Error('Database blocking: Please reload the page')
      },
      terminated() {
        throw new Error('Database connection terminated')
      },
    })
    return db
  } catch (error) {
    throw new Error(`Failed to initialize database: ${error.message}`)
  }
}

export const saveAttempt = async (attempt) => {
  try {
    const db = await initDB()
    return await db.add('attempts', {
      ...attempt,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    throw new Error(`Failed to save attempt: ${error.message}`)
  }
}

export const getAttempts = async () => {
  try {
    const db = await initDB()
    return await db.getAll('attempts')
  } catch (error) {
    throw new Error(`Failed to fetch attempts: ${error.message}`)
  }
} 