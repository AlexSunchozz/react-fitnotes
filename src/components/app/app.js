import './app.scss'
import headerImg from './header.jpeg';
import exercise from './gantel.png';
import program from './program.svg';
import calc from './calc.png';
import stat from './stat.png';

const menuItems = [
    {
        name: "Упражнения", 
        href: "/", 
        icon: exercise,
        alt: 'exercises'
    },
    {
        name: "Программы", 
        href: "/", 
        icon: program,
        alt: 'programs'
    },
    {
        name: "Калькулятор", 
        href: "", 
        icon: calc,
        alt: 'calculation'
    },
    {
        name: "Статистика", 
        href: "/", 
        icon: stat,
        alt: 'statistic'
    },
]

const App = () => {

    return (  
        <div className='wrapper'>
            <header className="header">
                <div className="container">
                    <nav className="nav">
                        <div className="nav-burger">
                            <span></span>
                        </div>
                        <a className="btn" href="#" role="button">Выйти</a>
                    </nav>
                </div>
            </header>
            
        </div> 
    );
}

export default App;