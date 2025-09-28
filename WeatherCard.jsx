import "./WeatherCard.css";

function WeatherCard({ data }) {
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;

    // Formatta l'orario corrente
    const currentTime = new Date().toLocaleString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: '2-digit'
    });

    // Simula dati aggiuntivi (in una vera app arriverebbero dall'API)
    const additionalData = {
        tempMax: Math.round(data.main.temp_max || data.main.temp + 3),
        tempMin: Math.round(data.main.temp_min || data.main.temp - 5),
        feelsLike: Math.round(data.main.feels_like || data.main.temp + 2),
        visibility: data.visibility ? `${(data.visibility / 1000).toFixed(1)}km` : '10km',
        pressure: `${data.main.pressure} hPa`,
        clouds: `${data.clouds?.all || 50}%`
    };

    // Simula previsioni orarie
    const mockForecast = [
        { time: '09:00', condition: 'Snow', temp: '19°', icon: '13d' },
        { time: '12:00', condition: 'Snow', temp: '21°', icon: '13d' },
        { time: '15:00', condition: 'Cloudy', temp: '18°', icon: '04d' },
        { time: '18:00', condition: 'Rain', temp: '16°', icon: '10d' }
    ];

    return (
        <div className="weather-card">
            <div className="main-weather">
                <div className="current-temp">{Math.round(data.main.temp)}°</div>
                <div className="city-name">{data.name}</div>
                <div className="current-time">{currentTime}</div>

                <div className="weather-condition">
                    <img
                        className="condition-icon"
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={description}
                    />
                    <div className="condition-text">
                        {getConditionName(data.weather[0].main)}
                    </div>
                </div>
            </div>

            <div className="weather-details">
                <div className="details-section">
                    <div className="section-title">Weather Details...</div>

                    <div className="detail-row">
                        <span className="detail-label">Temp max</span>
                        <span className="detail-value">{additionalData.tempMax}° 🌡️</span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">Temp min</span>
                        <span className="detail-value">{additionalData.tempMin}° 🌡️</span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">Humidity</span>
                        <span className="detail-value">{data.main.humidity}% 💧</span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">Cloudy</span>
                        <span className="detail-value">{additionalData.clouds} ☁️</span>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">Wind</span>
                        <span className="detail-value">{Math.round(data.wind.speed * 3.6)}km/h 💨</span>
                    </div>
                </div>
            </div>

            <div className="forecast-section">
                <div className="forecast-title">Today's Weather Forecast...</div>
                <div className="forecast-items">
                    {mockForecast.map((item, index) => (
                        <div key={index} className="forecast-item">
                            <img
                                className="forecast-icon"
                                src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                alt={item.condition}
                            />
                            <div className="forecast-info">
                                <div className="forecast-time">{item.time}</div>
                                <div className="forecast-condition">{item.condition}</div>
                                <div className="forecast-temp">{item.temp}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Helper function per tradurre le condizioni meteo
function getConditionName(condition) {
    const conditions = {
        'Clear': 'Clear Sky',
        'Clouds': 'Cloudy',
        'Rain': 'Rainy',
        'Drizzle': 'Light Drizzle',
        'Thunderstorm': 'Thunderstorm',
        'Snow': 'Snowy',
        'Mist': 'Misty',
        'Fog': 'Foggy'
    };

    return conditions[condition] || condition;
}

export default WeatherCard;