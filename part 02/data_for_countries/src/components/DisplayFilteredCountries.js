import React from "react";

const Country = (props) => {
    return (
        <li>
            {props.country.name}
            <button onClick={() => props.setNewSearch(props.country.name)}>
                show
            </button>
        </li>
    )
}

const DisplayFilteredCountries = (props) => {
    return (
        <ul>
            {
                props.countries
                    .map(country => <Country key={country.name} country={country} setNewSearch={props.setNewSearch}/>)
            }
        </ul>
    )
}

export default DisplayFilteredCountries