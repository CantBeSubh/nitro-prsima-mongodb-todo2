import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default defineEventHandler(async event => {
    const { id } = event.context.params
    const userId = getCookie(event, '__clerk_user')
    if (!userId) {
        return sendRedirect(event, '/auth/login')
    }
    const todo = await prisma.todo.delete({
        where: {
            id: id
        }
    })
    return `
    Deleted TODO: ${todo.title}
    <a href="/todo">Back to Todos</a>
    `
})
