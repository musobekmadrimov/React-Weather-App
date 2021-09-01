import React, { useState } from "react";
const api = {
    key: "1dac6e4f0758eccd4f9e3396b7adea43",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result)
                });
        }
    }

    const dateBuilder = d => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
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
                            <div className="temp">{Math.round(weather.main.temp)}°C</div>
                            <div className="weather">{weather.weather[0].main}</div>
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

            </main>
        </div>
    );
}

export default App;