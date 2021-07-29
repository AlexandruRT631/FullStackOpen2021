import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

const Language = ({language}) => {
    return (
        <li>{language.name}</li>
    )
}
const DisplayCountry = ({country}) => {
    const [temperature, setTemperature] = useState('')
    const [weatherIcon, setWeatherIcons] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    const [windDir, setWindDir] = useState('')

    const capital = useRef(country.capital)
    const api_link = useRef('http://api.weatherstack.com/current?access_key='
        .concat(process.env.REACT_APP_API_KEY)
        .concat('&query=')
        .concat(capital.current))

    useEffect(() => {
        let mounted = true
        axios
            .get(api_link.current)
            .then(response => {
                if (mounted) {
                    const weather = response.data
                    setTemperature(weather.current.temperature)
                    setWeatherIcons(weather.current.weather_icons)
                    setWindSpeed(weather.current.wind_speed)
                    setWindDir(weather.current.wind_dir)
                }
            })

        return () => mounted = false;

    }, [])

    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>
                Spoken languages
            </h2>
            <ul>
                {country.languages.map(language => <Language key={language.name} language={language}/>)}
            </ul>
            <img src={country.flag} alt="Flag" width="10%"/>
            <h2>
                Weather in {country.capital}
            </h2>
            <div><b>temperature:</b> {temperature} Celsius</div>
            <img src={weatherIcon} alt="Weather Icon"/>
            <div><b>wind:</b> {windSpeed} km/h direction {windDir}</div>
        </div>
    )
}

export default DisplayCountry