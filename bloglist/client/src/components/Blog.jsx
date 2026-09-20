import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import UserContext from '../context/UserContext'

const Blog = ({ blogs, removeBlog, likeBlog, comment }) => {
  const [newComment, setNewComment] = useState('')
  const { user } = useContext(UserContext)
  //useParams(): helps us find out which note the user requested through the URL
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id )
  if (!blog) {
    return null
  }

  const addComment = event => {
    event.preventDefault()

    comment({
      id: blog.id,
      comment: newComment
    })

    setNewComment('')
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
      <h3>comments</h3>

      <form onSubmit={addComment}>
        <input
          value={newComment}
          onChange={event => setNewComment(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>

  )
}
export default Blog