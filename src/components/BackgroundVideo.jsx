import { useEffect, useState } from "react";
import "./BackgroundVideo.css";

function BackgroundVideo({ weather }) {
    const [currentImage, setCurrentImage] = useState(getBackground(weather));
    const [nextImage, setNextImage] = useState(null);

    useEffect(() => {
        const newImage = getBackground(weather);
        if (newImage !== currentImage) {
            setNextImage(newImage);
            const timer = setTimeout(() => {
                setCurrentImage(newImage);
                setNextImage(null);
            }, 1000); // durata transizione
            return () => clearTimeout(timer);
        }
    }, [weather, currentImage]);

    return (
        <div className="background-container">
            <img
                key={currentImage}
                className="background-video visible"
                src={currentImage}
                alt="background"
            />
            {nextImage && (
                <img
                    key={nextImage}
                    className="background-video fading-in"
                    src={nextImage}
                    alt="background"
                />
            )}
        </div>
    );
}

// stessa logica di prima
function getBackground(weather) {
    if (!weather) return "/backgrounds/clear.jpg";
    const main = weather.weather[0].main.toLowerCase();

    if (main.includes("rain")) return "/backgrounds/rain.jpg";
    if (main.includes("snow")) return "/backgrounds/snow.jpg";
    if (main.includes("cloud")) return "/backgrounds/clouds.jpg";
    if (main.includes("thunderstorm")) return "/backgrounds/thunder.jpg";
    if (main.includes("mist") || main.includes("fog")) return "/backgrounds/mist.jpg";

    return "/backgrounds/clear.jpg";
}

export default BackgroundVideo;