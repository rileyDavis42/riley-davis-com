import React, {useEffect, useRef, useState} from "react";
import ReactAudioPlayer from 'react-audio-player';
import wavesSound from "./audio/ocean-waves.mp3";
import rainSound from "./audio/rain.wav";
import gongSound from "./audio/gong-g.wav";
import wavesPreview from "./img/waves-preview.jpg";
import rainPreview from "./img/rain-preview.jpg";

const RelaxComponent = () => {
    const containerRef = useRef<any>(null);
    const [selectedSound, setSelectedSound] = useState<string>(wavesSound);
    const [seconds, setSeconds] = useState<number>(120);
    const [opacity, setOpacity] = useState<number>(1);
    const [inputTimer, setInputTimer] = useState<number>(0);
    const [hideTimer, setHideTimer] = useState<boolean>(false);
    const [audioVolume, setAudioVolume] = useState<number>(25);
    const [inputTriggered, setInputTriggered] = useState<boolean>(false);
    const gong = new Audio(gongSound);
    let tick: ReturnType<typeof setInterval>;
    let inputTick: ReturnType<typeof setInterval>;
    const listeners = ["mousedown", "keydown", "mousemove"];

    const handleInput = () => {
        setInputTriggered(true);
        setSeconds(120);
        setInputTimer(0);
    }

    const getVolume = () => {
        const vol = audioVolume / 100;
        return vol < 1 ? vol > 0 ? vol : 0 : 1;
    }

    const countdownTimer = () => {
        listeners.map((l) => document.addEventListener(l, handleInput));

        tick = setInterval(() => {
            setSeconds(s => {
                if( s <= 1 ) {
                    clearInterval(tick);
                    celebrate();
                }
                return s - 1;
            });
        }, 1000);
    }

    useEffect(() => {
        countdownTimer();

        return () => {
            clearInterval(tick);
            listeners.map((l) => document.removeEventListener(l, handleInput));
        };
    }, [seconds, inputTimer && inputTimer < 0]);

    useEffect(() => {   
        if( inputTimer > 1 ) {
            setInputTriggered(false);
        }

        if( inputTimer > 5 ) {  
            setOpacity(0);
        } else {
            setOpacity(1);
        }
    }, [inputTimer, setInputTimer]);

    useEffect(() => {
        inputTick = setInterval(() => {
            setInputTimer(t => t += 0.1);
        }, 100);

        return () => clearInterval(inputTick);
    }, []);

    const celebrate = () => {
        gong.volume = getVolume();
        gong.play();
    }

    const buttonBackgroundStyling: React.CSSProperties = {
        backgroundSize: "cover",
        backgroundPosition: "center"
    };
    
    const handleChangeVolume = (element: any) => {
        setAudioVolume(parseInt( element.target.value ));
    }

    return <div className={`relax-container ${selectedSound === wavesSound ? "ocean" : "rain"}`} ref={containerRef}>
        <p style={{opacity: opacity}}>This is the same thing as <a href="http://www.donothingfor2minutes.com/">donothingfor2minutes.com</a> but with working audio</p>
        <div className="timer-display" style={hideTimer ? {opacity: opacity} : {}}>
            <span className={`${inputTriggered && "red"}`}>
                {Math.floor( seconds / 60 ) + " : "}
                {seconds % 60 < 10 ? "0" : ""}
                {seconds % 60}
            </span>
        </div>
        <div className="options-container" style={{opacity: opacity}}>
            <div className="toggle-hide-timer">
                <label>Hide Timer</label>
                <input type="checkbox" value={hideTimer.toString()} onClick={() => setHideTimer(!hideTimer)}/>
            </div>
            <div className="control-volume">
                <label>Sound Volume</label>
                <input
                    type="range" min="1" max="100"
                    onInput={(value) => handleChangeVolume(value)}
                    value={audioVolume}/>
            </div>
        </div>
        <div className="theme-select" style={{opacity: opacity}}>
            <div className="theme-select-wrapper">
                <div className="theme-select-button-container">
                    <button
                        style={{backgroundImage: "url(" + wavesPreview + ")", ...buttonBackgroundStyling}}
                        onClick={() => setSelectedSound(wavesSound)}>Ocean</button>
                </div>
                <div className="theme-select-button-container">
                    <button
                        style={{backgroundImage: "url(" + rainPreview + ")", ...buttonBackgroundStyling}}
                        onClick={() => setSelectedSound(rainSound)}>Rain</button>
                </div>
            </div>
        </div>
        
        <ReactAudioPlayer
            src={selectedSound}
            volume={getVolume()}
            autoPlay
            loop/>
    </div>
}

export default RelaxComponent;