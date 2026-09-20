const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('blogs returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    //regex instead of an exact string
    .expect('Content-Type', /application\/json/)
})

test('the unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  const blog = response.body[0]

  assert(blog.id !== undefined) //the id property or field there is
  assert.strictEqual(blog._id, undefined) //(actual, expected)
})
test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Node.js Testing',
    author: 'Farnaz',
    url: 'https://example.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length + 1
  )

  const titles = blogsAtEnd.map(blog => blog.title)

  assert(titles.includes('Node.js Testing'))
})
test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Default likes',
    author: 'Farnaz',
    url: 'https://example.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const savedBlog = blogsAtEnd[blogsAtEnd.length - 1]

  assert.strictEqual(savedBlog.likes, 0)
})
test('if the properties are missing from the request', async () => {
  const newBlog ={
    author: 'Farnaz'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  //nothing add to database, because of bad request
  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length
  )

})
test('a blog can be deleted', async () => {
  const blogAtStart = await helper.blogsInDb()
  const blogToDelete = blogAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  const ids = blogsAtEnd.map(b => b.id)
  assert(!ids.includes(blogToDelete.id))
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length -1)

})
test('update of an individual blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = {
    ...blogToUpdate,
    likes: 100
  }
  await api
    .put(`api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const result = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  assert.strictEqual(result.likes, 100)

})
test('a blog cannot be added without a token', async () => {

  const newBlog = {
    title: 'New blog',
    author: 'Fari',
    url: 'https://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length
  )
})

after(async () => {
  await mongoose.connection.close()
})