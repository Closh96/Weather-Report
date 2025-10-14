const API_KEY = "d6b5bb388984149523bd7f0208279d92";

// Ottieni coordinate da nome città
export async function getCoordinates(city) {
    const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            city
        )}&limit=1&appid=${API_KEY}`
    );

    const data = await res.json();
    if (!data || data.length === 0) {
        throw new Error("Città non trovata");
    }
    return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
}

// Ottieni meteo dalle coordinate
export async function getWeatherByCoords(lat, lon) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`
    );

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Errore nella richiesta meteo");
    }

    return res.json();
}
