export default eventHandler(() => {
    return `
    <h2>Login</h2>
    <form action="/auth/login" method="POST">
        <input type="email" name="email" placeholder="E-Mail" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>
    `
})
