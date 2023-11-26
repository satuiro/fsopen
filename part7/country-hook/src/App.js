import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  // console.log(name);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        const receivedCountry = response.data; // Assuming the first result is the correct country

        setCountry({data: receivedCountry, found: true});
      } catch (error) {
        console.log('Error receiving the country: ', error);
        setCountry({ found: false });
      }
    };

    if (name) {
      fetchData();
    }
  }, [name]); // Include name in the dependency array
  
  return country;
};


const Country = ({ country }) => {
  if (!country) {
    return null
  }
  console.log('The country found is ', country);
  // console.log('The country details are: ', country.data.name);
  // console.log(country.found);
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App