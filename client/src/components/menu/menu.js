import { useContext, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../menu/menu.scss';
import { useLocation } from 'react-router-dom';

const Menu = ({active, setActive, menuItems}) => {

    const location = useLocation();

    return(
        <div className={active ? "header-menu active" : "header-menu"}>
            <div className="header-menu__burger" onClick={() => setActive(!active)}>
                <span></span>
                <span></span>
            </div>
            <div className={active ? "blur active" : "blur"} onClick={() => setActive(!active)}></div>
            <ul className="header-menu__list menu-list">
                {menuItems.map((item, i) => 
                    <li key={i} 
                        className={item.href === location.pathname ? "menu-list__item active" : 
                        "menu-list__item"}>
                        <NavLink exact activeStyle={{color:'#c43def'}} to={item.href}>
                            <div className="menu-list__item-icon"><img src={item.icon} alt={item.alt}/></div>
                            <div className="menu-list__item-text">{item.name}</div>
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Menu;