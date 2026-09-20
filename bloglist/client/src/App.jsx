import { useState, useEffect } from 'react'
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


const App = () => {

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const { blogs, isPending, isError, addBlog, likeBlog, removeBlog } = useBlogs()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (isPending) {
    return <div>loading data...</div>
  }
  if (isError) {
    return <div>anecdote service not available</div>
  }


  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
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
    window.localStorage.removeItem('loggedBlogappUser')
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
          <Route path='/blogs/:id' element={<Blog likeBlog={likeBlog}
            removeBlog={removeBlog} user={user} blogs={blogs}/>}/>
          <Route path="/" element={<BlogList blogs={blogs}
            user={user}
          />} />
          <Route path="/login" element={!user ?<LoginForm onLogin={handleLogin} />: <Navigate replace to= "/"/>} /> //Navigate is just redirection cant handle as a button!!!
          <Route path="/new" element={<BlogForm createBlog={addBlog}/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>

  )
}

export default App