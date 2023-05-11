import { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../menu/menu.scss';

const Menu = ({active, setActive, menuItems}) => {

    const menuItemsRef = useRef([]);

    const focusOnItem = (id) => {
        console.log(id)
        if (id === 0) {
            menuItemsRef.current[id].classList.add('active');
        }
        menuItemsRef.current.forEach(item => item.classList.remove('active'));
        menuItemsRef.current[id].classList.add('active');
    }

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
                        ref={item => menuItemsRef.current[i] = item} 
                        className={i === 0 ? "menu-list__item active" : "menu-list__item"}
                        onClick={() => {
                            focusOnItem(i);
                        }}>
                        <NavLink end style={({ isActive }) => ({color: isActive ? '#c43def' : 'white'})} to={item.href}>
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