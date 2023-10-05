import { useState } from "react"

const Button = (props) => {
  return (<button onClick={props.handleClick}>
    {props.text}
  </button>)
}

const StatisticsLine = ({value,text}) => {
  if (text === 'Positive'){
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({good, setGood, bad, setBad, neutral, setNeutral}) => { 
  const [average, setAverage] = useState(0)
  const [pos, setPos] = useState(0)
  
  const handleGood = () => {
    const updGood = good + 1  
    setGood(updGood)
    setAverage(parseFloat(((updGood * 1) + (bad * -1)) / (updGood + bad + neutral)).toFixed(2))
    setPos((((updGood + neutral + (bad * (-1))) / (updGood + bad+ neutral))*100).toFixed(2))

  }
  const handleBad = () => {
    const updBad = bad + 1
    setBad(updBad)
    setAverage((((good * 1) + (updBad * -1)) / (good + updBad + neutral)).toFixed(2))  
    setPos((((good + neutral + (updBad * (-1))) / (good + updBad+ neutral))*100).toFixed(2))
  }
  const handleNeutral = () => {
    const updNeutral = neutral + 1
    setNeutral(updNeutral)
    setAverage((((good * 1) + (bad * -1)) / (good + bad + updNeutral)).toFixed(2))
    setPos((((good + updNeutral + (bad * (-1))) / (good + bad+ updNeutral))*100).toFixed(2))
  }
  
  if (good === 0 && bad === 0 && neutral === 0){
    return (
      <div>
      <Button handleClick = {handleGood} text = 'good' />
      <Button handleClick = {handleBad} text = 'bad' />
      <Button handleClick = {handleNeutral} text = 'neutral' />
      <br />
      <h1>Statistics</h1>
      <p>No feedback at this time</p>
      </div>
    )
  }
  return (
    <div>
    <Button handleClick = {handleGood} text = 'good' />
    <Button handleClick = {handleBad} text = 'bad' />
    <Button handleClick = {handleNeutral} text = 'neutral' />
    <h1>Statistics</h1>
    <table>
      <tbody>
        <StatisticsLine text='Good' value={good} />
        <StatisticsLine text='Bad' value={bad} />
        <StatisticsLine text='Neutral' value={neutral} />
        <StatisticsLine text='Average' value={average} />
        <StatisticsLine text='Positive' value={pos} />
      </tbody>
    </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  return (
    <div>
      <h1>Feedback</h1>
      <Statistics good={good} 
      setGood={setGood}
      setBad={setBad}
      bad={bad}
      neutral={neutral}
      setNeutral={setNeutral}
      />
    </div>
  )
}

export default App