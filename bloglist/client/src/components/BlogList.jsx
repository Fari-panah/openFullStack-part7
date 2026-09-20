import React from 'react'
import { Link } from 'react-router-dom'
const BlogList = ({ blogs }) => {
  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes) //because e want to sort by likes so doesnt use just .sort()
        .map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </div>
        )}
    </div>
  )
}

export default BlogList
