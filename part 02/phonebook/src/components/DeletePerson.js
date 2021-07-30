import personService from '../services/Person'

const DeletePerson = (props) => {
    if (window.confirm(`Delete ${props.person.name} ?`)) {
        personService
            .deletePerson(props.person.id)
            .then(() => {
                console.log(`The person with id ${props.person.id} has been deleted`)
                personService
                    .getAll()
                    .then(persons => {
                        console.log("List updated")
                        props.setPersons(persons)
                    })
            })
    }
}

export default DeletePerson