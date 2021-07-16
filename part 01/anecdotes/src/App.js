import React, {useState} from 'react'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const Button = (props) => {
    return (
        <button onClick={props.click}>
            {props.text}
        </button>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]
    const [selected, setSelected] = useState([0, Array(anecdotes.length).fill(0), 0])
    //first element is displayed anecdote, second the votes array, and third the anecdote with most votes

    const updateVotes = () => {
        const copy = [...selected[1]]
        copy[selected[0]] = copy[selected[0]] + 1
        if (copy[selected[2]] < copy[selected[0]]) {
            setSelected([selected[0], copy, selected[0]])
        } else {
            setSelected([selected[0], copy, selected[2]])
        }
    }

    const updateAnecdote = () => {
        setSelected([getRandomInt(anecdotes.length), selected[1], selected[2]])
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected[0]]}</div>
            <div>has {selected[1][selected[0]]} votes</div>
            <Button click={() => updateAnecdote()} text="next anecdote"></Button>
            <Button click={() => updateVotes()} text="vote"></Button>
            <h1>Anecdote with most votes</h1>
            <div>{anecdotes[selected[2]]}</div>
            <div>has {selected[1][selected[2]]} votes</div>
        </div>
    )
}

export default App