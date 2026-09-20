import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

const UserList = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length)
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>

              <TableCell>{user.username}</TableCell>

              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default UserList