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
  

const Course = (props) => {
   
    return (
        <div>
        <DisplayContent courses = {props.courses} />
        </div>
    )
} 

export default Course