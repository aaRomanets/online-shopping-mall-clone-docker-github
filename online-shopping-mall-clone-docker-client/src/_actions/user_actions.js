import axios from '../axios.js';
import {
    //вытаскиваем метку авторизации пользователя
    LOGIN_USER,
    //вытаскиваем метку регистрации пользователя
    REGISTER_USER,
    //вытаскиваем метку запроса на проверку существования авторизованного пользователя
    AUTH_USER,
    //вытаскиваем метку запроса на добавление нового товара в корзину авторизованного пользователя
    ADD_TO_CART_USER,
    //вытаскиваем метку запроса на получение полной информации о всех товарах в корзине авторизованного пользователя
    GET_CART_ITEMS_USER,
    //вытаскиваем метку запроса на удаление серии одинаковых товаров в корзине авторизованного пользователя
    REMOVE_CART_ITEM_USER 
} from './types';

//функция запроса на регистрацию пользователя
export function registerUser(dataToSubmit){
    const request = axios.post(`/api/users/register`,dataToSubmit).then(response => response.data);
    //данные которые помещаются в store, полученные в результате применения указанного запроса
    return {
        type: REGISTER_USER,
        payload: request
    }
}

//функция запроса на авторизацию пользователя
export function loginUser(dataToSubmit){
    const request = axios.post(`/api/users/login`,dataToSubmit).then(response => response.data);
    //данные которые помещаются в store, полученные в результате применения указанного запроса
    return {
        type: LOGIN_USER,
        payload: request
    }
}

//функция запроса на проверку существования авторизованного пользователя
export function auth(){
    const request = axios.get(`/api/users/auth`).then(response => response.data);
    //полученные данные об авторизованном пользователе, которые помещаются в store 
    return {
        type: AUTH_USER,
        payload: request
    }
}

//функция запроса на добавление нового товара по авторизованному пользователю
export function addToCart(_id) {
    const request = axios.get(`/api/users/addToCart?productId=${_id}`).then(response => response.data);
    //данные которые помещаются в store, полученные в результате применения указанного запроса
    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}

//функция запроса на получение информации о товарах в корзине авторизованного пользователя по их идентификаторам
export function getCartItems(cartItems, userCart) {
    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        //устанавливаем правильное количество товаров в корзине
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })
            return response.data;
        });

    //данные которые помещаются в store, полученные в результате применения указанного запроса
    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}

//функция запроса на удаление серии одинаковых товаров в корзине авторизованного пользователя
export function removeCartItem(id) {
    const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k,i) => {
                    if (item.id === k._id) {
                        //устанавливаем правильное количество товаров в корзине
                        response.data.cartDetail[i].quantity = item.quantity;
                    }
                })
            })
            return response.data;
        });
    //данные которые помещаются в store, полученные в результате применения указанного запроса
    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}
