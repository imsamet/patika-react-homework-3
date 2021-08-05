import { useEffect, useRef, useState } from "react"
import axios from "axios"

import {useCity} from '../../hooks/useCity'
import cities from '../../data/cities.json'

import Card from '../card/card'

function Layout () {

    const key = "521f42b998dd4f6aa5b96d69edf7b5fd"
    const inputRef = useRef(null)
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const {city, setCity} = useCity()

    useEffect(() => {

        setIsLoading(true)
        
        const lat = city && city.geocoding.lat
        const lon = city && city.geocoding.lon

        axios({
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}`
        })
        .then((response) => {
            setData(response.data)
            setIsLoading(false)
        })
        .catch((e) => {
            console.log(e.message)
            setIsLoading(false)
        })
        
    }, [city])

    useEffect(() => {

        const rootCity = "İstanbul"
        inputRef.current.disabled = isLoading

        if(!city) { 
            inputRef.current.value = rootCity
            const searchResult = cities.find(s => s.city === rootCity)
            searchResult && setCity(searchResult)
        }
        
    }) 

    const handleChance = (e) => {
        const searchResult = cities.find(s => s.city === e.target.value)

        searchResult && setCity(searchResult)
    }

    return(
        <div>
            <input list="brow" onChange={handleChance} ref={inputRef}/>
            <datalist id="brow">
                {
                    cities.map((value) => {
                        return <option key={`city:${value.city}`} value={value.city}/>
                    })
                }
            </datalist>

            {
                data && data.daily.map((value) => {
                    return <Card key={value.temp.day} data={value}/>
                })
            }

        </div>
    )
}

export default Layout