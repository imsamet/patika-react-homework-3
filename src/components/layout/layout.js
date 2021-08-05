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

        console.log(data)

    }, [city])

    useEffect(() => {
        inputRef.current.disabled = isLoading
        console.log(inputRef.current.disabled)
    })

    const turkishCase = function(text, change){
        let string = text;
        const lettersLow = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
        const lettersUp = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
        
        if(change === "low") {
            string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter){ return lettersLow[letter]; })
            return string.toLowerCase();
        }
        if(change === "up") {
            string = string.replace(/(([iışğüçö]))/g, function(letter){ return lettersUp[letter]; })
            return string.toUpperCase();
        }

    }

    const toLover = (text) => {
        const arrText = text.split("")
        let newText = ""

        arrText.map((value, index) => {
            index != 0 ? 
                newText += turkishCase(value, "low")
            : 
                newText += value
        })
    
        return newText
    }   

    const handleChance = (e) => {
        const searchResult = cities.find(s => s.city == turkishCase(e.target.value, "up"))

        searchResult && setCity(searchResult)
    }

    return(
        <div>
            <input list="brow" onChange={handleChance} ref={inputRef}/>
            <datalist id="brow">
                {
                    cities.map((value) => {
                        return <option key={`city:${value.city}`} value={toLover(value.city)}/>
                    })
                }
            </datalist>

            {
                data && Object.entries(data).map((value, index) => {
                    return <Card key={index} data={value}/>
                })
            }

        </div>
    )
}

export default Layout