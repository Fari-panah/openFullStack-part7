import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import  useField  from '../hooks/useField'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const navigate = useNavigate()

  const addBlog = event => {
    event.preventDefault()
    createBlog(
      {
        title: title.value,
        author: author.value,
        url: url.value
      }


    )
    title.setValue('')
    author.setValue('')
    url.setValue('')
    navigate('/')

  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>

          <TextField
            label="title"
            value={title.value}
            onChange={title.onChange}
            style={{ marginTop: 10, width: 500 }}
          />

        </div>
        <div>
          <TextField
            label="author"
            value={author.value}
            onChange={author.onChange}
            style={{ marginTop: 10, width: 500 }}
          />

        </div>
        <div>
          <TextField
            label="url"
            value={url.value}
            onChange={url.onChange}
            style={{ marginTop: 10, width: 500 }}
          />

        </div>
        <div>
          <Button type='submit' variant="contained" style={{ marginTop: 10 }}>create</Button>
        </div>
      </form>

    </div>
  )
}

export default BlogForm
