import './timersettings.scss';
import { minutes, seconds, convertTime} from '../../timer/timer';

const TimerSettings = ({time, setTime, change, setChange, activeSettings, setActiveSettings, audio, setAudio}) => {

    return (
        <div className={activeSettings ? "timer-settings active" : "timer-settings"} onClick={(e) => {
            if (e.target.classList.contains('timer-settings')) {
                setActiveSettings(!activeSettings)
            }
            }}>
            <div className="blur"></div>
            <div className="timer-settings-container">
                <h3 className="timer-settings__title">Настройки таймера</h3>
                <div className="timer-settings__content content">
                    <div className="content__inputs">
                        <div className="content__inputs-item">
                            <label htmlFor="duration">Длительность (сек)</label>
                            <input type="number" max="3600" placeholder="90" id="duration" onChange={(e) => setTime(() => {
                            
                                convertTime(e.target.value);

                                if (minutes <= 60) {
                                    time = {minutes: minutes, seconds: seconds};
                                    e.target.style.border = ''
                                    document.querySelector('.errorDurationInput').style.display = '';
                                } 
                                
                                if (Number(e.target.value) > 3600) {
                                    time = {minutes: 60, seconds: 0}
                                    e.target.style.border = '1px solid red';
                                    document.querySelector('.errorDurationInput').style.display = 'block';
                                }
                            
                                if (e.target.value === '') { 
                                    time = {minutes: 1, seconds: 30}
                                } else if (e.target.value < 1) { 
                                    time = {minutes: 0, seconds: 1} 
                                }

                                return time;
                            })}/>
                            <label htmlFor="duration" className='errorDurationInput'>Слишком большой отдых</label>
                        </div>
                        <div className="content__inputs-item">
                            <label htmlFor="change">Изменение +/- (сек)</label>
                            <input type="number" placeholder="30" max="60" id="change" onChange={(e) => setChange(() => {
                                    convertTime(e.target.value);

                                    if (seconds <= 59) {
                                        change = {seconds: seconds};
                                        e.target.style.border = ''
                                        document.querySelector('.errorChangeInput').style.display = '';
                                    } 

                                    if (Number(e.target.value) === 60) {
                                        change = {seconds: 60};
                                        e.target.style.border = ''
                                        document.querySelector('.errorChangeInput').style.display = '';
                                    } 
                                    
                                    if (Number(e.target.value) > 60) {
                                        change = {seconds: 60};
                                        e.target.style.border = '1px solid red';
                                        document.querySelector('.errorChangeInput').style.display = 'block';
                                    }
                                
                                    if (e.target.value === '') { 
                                        change = {seconds: 30};
                                    } else if (e.target.value < 1) { 
                                        change = {seconds: 1};
                                    }
    
                                    return change;
                                }
                            )}/>
                            <label htmlFor="change" className='errorChangeInput'>Слишком большой интервал</label>
                        </div>
                    </div>
                    <div className="content-checkboxes">
                        <input type="checkbox" id="volume" onChange={() => setAudio(!audio)}></input>
                        <label htmlFor="volume">Звук</label>
                    </div>
                </div>
                <div className="timer-settings__btns">
                    <div className="timer-settings__btns-cancel" onClick={() => setActiveSettings(!activeSettings)}>Отмена</div>
                    <div className="timer-settings__btns-save" onClick={() => setActiveSettings(!activeSettings)}>Сохранить</div>
                </div>
            </div>
        </div>
    )
}

export default TimerSettings;