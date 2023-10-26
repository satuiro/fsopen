import { useState } from "react"

const SearchNum = ({direct, setDirect}) => {
    const [nameSearch, setNameSearch] = useState('')

    const isNameInPerson = (persons, nameToCheck) => {
        return persons.some(person => person.name.toLowerCase() === nameToCheck.toLowerCase());
      }
    
    const handleChange = (event) => {
        setNameSearch(event.target.value)
    }
    const onSearch = (event) => {
        event.preventDefault(); 
        const filteredDirect = direct.filter(person => person.name.toLowerCase() === nameSearch.toLowerCase())
        setDirect(filteredDirect)
    }

    return (
        <div>
            <form onSubmit={onSearch}>
                filter shown with <input value={nameSearch} onChange={handleChange}/>
                <button type="submit">search</button>
            </form>
        </div>
    )
}

export default SearchNum