import { useEffect, useRef, useState } from "react"
import axios from "axios"

import {useCity} from '../../hooks/useCity'
import cities from '../../data/cities.json'

import Style from './layout.module.css'

import Card from '../card/card'
import Loading from "../loading/loading"

function Layout () {

    const key = "521f42b998dd4f6aa5b96d69edf7b5fd"
    const inputRef = useRef(null)
    const [weather, setWeather] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const {city, setCity} = useCity()

    useEffect(() => {

        const rootCity = "İstanbul"

        if(!city) { 
            inputRef.current.value = rootCity
            const searchResult = cities.find(s => s.city === rootCity)
            searchResult && setCity(searchResult)
        }

    }, [])

    useEffect(() => {

        setIsLoading(true)
        
        const lat = city && city.geocoding.lat
        const lon = city && city.geocoding.lon

        axios({
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}`
        })
        .then((response) => {
            setWeather(response.data)
            setIsLoading(false)
        })
        .catch((e) => {
            console.log(e.message)
            setIsLoading(false)
        })
    }, [city])

    useEffect(() => {

        inputRef.current.disabled = isLoading

    }, [isLoading]) 

    const handleChance = (e) => {
        const searchResult = cities.find(s => s.city === e.target.value)

        searchResult && setCity(searchResult)
    }

    return(
        <div className={Style.container}>

            <div className={Style.box}>

                <div className={Style.head}>
                    <label className={Style.city}>{city ? city.city : "Şehir seçin."}</label>
                    <input className={Style.input} list="brow" onChange={handleChance} ref={inputRef}/>
                    <datalist id="brow">
                        {
                            cities.map((value) => {
                                return <option key={`city:${value.city}`} value={value.city}/>
                            })
                        }
                    </datalist>
                </div>

                <div className={Style.content}>

                    {
                        weather && weather.daily.map((value) => {
                            return <Card key={value.temp.day} data={value}/>
                        })
                    }
                
                </div>

            </div>

            {
                isLoading && <Loading/>
            }

        </div>
    )
}

export default Layout