import React from "react";
import DisplayCountry from "./DisplayCountry";
import DisplayFilteredCountries from "./DisplayFilteredCountries"
import DisplayError from "./DisplayError"

const Countries = (props) => {
    const filteredCountries = props.countries
        .filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase()) === true)

    if (filteredCountries.length === 1) {
        return (<DisplayCountry country={filteredCountries[0]}/>)
    } else if (filteredCountries.length <= 10) {
        return (<DisplayFilteredCountries countries={filteredCountries} setNewSearch={props.setNewSearch}/>)
    } else {
        return (<DisplayError/>)
    }
}

export default Countries