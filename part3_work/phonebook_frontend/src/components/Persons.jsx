import personService from '../services/persons'

const Persons = ({person, handleDelete}) => {
    // const handleDeleteClick = (name) => {
    //     const ans = window.confirm(`Do you want to delete ${name.name}`)    
    // }
    
    return (
        <div>
            <ul>
                {Array.isArray(person) && person.map((name, index) => (
                <li key={index}>{name.name} {name.number} 
                <button onClick={() => handleDelete(name.id, name.name)}>
                Delete
                </button>
                </li>
                ))}
            </ul>
        </div>
    )
} 
export default Persons