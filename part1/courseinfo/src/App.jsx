import Course from "./components/Course"

const DisplayContent = ({courses}) => {

  const arrayItems = courses.map((content) => {
  return (
      <div>
        <h1 key={content.id}>{content.name}</h1>
        <ul>
          {
            content.parts.map(listItem => 
              <li key={listItem.id}>
                {listItem.name} {listItem.exercises}
              </li>)
          }
        </ul>
        <h5>
          The total exercies are  {content.parts.reduce((acc, cVal) => acc + cVal.exercises, 0)}
          
        </h5>
      </div>
      
  )
  })
  
  return (
    <div>{arrayItems}</div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  
  return <Course courses = {courses} />
}

export default App