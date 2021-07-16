import React, {useState} from 'react'

const Button = (props) => {
    return (
        <button onClick={props.click}>
            {props.text}
        </button>
    )
}

const Statistic = (props) => {

    if (props.text === "positive") {
        return (
            <tr>
                <td>{props.text}</td>
                <td>{props.value} %</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    const all = good + neutral + bad

    if (all === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <table>
            <tbody>
                <Statistic text="good" value={good}></Statistic>
                <Statistic text="neutral" value={neutral}></Statistic>
                <Statistic text="bad" value={bad}></Statistic>
                <Statistic text="all" value={all}></Statistic>
                <Statistic text="average" value={(good - bad) / all}></Statistic>
                <Statistic text="positive" value={good * 100 / all}></Statistic>
            </tbody>
        </table>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button click={() => setGood(good + 1)} text="good"></Button>
            <Button click={() => setNeutral(neutral + 1)} text="neutral"></Button>
            <Button click={() => setBad(bad + 1)} text="bad"></Button>

            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
        </div>
    )
}

export default App