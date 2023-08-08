import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default eventHandler(async event => {
    const { id } = event.context.params
    const body = await readBody(event)
    let { title, description, done } = body

    const userId = getCookie(event, '__clerk_user')
    if (!userId) {
        return sendRedirect(event, '/auth/login')
    }
    done = done === 'on' ? true : false
    const updatedTodo = await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            title,
            description,
            done
        }
    })

    return `
    Updated a Todo: ${updatedTodo.title}
    <a href="/todo">Back to Todos</a>
    `
})
