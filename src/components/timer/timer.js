import './timer.scss';
import settings from './img/settings.png'
import play from './img/play.png'

const Timer = () => {
    return (
        <div className="timer">
            <div className="container timer-container">
                <div className="timer-content">
                    <div className="timer-content__settings"><img src={settings} alt="settings" /></div>
                    <div className="timer-content__time">02:11</div>
                    <div className="timer-content__plus">+</div>
                    <div className="timer-content__minus">—</div>
                </div>
                <div className="timer-play"><img src={play} alt="play" /></div>
            </div>
        </div>
    )
}

export default Timer;