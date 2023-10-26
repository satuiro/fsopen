import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchNum from './components/SearchNum'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'
import Notification from './components/Notification';

const App = () => {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState(''); 
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => setPerson(initialData))    
      .catch(error => console.log(error))
  },[])
  console.log('render', person.length, 'contacts');

  const handleDelete = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}`)){
    
    personService
      .del(id)
      .then(respose => {
        console.log(respose)
        setPerson(prevPerson => prevPerson.filter(person => person.id !== id))
        setMessage(`Deleted ${name}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
      })

      .catch(error => console.log('delete failed', error))
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchNum direct = {person} setDirect={setPerson} />
      <h2>add a New</h2>
      <PersonForm 
      person={person} 
      setPerson={setPerson} 
      newName={newName} 
      setNewName={setNewName} 
      number={number} 
      setNumber={setNumber} 
      message={message}
      setMessage={setMessage}
      /> 
      <h2>Numbers</h2>
      <Persons person={person} handleDelete={handleDelete}/>
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
