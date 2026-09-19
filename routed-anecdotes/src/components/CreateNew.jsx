import { useField } from "../hooks/index"
import { useNavigate } from "react-router-dom"

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({ 
      content: content.input.value,
      author: author.input.value,
      info: info.input.value, 
      votes: 0 })
    navigate("/")
  }
  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            {...content.input}
          />
        </div>
        <div>
          author
          <input
            name="author"
            {...author.input}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            {...info.input}
          />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
