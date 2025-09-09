import { useState, useEffect } from 'react'

export default function AuthForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) setToken(savedToken)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const url = isLogin
        ? 'http://localhost:3000/api/auth/signIn'
        : 'http://localhost:3000/api/auth/signUp'

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Auth faile')
      }

      const data = await res.json()
      localStorage.setItem('token', data.token)

      setUsername('')
      setPassword('')
    } catch (err) {
      if (err instanceof Error) console.error(err.message)
      else console.error('Unknown')
    }
  }

  if (token) return null

  return (
    <div style={{ maxWidth: 300, margin: 'auto', padding: 20 }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </button>
    </div>
  )
}
