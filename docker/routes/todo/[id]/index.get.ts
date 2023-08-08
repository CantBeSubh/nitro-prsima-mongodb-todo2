import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// routes/hello/[name].ts
export default defineEventHandler(async event => {
    const { id } = event.context.params
    const todo = await prisma.todo.findUnique({
        where: {
            id: id
        }
    })
    if (!todo) {
        return `No TODO found with ID: ${id}`
    }

    return `
    Get TODO by ID: ${id}
    <form method="post">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" value="${todo.title}" />
        <label for="description">Description</label>
        <input type="text" name="description" id="description" value="${todo.description}" />
        <label for="done">Done</label>
        <input type="checkbox" name="done" id="done" ${todo.done ? 'checked' : ''} />
        <button type="submit">Update Todo</button>
    </form>
    <form method="post" action="/todo/${id}/delete">
        <button type="submit">Delete Todo</button>
    </form>
    <a href="/todo">Back to Todos</a>
    `
})
