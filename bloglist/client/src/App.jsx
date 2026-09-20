import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import { useBlogs } from './hooks/useBlogs'
import UserContext from './context/UserContext'
import persistentUser from './services/persistentUser'
import { useUsers } from './hooks/useUsers'
import UserList from './components/UserList'
import User from './components/User'


const App = () => {
  const { user, setUser } = useContext(UserContext)
  const [message, setMessage] = useState(null)
  const { blogs, isPending, isError, addBlog, likeBlog, removeBlog, comment } = useBlogs()
  const { users } = useUsers()


  useEffect(() => {
    const user = persistentUser.getUser()

    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  if (isPending) {
    return <div>loading data...</div>
  }
  if (isError) {
    return <div>anecdote service not available</div>
  }


  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({ username, password })
      persistentUser.saveUser(user)
      blogService.setToken(user.token)
      setUser(user)

    } catch {
      setMessage('wrong username or password')

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    persistentUser.saveUser(user)
    blogService.setToken(null)
    setUser(null)
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Notification message={message} />
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/new">new blog</Link>
        {!user && (
          <Link style={padding} to="/login">login</Link>
        )}
        {user && (
          <button onClick={handleLogout}>logout</button>
        )}
      </div>
      <ErrorBoundary>

        <Routes>
          <Route path="/users" element={<UserList users={users} />} />
          <Route path='/blogs/:id' element={<Blog likeBlog={likeBlog}
            removeBlog={removeBlog} blogs={blogs} comment={comment}/>}/>
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route path="/login" element={!user ?<LoginForm onLogin={handleLogin} />: <Navigate replace to= "/"/>} /> //Navigate is just redirection cant handle as a button!!!
          <Route path="/new" element={<BlogForm createBlog={addBlog}/>}/>
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>

  )
}

export default App