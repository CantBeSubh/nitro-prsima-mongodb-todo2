import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
    const body = await readBody(event)
    const { title, description } = body
    const userId = getCookie(event, '__clerk_user')
    if (!userId) {
        return sendRedirect(event, '/auth/login')
    }
    try {
        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                authorId: userId
            }
        })
        return `
        Created a Todo: ${todo.title}
        <br />
        <a href="/todo">View Todos</a>
        `
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
})
