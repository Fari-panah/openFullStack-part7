const baseUrl = '/api/blogs'
const usersUrl = '/api/users'

export const getBlogs = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch blogs')
  }
  return await response.json()
}

export const createBlog = async (newBlog) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBlog)
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create blog')
  }

  return await response.json()
}

export const updateBlog = async (updatedBlog) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBlog)
  }

  const response = await fetch(`${baseUrl}/${updatedBlog.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update blog')
  }

  return await response.json()
}

export const deleteBlog = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Failed to delete blog')
  }

  return await response.json()
}

export const addComment = async (id, comment) => {
  const response = await fetch(`${baseUrl}/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  })

  if (!response.ok) {
    throw new Error('Failed to add comment')
  }

  return await response.json()
}

export const getUsers = async () => {
  const response = await fetch(usersUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return await response.json()
}