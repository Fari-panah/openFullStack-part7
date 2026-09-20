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


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = blogObject =>
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })


  const updateBlog = (blog) => {
    const updatedBlog = {
      ...blog,
      user: blog.user
    }

    blogService
      .update(blog.id, updatedBlog)
      .then(updatedBlog => {
        setBlogs(
          blogs.map(b =>
            b.id === updatedBlog.id ? updatedBlog : b
          )
        )
      })
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
    }
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
          <Route path='/blogs/:id' element={<Blog  updateBlog={updateBlog}
            removeBlog={removeBlog} user={user} blogs={blogs}/>}/>
          <Route path="/" element={<BlogList blogs={blogs}
            user={user}
          />} />
          <Route path="/login" element={!user ?<LoginForm onLogin={handleLogin} />: <Navigate replace to= "/"/>} /> //Navigate is just redirection cant handle as a button!!!
          <Route path="/new" element={<BlogForm createBlog={addBlog}/>}/>
        </Routes>
      </ErrorBoundary>
    </div>

  )
}

export default App