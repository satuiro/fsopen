const PersonForm = ({person, setPerson, newName, setNewName, number, setNumber}) => {
    const isNameInPerson = (persons, nameToCheck) => {
        return persons.some(person => person.name.toLowerCase() === nameToCheck.toLowerCase());
      };
    
    const addName = (event) => {
    event.preventDefault();
    const newObject = {
        name: newName,
        number:number
    };
    if (isNameInPerson(person, newName)) {
        alert(`${newName} already exists`);
    } else {
        setPerson(person.concat(newObject));
        }
    };
        
    const handleNewName = (event) => {
        setNewName(event.target.value);
    };
        
    const handleNewNumber = (event) => { 
        setNumber(event.target.value);
    }

    return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          phone number: <input value={number} onChange={handleNewNumber} />
        </div>
        <button type='submit'>add</button>
    </form>
    )
      
}

export default PersonForm