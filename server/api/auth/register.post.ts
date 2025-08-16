import pool from '~~/server/utils/db/db'
import bcrypt from 'bcrypt'
import { setCookie, readBody } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { username, email, password, role } = body

        if (!username || !email || !password || !role) {
            throw new Error("All fields are required")
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Insert into users
        const userRes = await pool.query(
            `INSERT INTO users (username, password, email, role)
             VALUES ($1, $2, $3, $4)
                 RETURNING user_id, username, email, role, created_at`,
            [username, hashedPassword, email, role]
        )

        const user = userRes.rows[0]

        // Insert into role-specific table
        if (role === 'admin') {
            await pool.query(
                `INSERT INTO admins (user_id) VALUES ($1)`,
                [user.user_id]
            )
        } else if (role === 'boarder') {
            await pool.query(
                `INSERT INTO boarders (user_id, room_number, date_in)
                 VALUES ($1, $2, NOW())`,
                [user.user_id, 'Unassigned']
            )
        }

        setCookie(event, 'session', JSON.stringify({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role
        }), {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        })

        return {
            success: true,
            user
        }
    } catch (err: any) {
        console.error('Registration error:', err)
        return { success: false, error: err.message }
    }
})
