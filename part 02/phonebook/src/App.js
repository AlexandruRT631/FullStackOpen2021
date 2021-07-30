import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Person'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
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
            personService
                .create(newPerson)
                .then(addedPerson => {
                    setPersons(persons.concat(addedPerson))
                })
        } else {
            if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
                personService
                    .update(persons[indexPerson].id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== persons[indexPerson].id ? person : returnedPerson))
                    })
            }
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
            <Persons persons={persons} newSearch={newSearch} setPersons={setPersons}/>
        </div>
    )
}

export default App