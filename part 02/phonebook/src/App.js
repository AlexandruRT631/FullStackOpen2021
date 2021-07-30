import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/Person'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [message, setMessage] = useState(null)
    const [messageStyle, setMessageStyle] = useState('success')

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
            setMessageStyle('success')
            setMessage(
                `Added ${newPerson.name}`
            )
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } else {
            if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
                personService
                    .update(persons[indexPerson].id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== persons[indexPerson].id ? person : returnedPerson))
                        setMessageStyle('success')
                        setMessage(
                            `${newPerson.name}'s number has been changed`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch(() => {
                        personService
                            .getAll()
                            .then(persons => {
                                setPersons(persons)
                            })
                        setMessageStyle('error')
                        setMessage(
                            `Information of ${newPerson.name} has already been removed from server`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 8000)
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
            <Notification message={message} messageStyle={messageStyle}/>
            <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
            <h2>Add a new</h2>
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
                        handleNumberChange={handleNumberChange} addPerson={addPerson}/>
            <h2>Numbers</h2>
            <Persons persons={persons} newSearch={newSearch} setPersons={setPersons}
                     setMessage={setMessage} setMessageStyle={setMessageStyle}/>
        </div>
    )
}

export default App