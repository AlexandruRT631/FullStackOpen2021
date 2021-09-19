import React from "react";
import DeletePersons from './DeletePerson'

const Person = (props) => {
    return (
        <li>
            {props.person.name} {props.person.number}
            <button onClick={() => DeletePersons(props)}>delete</button>
        </li>
    )
}

const Persons = (props) => {
    return (
        <ul>
            {
                props.persons
                    .filter(person => person.name.toLowerCase().includes(props.newSearch.toLowerCase()) === true)
                    .map(person => <Person key={person.name} person={person} setPersons={props.setPersons}
                                           setMessage={props.setMessage} setMessageStyle={props.setMessageStyle}/>)
            }
        </ul>
    )
}

export default Persons