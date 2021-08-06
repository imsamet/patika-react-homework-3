import { useCity } from '../../hooks/useCity'
import Style from './card.module.css'

function Card({data}) {

    const {city, setCity} = useCity()
    console.log(data.weather[0].description)

    return(
        <div className={Style.card}>
            <div className={Style.content}>

                <span className={Style.day}>Wed</span>

                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path fill="currentColor" d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"></path>
                </svg>

                <span className={Style.lowC}><span>Hi: </span>80°</span>
                <span className={Style.upC}><span>Lo: </span>50°</span>

            </div>
        </div>
    )
}

export default Card