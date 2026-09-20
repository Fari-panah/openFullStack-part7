import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

const Blog = ({ blogs, removeBlog, likeBlog }) => {
  const { user } = useContext(UserContext)
  //useParams(): helps us find out which note the user requested through the URL
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id )
  if (!blog) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    likeBlog(blog)
  }

  /*const addLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1
    })
  }*/

  return (
    <div style={blogStyle}>
      <h2>{blog.author}:{blog.title}</h2>
      <br />
      <div>{blog.url}</div>
      <div>likes {blog.likes}
        {user && (
          <>
            <button onClick={addLike}>like</button>
            <div>Added by {blog.user?.name}</div>
          </>
        )}
      </div>
      {blog.user && blog.user.username === user.username &&(
        <button onClick={() => removeBlog(blog)}>
        remove
        </button>
      )}
    </div>
  )
}
export default Blog