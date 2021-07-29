import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])


    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    return (
        <div>
            <form>
                <div>
                    find countries <input value={newSearch} onChange={handleSearchChange}/>
                </div>
            </form>
            <Countries countries={countries} newSearch={newSearch} setNewSearch={setNewSearch}/>
        </div>
    )
}

export default App