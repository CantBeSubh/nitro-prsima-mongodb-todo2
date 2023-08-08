export default eventHandler(async (event) => {
  const seesId = getCookie(event, '__clerk_session')
  const userId = getCookie(event, '__clerk_user')

  if (!seesId || !userId) {
    return `
    <h1>Welcome to best TODOs app ever</h1>
      Click here to <a href="/auth/signup">Signup</a>
    `
  }
  return { Hello: seesId }
})