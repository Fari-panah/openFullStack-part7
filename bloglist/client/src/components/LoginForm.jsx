import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    onLogin(username, password)
    setUsername('')
    setPassword('')

  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          <label >
            username
            <input type="text"  value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
