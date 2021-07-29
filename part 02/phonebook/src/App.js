import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }

        const indexPerson = persons.map(persons => persons.name.toLowerCase()).indexOf(newPerson.name.toLowerCase())

        if (indexPerson === -1) {
            setPersons(persons.concat(newPerson))
        } else {
            window.alert(`${newName} is already added to phonebook`)
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
            <h2>Add a new</h2>
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
            <h2>Numbers</h2>
            <Persons persons={persons} newSearch={newSearch}/>
        </div>
    )
}

export default App