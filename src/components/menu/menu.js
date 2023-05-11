import '../menu/menu.scss';

const Menu = ({header, menuItems}) => {
    return(
        <div className={active ? 'menu active': 'menu'}>
            <div className="menu-img"><img src={header} alt="fitlog" /></div>
            <div className="menu-list">
                <ul className="menu-item-list">
                {
                    menuItems.map(item => 
                        <li className="menu-item-list__item">
                            <div className="menu-item-list__item-img"><img src={item.icon} alt={item.alt} /></div>
                            <div className="menu-item-list__item-text"><a href={item.href}>{item.name}</a></div>
                        </li>
                    )
                }
                </ul>
            </div>
        </div>

    )
}

export default Menu;