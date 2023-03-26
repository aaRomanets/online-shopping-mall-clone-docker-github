import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import authFunction from "../hoc/auth";

// вытаскиваем страницы и компоненты для этого проекта
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      {/*Заглавный блок перехода по страницам */}
      {/*Capital page navigation block */}
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          {/*Центральная страница */}
          <Route exact path="/" component={authFunction(LandingPage)} />
          {/*Страница авторизации пользователя */}
          <Route exact path="/login" component={authFunction(LoginPage)} />
          {/*Страница регистрации пользователя */}
          <Route exact path="/register" component={authFunction(RegisterPage)} />
          {/*Страница формирования нового товара авторизованным пользователя */}
          <Route exact path="/product/upload" component={authFunction(UploadProductPage)} />
          {/*Страница добавления товара авторизированного пользователя в корзину */}
          <Route exact path="/product/:productId" component={authFunction(DetailProductPage)} />
          {/*Страница показа корзины товаров авторизированного пользователя */}
          <Route exact path="/user/cart" component={authFunction(CartPage)} />
        </Switch>
      </div>
       {/*Заключительный блок */}
      <Footer />
    </Suspense>
  );
}

export default App;