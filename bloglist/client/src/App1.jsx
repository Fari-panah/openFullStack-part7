import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

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
      user: blog.user.id || blog.user._id
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
    setUser(null)
  }

  const blogList = () => (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes) //because e want to sort by likes so doesnt use just .sort()
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            increseLike={updateBlog}
            removeBlog={removeBlog}
          />
        )}
    </div>
  )

  return (
    <div>
      <Notification message= {message}/>
      {!user && <Togglable buttonLabel= "log in"><LoginForm onLogin={handleLogin}/>
      </Togglable>}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel= "create new blog">
            <BlogForm  createBlog= {addBlog}/>
          </Togglable>

          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App