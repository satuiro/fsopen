const Persons = ({person}) => {
    return (
        <div>
            <ul>
                {person.map((name, index) => (
                <li key={index}>{name.name} {name.number}</li>
                ))}
            </ul>
        </div>
    )
} 
export default Persons