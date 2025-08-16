import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new pg.Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE
})

console.log('Attempting to connect with:', {
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD ? '***' : undefined
})

pool.connect()
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Database not Connected', err))

export default pool