import cn from 'classnames'
import Style from './card.module.css'
import {
    Compass,
    Svg01D,
    Svg01N,
    Svg02D,
    Svg02N,
    Svg03,
    Svg04,
    Svg09,
    Svg10,
    Svg11,
    Svg13,
    Up} from '../icons'

function FirstCard ({morn, day, eve, night, humidity, windSpeed, windDeg}) {


    const style = {
        transform: `rotateZ(${windDeg}deg) rotateY(50deg)`
    }
    return(
        <>
            <div className={Style.firstCard}>
                <div className={Style.items}>
                    <span className={Style.text}><span>Sabah: </span>{`${Math.round(morn)}°`}</span>
                    <span className={Style.text}><span>Öğle: </span>{`${Math.round(day)}°`}</span>
                    <span className={Style.text}><span>Akşam: </span>{`${Math.round(eve)}°`}</span>
                    <span className={Style.text}><span>Gece: </span>{`${Math.round(night)}°`}</span>
                </div>
            </div>
            <div className={Style.firstCard}>
                <div className={Style.items}>
                    <span className={Style.text}><span>Nem: </span>{`${Math.round(humidity)}%`}</span>
                    <span className={Style.text}><span>Rüzgar hızı: </span>{`${Math.round(windSpeed)} m/s`}</span>
                    <span className={cn(Style.text, Style.deg)}>Rüzgar yönü: <div className={Style.degIcon}><Compass/> <Up style={style}/></div></span>
                </div>
            </div>
        </>
    )
} 

function Card({data, index}) {

    const dataObject = new Date(data.dt * 1000)

    const mount = dataObject.toLocaleString(window.navigator.language, {month: "long"})
    const dayNumeric = dataObject.toLocaleString(window.navigator.language, {day: "numeric"})
    const day = dataObject.toLocaleString(window.navigator.language, {weekday: 'long'})

    return(
        <div className={Style.card}>
            <div className={Style.content}>
                <div className={Style.items}>

                    <span className={Style.day}>{`${dayNumeric} ${mount} ${day}`}</span>

                    {
                        data.weather[0].icon == "01d" ? 
                            <Svg01D/>
                        : data.weather[0].icon == "01n" ? 
                            <Svg01N/>
                        : data.weather[0].icon == "02d" ? 
                            <Svg02D/>
                        : data.weather[0].icon == "02n" ? 
                            <Svg02N/>
                        : data.weather[0].icon == "03d" || data.weather[0].icon == "03n"  ? 
                            <Svg03/>
                        : data.weather[0].icon == "04d" || data.weather[0].icon == "04n"  ? 
                            <Svg04/>
                        : data.weather[0].icon == "09d" || data.weather[0].icon == "09n"  ? 
                            <Svg09/>
                        : data.weather[0].icon == "10d" || data.weather[0].icon == "10n"  ? 
                            <Svg10/>
                        : data.weather[0].icon == "11d" || data.weather[0].icon == "11n"  ? 
                            <Svg11/>
                        : data.weather[0].icon == "13d" || data.weather[0].icon == "13n"  &&
                            <Svg13/>
                    }

                    <span className={Style.text}><span>En düşük: </span>{`${Math.round(data.temp.min)}°`}</span>
                    <span className={Style.text}><span>En yüksek: </span>{`${Math.round(data.temp.max)}°`}</span>

                </div>

                {
                    index == 0 && <FirstCard 
                                    morn={data.temp.morn}
                                    day={data.temp.day}
                                    eve={data.temp.eve}
                                    night={data.temp.night}
                                    humidity={data.humidity}
                                    windSpeed={data.wind_speed}
                                    windDeg={data.wind_deg}
                                />
                        
                }

            </div>  
        </div>
    )
}

export default Card