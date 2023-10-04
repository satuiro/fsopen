const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Parts = (props) =>{
  return (
    <>
      <p> {props.partName} {props.exCount} </p>
    </>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Parts partName = {props.part1} exCount = {props.ex1} />
      <Parts partName = {props.part2} exCount = {props.ex2} />
      <Parts partName = {props.part3} exCount = {props.ex3} />
    </>
  )
} 
const Total = (props) => {
  return (
    <>
      <p>The total course are {props.total} </p>
    </>
  )
}

const App = () => {
  const course = {name:'Half stack application development', 
    parts: [
      {
        name:'Fundamentals of react', 
        exercises:10
      },
      {
        name:'Using props to pass data', 
        exercises:7
      },
      {
        name:'State of a component',
        exercises: 14
      }
    ]
  }
  let total = 0; 
  course.parts.forEach(val => total += val.exercises)
  return (
    <>
      <Header course={course.name} />
      <Content 
        part1 = {course.parts[0].name}
        ex1 = {course.parts[0].exercises}
        part2 = {course.parts[1].name}
        ex2 = {course.parts[1].exercises}
        part3 = {course.parts[2].name}
        ex3 = {course.parts[2].exercises}
        />
      <Total total = {total} />
    </>
  )

}

export default App