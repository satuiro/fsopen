import { useState } from 'react';
import SearchNum from './components/SearchNum'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [person, setPerson] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState(''); 

  
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchNum direct = {person} setDirect={setPerson} />
      <h2>add a New</h2>
      <PersonForm 
      person={person} 
      setPerson={setPerson} 
      newName={newName} 
      setNewName={setNewName} 
      number={number} 
      setNumber={setNumber} 
      /> 
      <h2>Numbers</h2>
      <Persons person={person} />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
