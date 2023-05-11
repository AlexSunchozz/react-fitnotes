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
        icon: exercise
    },
    {
        name: "Программы", 
        href: "/", 
        icon: program
    },
    {
        name: "Калькулятор", 
        href: "", 
        icon: calc
    },
    {
        name: "Статистика", 
        href: "/", 
        icon: stat
    },
]

const App = () => {

    return (  
        <div className='wrapper'>
            <header className="header">
                <div className="container">
                    <nav className="nav">
                        <div className="burger">
                            <span></span>
                        </div>
                        <a class="btn btn-outline-success" href="#" role="button">Выйти</a>
                    </nav>
                </div>
            </header>
        </div> 
    );
}

export default App;