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
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}`,
            responseType: 'stream'
        })
        .then((response) => {
            setData(response.data)
            setIsLoading(false)
        })
        .catch((e) => {
            setIsLoading(false)
        })

    }, [city])

    const handleChance = (e) => {
        const searchResult = cities.find(s => s.city == e.target.value)

        searchResult && setCity(searchResult)
    }

    const turkishToLower = function(text){
        var string = text;
        var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
        string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter){ return letters[letter]; })
        return string.toLowerCase();
    }

    const toLover = (text) => {
        const arrText = text.split("")
        let newText = ""

        arrText.map((value, index) => {
            index != 0 ? 
                newText += turkishToLower(value)
            : 
                newText += value
        })
    
        return newText
    }   

    return(
        <div>
            <input list="brow" onChange={handleChance} ref={inputRef}/>
            <datalist id="brow">
                {
                    cities.map((value) => {
                        const text = toLover(value.city)
                        return <option key={`city:${value.city}`} value={value.city}/>
                    })
                }
            </datalist>

            {
                JSON.stringify(isLoading)
            }

            {
                data && Object.entries(data).map((value) => {
                    return <Card data={value}/>
                })
            }

        </div>
    )
}

export default Layout