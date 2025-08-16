import pool from '~~/server/utils/db/db'

export default defineEventHandler(async () => {
    try{

        const res = await pool.query('SELECT NOW()')
        return{
            success: true,
            time: res.rows[0].now,
        }

    }catch(err: any){
        console.error("Query failed", err)
        return{
            success: false,
            error: err.message
        }
    }
})