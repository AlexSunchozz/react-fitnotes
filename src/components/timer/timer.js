import './timer.scss';
import settings from './img/settings.png'
import play from './img/play.png'
import { useState } from 'react';
import TimerSettings from '../app/timersettings/timersettings';

let minutes, seconds, sum;
function convertTime(value) {

    minutes = Math.trunc(value / 60);
    seconds = Math.floor(value % 60);

    return minutes, seconds
}

const Timer = () => {
    const [time, setTime] = useState({minutes: 1, seconds: 30});
    const [change, setChange] = useState({seconds: 30})
    const [activeSettings, setActiveSettings] = useState(false)
    const [audio, setAudio] = useState(true);

    const getZero = (num) => {

        if (num >= 0 && num < 10) {
            return `0${num}`; 
        } else return num       
    }

    const checkTimerChange = (sum) => {
        
    }

    return (
        <div className="timer">
            <div className="container timer-container">
                <div className="timer-content">
                    <div className="timer-content__settings" onClick={() => setActiveSettings(!activeSettings)}><img src={settings} alt="settings" /></div>
                    <div className="timer-content__time">{getZero(time.minutes)}:{getZero(time.seconds)}</div>
                    <div className="timer-content__plus" onClick={(e) => setTime(() => {
                        sum = time.seconds + time.minutes * 60 + change.seconds
                        if (sum > 3600) {
                            sum = 3600
                            e.target.style.color = 'red'
                        } else {
                            e.target.style.color = ''
                        }
                        convertTime(sum)

                        return {minutes, seconds}
                    })}>+</div>
                    <div className="timer-content__minus" onClick={(e) => setTime(() => {
                        sum = time.seconds + time.minutes * 60 - change.seconds
                        if (sum < 0) {
                            sum = 1
                            e.target.style.color = 'red'
                        } else {
                            e.target.style.color = ''
                        }
                        convertTime(sum)

                        return {minutes, seconds}
                    })}>—</div>
                </div>
                <div className="timer-play"><img src={play} alt="play" /></div>
            </div>
            <TimerSettings time={time} setTime={setTime} change={change} setChange={setChange} convertTime={convertTime} getZero={getZero} activeSettings={activeSettings} setActiveSettings={setActiveSettings} audio={audio} setAudio={setAudio}/>
        </div>
    )
}
export {minutes,seconds,convertTime}
export default Timer;