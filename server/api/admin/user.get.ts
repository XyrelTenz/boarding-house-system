import pool from '~~/server/utils/db/db'

export default defineEventHandler(async () => {
    try{
        const res = await pool.query('SELECT * FROM users', [])
        return{
            success: true,
            users: res.rows
        }
    }catch(err: any){
        console.error('Error getting users', err)
        return {
            success: false,
            error: err.message
        }
    }
})
