import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    input:{
        type,
        value,
        onChange
    },
   
    reset
  }
}

// modules can have several named exports

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = async (newAnecdote) => {
        const createdAnecdote = await anecdoteService.createNew(newAnecdote)
        setAnecdotes(anecdotes.concat(createdAnecdote))
    }

    return{
        anecdotes,
        addAnecdote
    }
  
}