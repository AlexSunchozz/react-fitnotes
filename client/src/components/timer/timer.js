import './timer.scss';
import settings from './img/settings.png'
import play from './img/play.png'
import pause from './img/pause.png'
import audioFile from './media/end.mp3'
import { useState, useEffect } from 'react';
import TimerSettings from '../timersettings/timersettings';

let minutes, seconds, sum;
function convertTime(value) {
    if (value <= 0) {
        minutes = 0;
        seconds = 0;
    } else {
        minutes = Math.trunc(value / 60);
        seconds = Math.floor(value % 60);
    }
    return {minutes, seconds}
}

const Timer = ({activeCalendar, active}) => {
    const [time, setTime] = useState({minutes: 1, seconds: 30});
    const [change, setChange] = useState({seconds: 30});

    const [activeSettings, setActiveSettings] = useState(false);

    const [audio, setAudio] = useState(false);
    const [activeTimer, setAvtiveTimer] = useState(false);


    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`; 
        } else return num       
    }

    const setClock = () => {
        if (activeTimer === false) return time
        if (time.minutes * 60 + time.seconds === 0) {
            setAvtiveTimer(!activeTimer)
            if (audio) {
                document.querySelector('#end').play();
            }
            time.minutes = 1;
            time.seconds = 30;
            return time
        }
        setTime(convertTime(time.minutes * 60 + time.seconds - 1))
    }

    useEffect(() => {
        const timerID = setInterval(() => setClock(), 1000);
        return () => clearInterval(timerID);
      });

    const checkTimerChange = (sum) => {
        if (sum > 0 && sum <= 3600) {
            document.querySelector('.timer-content__plus').style.color = ''
            document.querySelector('.timer-content__minus').style.color = ''
        } else if (sum > 3600) {
            document.querySelector('.timer-content__plus').style.color = 'red'
            document.querySelector('.timer-content__minus').style.color = ''
        } else if (sum < 1) {
            document.querySelector('.timer-content__plus').style.color = ''
            document.querySelector('.timer-content__minus').style.color = 'red'
        } 
    }

    return (
        <div className={active ? (activeCalendar ? "timer active margin" : "timer active") : "timer"}>
            <div className={activeTimer ? "container timer-container active" : "container timer-container"}>
                <div className="timer-content">
                    <div className={activeTimer ? "timer-content__settings hide" : "timer-content__settings"} onClick={() => setActiveSettings(() => {
                        setActiveSettings(!activeSettings)
                        document.querySelector('#duration').value = time.minutes * 60 + time.seconds;
                        document.querySelector('#change').value = change.seconds;
                    })}><img src={settings} alt="settings" /></div>
                    <div className="timer-content__time">{`${getZero(time.minutes)}:${getZero(time.seconds)}`}</div>
                    <div className={activeTimer ? "timer-content__plus hide" : "timer-content__plus"} onClick={(e) => setTime(() => {
                        sum = time.seconds + time.minutes * 60 + change.seconds;
                        checkTimerChange(sum);
                        convertTime(sum > 3600 ? 3600 : sum);

                        return {minutes, seconds}
                    })}>+</div>
                    <div className={activeTimer ? "timer-content__minus hide" : "timer-content__minus"}onClick={(e) => setTime(() => {
                        sum = time.seconds + time.minutes * 60 - change.seconds
                        checkTimerChange(sum)
                        convertTime(sum < 1 ? 1 : sum)

                        return {minutes, seconds}
                    })}>—</div>
                </div>
                <div className={activeTimer ? "timer-play active" : "timer-play"} onClick={() => setAvtiveTimer(!activeTimer)}>
                <img src={activeTimer ? pause : play} alt="play" /></div>
                <audio id="end" preload="auto" src={audioFile}></audio>
            </div>
            <TimerSettings time={time} setTime={setTime} change={change} setChange={setChange} convertTime={convertTime} getZero={getZero} activeSettings={activeSettings} setActiveSettings={setActiveSettings} audio={audio} setAudio={setAudio}/>
        </div>
    )
}
export {minutes,seconds,convertTime}
export default Timer;