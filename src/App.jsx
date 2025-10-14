import { useState } from "react";
import { getCoordinates, getWeatherByCoords } from "./services/weatherApi";
import WeatherCard from "./components/WeatherCard";
import BackgroundVideo from "./components/BackgroundVideo";
import "./App.css";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        setError("");

        try {
            const { lat, lon, name } = await getCoordinates(city);
            const data = await getWeatherByCoords(lat, lon);
            data.name = name;
            setWeather(data);
            setError("");
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className="app">
            {/* Video di sfondo con transizione */}
            <BackgroundVideo weather={weather} />

            <div className="overlay">
                <h1 className="title">Weather Report</h1>

                <div className="search-container">
                    <form onSubmit={handleSearch} className={`search-box ${loading ? 'loading' : ''}`}>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search Location..."
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? '' : (
                                <svg className="search-icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </form>
                </div>

                {error && <div className="error">{error}</div>}
                {weather && <WeatherCard data={weather} />}

                <footer className="footer">
                    <p className="footer-text">
                        Progetto nato per pura dimostrazione di competenze. Sviluppato da <strong>Nicola Piras</strong> - © <strong>Closh Design</strong>
                    </p>
                    <p className="footer-subtitle">
                        Progettato con <strong>Figma</strong>. Costruito con <strong>React-Vite</strong>.
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;