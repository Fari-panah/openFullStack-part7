const dummy = () => {
  return 1

}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)

}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if(blog.likes > favorite.likes){
      return blog
    }
    return favorite
  })
}


module.exports = { dummy, totalLikes, favoriteBlog }