import pool from '~~/server/utils/db/db'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (res.rows.length === 0) {
        return { success: false, error: 'User not found' }
    }

    const user = res.rows[0]
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return { success: false, error: 'Invalid password' }
    }

    // Cookies
    setCookie(event, 'user', JSON.stringify({
        id: user.user_id,
        email: user.email,
        username: user.username,
        role: user.role,
    }), { httpOnly: true, sameSite: 'lax', path: '/' })

    return {
        success: true,
        user: {
            id: user.user_id,
            email: user.email,
            username: user.username,
            role: user.role
        }
    }
})
