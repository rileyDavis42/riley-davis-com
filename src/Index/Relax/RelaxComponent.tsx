import React, {useEffect, useRef, useState} from "react";
import ReactAudioPlayer from 'react-audio-player';
import waves from "./audio/ocean-waves.mp3";
import rain from "./audio/rain.wav";

const sounds = {
    waves: waves,
    rain: rain
}

const RelaxComponent = () => {
    const containerRef = useRef<any>(null);
    const [selectedSound, setSelectedSound] = useState<string>(waves);
    const [seconds, setSeconds] = useState<number>(120);

    useEffect(() => {
        const tick = setInterval(() => {
            setSeconds(s => {
                if( s <= 1 ) {
                    clearInterval(tick);
                    celebrate();
                }
                return s - 1;
            });
        }, 1000);

        return () => clearInterval(tick);
    }, []);

    const celebrate = () => {
        console.log('YAAAAAAAAY');
    }

    return <div className={`relax-container ${selectedSound === waves ? "ocean" : "rain"}`} ref={containerRef}>
        <p>This is the same thing as <a href="http://www.donothingfor2minutes.com/">donothingfor2minutes.com</a> but with working audio</p>
        <div className="timer-display">
            <span>{seconds}</span>
        </div>
        <div className="theme-select">
            <button onClick={() => setSelectedSound(waves)}>Ocean</button>
            <button onClick={() => setSelectedSound(rain)}>Rain</button>
        </div>
        
        <ReactAudioPlayer
            src={selectedSound}
            autoPlay
            loop/>
    </div>
}

export default RelaxComponent;