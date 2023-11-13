import {useSelector, useDispatch} from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer.js"

const AnecdoteForm = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value =''
        dispatch(newAnecdote(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name="content" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm