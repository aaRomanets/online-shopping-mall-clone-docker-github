import React from 'react';
import { Menu } from 'antd';

//левые меню
function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    {/*Переход на центральную страницу */}
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu