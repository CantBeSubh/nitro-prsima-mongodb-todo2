export default eventHandler(async (event) => {
    setCookie(event, '__clerk_session', '')
    setCookie(event, '__clerk_user', '')
    return sendRedirect(event, '/auth/login')
})

