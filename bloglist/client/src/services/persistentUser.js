
const getUser = () => {
  const userJSON = window.localStorage.getItem('loggedBlogappUser')

  if (userJSON) {
    return JSON.parse(userJSON)
  }

  return null
}

const saveUser = (user) => {
  window.localStorage.setItem(
    'loggedBlogappUser',
    JSON.stringify(user)
  )
}

const removeUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
}

export default {
  getUser,
  saveUser,
  removeUser
}

