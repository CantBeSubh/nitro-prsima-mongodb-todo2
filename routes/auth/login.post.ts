import clerk from '@clerk/clerk-sdk-node'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default eventHandler(async event => {
    const body = await readBody(event)
    const { email, password } = body

    const users = await clerk.users.getUserList({
        emailAddress: email
    })
    const userId = users[0].id
    if (!userId) {
        return `
            Error: User not found<br/>
            <a href="/auth/login">Back to login</a>
        `
    }
    const pwdverification = await clerk.users.verifyPassword({
        userId,
        password
    })
    if (!pwdverification) {
        return `
            Error: Password incorrect<br/>
            <a href="/auth/login">Back to login</a>
        `
    }

    const sessionId = await clerk.sessions.getSessionList({
        userId,
        status: 'active'
    })

    const sessId = sessionId[0].id
    if (!sessId) {
        return `
            Error: Session not found<br/>
            <a href="/auth/login">Back to login</a>
        `
    }


    setCookie(event, '__clerk_session', sessId)
    setCookie(event, '__clerk_user', userId)

    return sendRedirect(event, '/todo')
})
