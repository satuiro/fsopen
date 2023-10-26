import personService from '../services/persons'
import Notification from './Notification';

const PersonForm = ({person, setPerson, newName, setNewName, number, setNumber, message, setMessage}) => {
    
    // this function checks wether the name already exists in server or not
    const isNameInPerson = (persons, nameToCheck) => {
        return persons.some(person => person.name.toLowerCase() === nameToCheck.toLowerCase());
      };
    
    // we define a function to add a new name 
    const addName = (event) => {
    event.preventDefault();
    const newObject = {
        name: newName,
        number:number
    };

    if (isNameInPerson(person, newName)) {
        alert(`${newName} already exists`);
    } else {
        /* sends a POST request to the server and add a new copy of the array to
         the setPerson() */
        personService
            .create(newObject)
            .then(responseCont => {
                console.log(responseCont)
                setPerson(person.concat(responseCont))
                setMessage(`Added ${newName}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => console.log('fail'))
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