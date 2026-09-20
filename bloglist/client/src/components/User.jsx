import { Card, CardContent, Typography, Button, Box, Link } from '@mui/material'
import { useParams } from 'react-router-dom'
const User = ({ users }) => {
  const { id } = useParams()
  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div data-testid="blog">
      <Card sx={{ maxWidth: 600, mt: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            added blogs
          </Typography>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default User