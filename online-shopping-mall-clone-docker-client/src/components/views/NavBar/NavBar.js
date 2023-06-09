import React from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';

import './Sections/Navbar.css';

function NavBar() {

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      {/*Переход на центральную страницу */}
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        {/*Менюшки с левой стороны */}
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        {/*Менюшки с правой стороны */}
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
      </div>
    </nav>
  )
}

export default NavBar;