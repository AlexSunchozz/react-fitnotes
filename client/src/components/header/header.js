import exercise from './icons/exercise.png';
import program from './icons/program.png';
import calc from './icons/calc.png';
import stat from './icons/statistic.png';
import start from './icons/start.png';
import Menu from '../menu/menu';
import timer from './icons/timer.png'
import calendar from './icons/calendar.png'
import Timer from '../timer/timer';


import { observer } from 'mobx-react-lite';
import { useContext, useState} from 'react';
import { Context } from '../../index';
import { Button} from 'react-bootstrap';
import { LOGIN_ROUTE } from '../utils/consts';
import { useHistory } from 'react-router-dom';

const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

const menuItems = [
    {
        name: "Начать тренировку", 
        href: "/", 
        icon: start,
        alt: 'start',
        focus: true
    },
    {
        name: "Калькулятор", 
        href: "/calculator", 
        icon: calc,
        alt: 'calculation',
        focus: false
    },
    {
        name: "Статистика", 
        href: "/statistic", 
        icon: stat,
        alt: 'statistic',
        focus: false
    },
]


const Header = observer(({dateTraining, activeTimer, setActiveTimer ,activeCalendar, setActiveCalendar}) => {
    const [active, setActive] = useState(false);
    const {user} = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);

        history.push(LOGIN_ROUTE);
    }

    const dateToday = new Date().getDate()
    return(
        <>
        <header className="header">
            <div className="container">
                <nav className="header-nav">
                    <div className="header-nav__burger" onClick={() => setActive(!active)}>
                        <span></span>
                    </div>
                    <div className='header-nav__item desktop'>
                        <div className="header-day">
                            {
                                dateTraining.getDate() === dateToday ?
                                "Сегодня"
                                :
                                `${dateTraining.getDate()} ${monthNames[dateTraining.getMonth()]}`
                            }    
                        </div>
                        <div className='header-nav__item-item'>
                            {/* <div className="header-start">Начать</div> */}
                            <div className="header-timer" onClick={() => setActiveTimer(!activeTimer)}>
                                <img src={timer} alt="timer" />
                            </div>
                            <div onClick={() => setActiveCalendar(!activeCalendar)} className="header-calendar"><img src={calendar} alt="calendar" /></div>
                        </div>
                    </div>

                    <Button onClick={() => logOut()} className="header-nav__btn btn" style={{border: 'none'}}>Выйти</Button>
                </nav>
                <div className='header-nav__item mobile'>
                    <div className="header-day">
                        {
                             dateTraining.getDate() === dateToday ?
                             "Сегодня"
                             :
                             `${dateTraining.getDate()} ${monthNames[dateTraining.getMonth()]}`
                        }   
                    </div>
                    <div className='header-nav__item-item'>
                        <div className="header-timer" onClick={() => setActiveTimer(!activeTimer)}>
                            <img src={timer} alt="timer" />
                        </div>
                        <div onClick={() => setActiveCalendar(!activeCalendar)} className="header-calendar"><img src={calendar} alt="calendar" /></div>
                    </div>
                </div>
            </div>
        </header>
        <Menu menuItems={menuItems} active={active} setActive={setActive}/>
        </>
    )
})

export default Header;