import { useContext } from "react"
import { CityContext } from "../context/city"

export const useCity = () => {return useContext(CityContext)}