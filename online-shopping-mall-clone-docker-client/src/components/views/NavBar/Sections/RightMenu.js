/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Icon from '@ant-design/icons';
import { Menu, Badge } from 'antd';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../../../../_actions/user_actions';

function RightMenu(props) {
  const dispatch = useDispatch();
  //вытаскиваем из store всю информацию об авторизованном пользователе
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    //удаляем токен авторизованного пользователя
    window.localStorage.removeItem('token');
    //переход на страницу авторизации пользователя
    props.history.push("/login");
    //делаем запрос на удаление данных из хранилища store по авторизованному пользователю
    dispatch(auth());
  };

  if (user.userData && !user.userData.isAuth) {
    //случай, когда пользователь неавторизован или незарегистрирован
    return (
      <Menu mode={props.mode}>
        {/*Переход на страницу авторизации пользователя */}
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        {/*Переход на страницу регистрации пользователя */}
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        {/*Переход на страницу формирования нового товара по фотографии авторизованным пользователем */}
        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>

        {/*Переход на страницу показа корзины товаров, выбранных авторизованным пользователем */}
        <Menu.Item key="cart">
          {/*user.userData.cart.length количество товаров в корзине */}
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{marginRight: -22, color: "#667777"}}>
              <Icon type="shopping-cart" style={{fontSize: 30, marginBottom: 4}}/>
            </a>
          </Badge>
        </Menu.Item>

        {/*Переход на страницу очистки данных по авторизованному пользователю */}
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);