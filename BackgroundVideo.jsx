import { useEffect, useState } from "react";
import "./BackgroundVideo.css";

function BackgroundVideo({ weather }) {
    const [currentVideo, setCurrentVideo] = useState(getBackground(weather));
    const [nextVideo, setNextVideo] = useState(null);

    useEffect(() => {
        const newVideo = getBackground(weather);
        if (newVideo !== currentVideo) {
            setNextVideo(newVideo);
            const timer = setTimeout(() => {
                setCurrentVideo(newVideo);
                setNextVideo(null);
            }, 1000); // durata transizione
            return () => clearTimeout(timer);
        }
    }, [weather, currentVideo]);

    return (
        <div className="background-container">
            <video
                key={currentVideo}
                className="background-video visible"
                src={currentVideo}
                autoPlay
                loop
                muted
            />
            {nextVideo && (
                <video
                    key={nextVideo}
                    className="background-video fading-in"
                    src={nextVideo}
                    autoPlay
                    loop
                    muted
                />
            )}
        </div>
    );
}

// stessa logica di prima
function getBackground(weather) {
    if (!weather) return "/backgrounds/clear.mp4";
    const main = weather.weather[0].main.toLowerCase();

    if (main.includes("rain")) return "/backgrounds/rain.mp4";
    if (main.includes("snow")) return "/backgrounds/snow.mp4";
    if (main.includes("cloud")) return "/backgrounds/clouds.mp4";
    if (main.includes("thunderstorm")) return "/backgrounds/thunder.mp4";
    if (main.includes("mist") || main.includes("fog")) return "/backgrounds/mist.mp4";

    return "/backgrounds/clear.mp4";
}

export default BackgroundVideo;
