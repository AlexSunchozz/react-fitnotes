import './app.scss'
import exercise from './icons/exercise.png';
import program from './icons/program.png';
import calc from './icons/calc.png';
import stat from './icons/statistic.png';
import start from './icons/start.png';
import Menu from '../menu/menu';
import timer from './icons/timer.png';
import calendar from './icons/calendar.png'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {MainPage} from '../pages';
import {useState} from 'react';

const menuItems = [
    {
        name: "Начать тренировку", 
        href: "/", 
        icon: start,
        alt: 'start',
        focus: true
    },
    {
        name: "Упражнения", 
        href: "/exercises", 
        icon: exercise,
        alt: 'exercises',
        focus: false
    },
    {
        name: "Мои тренировки", 
        href: "/trainings", 
        icon: program,
        alt: 'trainings',
        focus: false
    },
    {
        name: "Калькулятор", 
        href: "/calculating", 
        icon: calc,
        alt: 'calculation',
        focus: false
    },
    {
        name: "Статистика", 
        href: "/statistics", 
        icon: stat,
        alt: 'statistic',
        focus: false
    },
]

const App = () => {
    const [active, setActive] = useState(false);

    return (  
        <Router>
            <div className='wrapper'>
                <header className="header">
                    <div className="container">
                        <nav className="header-nav">
                            <div className="header-nav__burger" onClick={() => setActive(!active)}>
                                <span></span>
                            </div>
                            <div className='header-nav__item desktop'>
                                <div className="header-day">Сегодня</div>
                                <div className='header-nav__item-item'>
                                    {/* <div className="header-timer"><img src={timer} alt="timer" /></div> */}
                                    <div className="header-start">Начать</div>
                                    <div className="header-calendar"><img src={calendar} alt="calendar" /></div>
                                </div>
                            </div>
                            <a className="header-nav__btn btn" href="#" role="button">Выйти</a>
                        </nav>
                        <div className='header-nav__item mobile'>
                                <div className="header-day">Сегодня</div>
                                <div className='header-nav__item-item'>
                                    {/* <div className="header-timer"><img src={timer} alt="timer" /></div> */}
                                    <div className="header-start">Начать</div>
                                    <div className="header-calendar"><img src={calendar} alt="calendar" /></div>
                                </div>
                            </div>
                    </div>
                    <Menu active={active} setActive={setActive} menuItems={menuItems}/>
                </header>
                <main className='main'>
                    <Routes>
                        <Route exact path="/" element={<MainPage/>}></Route>
                        {/* <Route path='/exercises' element={<Exercises/>}></Route> */}
                        {/* <Route path='/trainings' element={<Trainings/>}></Route> */}
                    </Routes>
                </main>
            </div> 
        </Router>
    );
}

export default App;