import { createContext, useContext, useState } from "react"

export const CityContext = createContext()

export function CityProvider({children}) {

    const [city, setCity] = useState()

    return <CityContext.Provider value={{city, setCity}}>{children}</CityContext.Provider> 
}
