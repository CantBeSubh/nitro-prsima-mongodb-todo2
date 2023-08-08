import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const seesId = getCookie(event, '__clerk_session')
  const userId = getCookie(event, '__clerk_user')

  if (!seesId || !userId) {
    return sendRedirect(event, '/auth/login')
  }
  try {
    const todos = await prisma.todo.findMany({
      where: {
        authorId: userId
      }
    })
    return `

    <a href="https://factual-marlin-71.accounts.dev/user">Profile</a>
    <br/>
    Get All Todos for ${userId}
    <form action="/todo" method="post">
      <label for="title">Title</label>
      <input type="text" name="title" id="title" />
      <label for="description">Description</label>
      <input type="text" name="description" id="description" />
      <button type="submit">Create Todo</button>
    </form>
    My Todos
    <ul>
    ${todos.map((todo) => {
      return `
        <li>
          <a href="/todo/${todo.id}">${todo.title}-${todo.description}</a>
          <input type="checkbox" name="completed" ${todo.done ? 'checked' : ''} disabled/>
        </li>
  
        `
    }).join('')
      }
      </ul>
      `



  } catch (err) {
    console.log(err)
  } finally {
    await prisma.$disconnect()
  }
})
