import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import { MemoryRouter } from 'react-router-dom'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Sara',
  url: 'https://example.com',
  likes: 10,
  user: {
    username: 'tester1',
    name: 'fari'
  }
}

test('renders content', () => {

  render(<Blog blog={blog}/>)

  const title = screen.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(title).toBeDefined()

  const author = screen.getByText('Sara')
  expect(author).toBeDefined()

  const url = screen.queryByText('https://example.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('likes 10')
  expect(likes).toBeNull()

})

test('shows URL and likes when view button is clicked', async () => {

  const mockHandler = vi.fn()

  render(<Blog blog={blog} increseLike={mockHandler} user={{ username: 'fari' }}  removeBlog={mockHandler}/>)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const url = screen.getByText('https://example.com')
  expect(url).toBeDefined() //.toBeInTheDocument()

  const likes = screen.getByText('likes 10')
  expect(likes).toBeDefined()
})

test('like button is clicked twice', async () => {

  const mockHandler = vi.fn()

  render(<Blog blog={blog} increseLike={mockHandler} />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
test('blog form calls event handler with the right details when a new blog is created', async () => {
  const mockHandler= vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={mockHandler} />)
  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')

  const createButton = screen.getByText('create')
  /*const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'testing....')*/
  await user.type(titleInput, 'testing title')
  await user.type(authorInput, 'testing author')
  await user.type(urlInput, 'testing url')

  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  //First call → first argument → title( of object)
  expect(mockHandler.mock.calls[0][0].title).toBe('testing title')
  expect(mockHandler.mock.calls[0][0].author).toBe('testing author')
  expect(mockHandler.mock.calls[0][0].url).toBe('testing url')
})


test('Blog information and the number of likes display to unauthenticated users but no buttons,', () => {
  render(
    <MemoryRouter initialEntries={['/blogs/123']}>
      <Blog
        blogs={[{ ...blog, id: '123' }]}
        user={null}
        removeBlog={vi.fn()}
        updateBlog={vi.fn()}
      />
    </MemoryRouter>
  )

  expect(screen.getByText('Sara:Component testing is done with react-testing-library')).toBeDefined()
  expect(screen.getByText('https://example.com')).toBeDefined()
  expect(screen.getByText('likes 10')).toBeDefined()

  expect(screen.queryByText('like')).toBeNull()
  expect(screen.queryByText('remove')).toBeNull()
})

