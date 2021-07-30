import personService from '../services/Person'

const DeletePerson = (props) => {
    if (window.confirm(`Delete ${props.person.name} ?`)) {
        personService
            .deletePerson(props.person.id)
            .then(() => {
                props.setMessageStyle('success')
                props.setMessage(
                    `Information of ${props.person.name} was removed`
                )
                setTimeout(() => {
                    props.setMessage(null)
                }, 5000)
                personService
                    .getAll()
                    .then(persons => {
                        props.setPersons(persons)
                    })
            })
    }
}

export default DeletePerson