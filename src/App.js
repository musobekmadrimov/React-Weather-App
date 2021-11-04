import React, { useState } from "react";
import Geolocation from "./geolocation";
import WhoDeveloped from "./WhoDeveloped";
const api = {
    key: "1dac6e4f0758eccd4f9e3396b7adea43",
    base: "https://api.openweathermap.org/data/2.5/"
}

let sunRise;
let sunSet;

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({
        sys: {
            sunrise: 0,
            sunset: 0
        },
        timezone: 0
    });


    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                   
                    try {
                        sunRise = convertTime(weather.sys.sunrise, weather.timezone)
                        sunSet = convertTime(weather.sys.sunset, weather.timezone)
                        result.sys.sunrise = sunRise
                        result.sys.sunset = sunSet
                    } catch (e) {
                        return
                    }

                    console.log(result)
                    setWeather(result);
                    setQuery('');
                });

        }

    }

    function convertTime(unixTime, offset) {
        let dt = new Date((unixTime + offset) * 1000)
        let h = dt.getUTCHours()
        let m = "0" + dt.getUTCMinutes()
        let t = h + ":" + m.substr(-2)
        return t
    }





    const dateBuilder = d => {
        const currentDate = new Date();
        let day = currentDate.toLocaleString('default', { weekday: 'long' });
        let date = d.getDate();
        let month = currentDate.toLocaleString('default', { month: 'long' });
        let year = d.getFullYear();

        return `${day}, ${month} ${date}, ${year}`
    }



    return (
        <div className={
            (typeof weather.main != "undefined")
                ? ((weather.weather[0].main === 'Rain')
                    ? 'app rainy'
                    : ((weather.weather[0].main === 'Clear')
                        ? 'app warm'
                        : (weather.weather[0].main === 'Clouds')
                            ? 'app cloudy'
                            : (weather.weather[0].main === 'Snow')
                                ? 'app snow'
                                : (weather.weather[0].main === 'Wind')
                                    ? 'app windy'
                                    : 'app'
                    )
                )

                : 'app'
        }>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ?
                    (<>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">
                                <div className="key">
                                    <h3>Weather:</h3>
                                    <h3>Feels like:</h3>
                                    <h3>Pressure:</h3>
                                    <h3>Humidity:</h3>
                                    <h3>Wind:</h3>
                                    <h3>Sunrise:</h3>
                                    <h3>Sunset:</h3>
                                </div>
                                <div className="value">
                                    <p>{weather.weather[0].main}</p>
                                    <p>{Math.round(weather.main.feels_like)}°C</p>
                                    <p>{weather.main.pressure} Hg</p>
                                    <p>{weather.main.humidity}%</p>
                                    <p>{Math.floor(weather.wind.speed)} m/s</p>
                                    <p>{weather.sys.sunrise}</p>
                                    <p>{weather.sys.sunrise}</p>
                                </div>
                            </div>
                        </div>
                    </>)
                    : (
                        (weather.cod !== "") ? (
                            <>
                                <div className="weather-box">
                                    <div className="temp">{weather.cod}</div>
                                    <div className="weather">{weather.message}</div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )

                    )}
                
                <WhoDeveloped />
                <Geolocation />
            </main>
        </div>
    );
}

export default App;