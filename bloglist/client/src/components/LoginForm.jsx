import useField from '../hooks/useField'
import { TextField, Button, Box, Typography } from '@mui/material'
const LoginForm = ({ onLogin }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    onLogin(username.value, password.value)
    username.setValue('')
    password.setValue('')

  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          <label >
            username
            <input
              type={username.type}
              value={username.value}
              onChange={username.onChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type={password.type}
              value={password.value}
              onChange={password.onChange}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
