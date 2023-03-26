import React, { useEffect, useState, useCallback} from 'react'
//вытаскиваем хук useDiapatch
import { useDispatch } from 'react-redux';
import { 
    //вытаскиваем функцию запроса на получение информации о товарах в корзине авторизованного пользователя по их идентификаторам
    getCartItems,
    //вытаскиваем функцию запроса на удаление серии одинаковых товаров в корзине авторизованного пользователя  
    removeCartItem
} from '../../../_actions/user_actions';

//Вытаскиваем компонент показа самих товаров в корзине
import UserCardBlock from './Sections/UserCardBlock';
import { Empty} from 'antd' 
import axios from '../../../axios.js';

function CartPage(props) {
    const dispatch = useDispatch();
    //Полная стоимость товаров в корзине авторизованного пользователя
    const [Total, setTotal] = useState(0);
    //Флаг показа полной стоимости товаров в корзине
    const [ShowTotal, setShowTotal] = useState(false);

    useEffect(() => {   
        //задаем массив идентификаторов товаров во всей корзине авторизованного пользователя   
        let cartItems = [];
        
        //props.user.userData - полная информация об авторизованном пользователе 
        //props.user.userData.cart - полная информация о корзине товаров авторизованного пользователя
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {  
                //составляем массив идентификаторов товаров во всей корзине авторизованного пользователя        
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                //осуществляем запрос на получение информации о товарах в корзине авторизованного пользователя по их идентификаторам
                dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }
    }, [props.user.userData, dispatch])

    //функция расчета полной стоимости товаров по всей корзине авторизованного пользователя
    const calculateTotal = useCallback(
        (cartDetail) => 
        {
            //считаем полную стоимость товаров по всей корзине авторизованного пользователя
            let total = 0;
            cartDetail && cartDetail.forEach(item => {
                if (item.quantity !== undefined){
                    total += parseInt(item.price, 10) * item.quantity;
                }
            })
    
            if (total > 0) {
                //фиксируем полную стоимость товаров по всей корзине авторизованного пользователя
                setTotal(total)
            }
            //активируем флаг показа полной стоимости товаров по всей корзине авторизованного пользователя
            setShowTotal(true)
        },
        []
    );

    useEffect(() => {
        if (props.user.cartDetail && props.user.cartDetail.length > 0) {
            //запускаем расчет полной стоимости товаров по всей корзине
            calculateTotal(props.user.cartDetail)
        }
    }, [props.user.cartDetail, calculateTotal])

    //производим процесс удаления серии одинаковых товаров в корзине авторизованного пользователя
    const removeFromCart = (productId) => {
        //осуществляем запрос на удаление серии одинаковых товаров в корзине авторизованного пользователя
        dispatch(removeCartItem(productId))
        .then(() => {
            //осуществляем запрос на получение содержимого в корзине авторизованного пользователя
            axios.get('/api/users/userCartInfo')
                .then(response => {
                    //указанный запрос оказался успешным
                    if (response.data.success) 
                    {
                        if (response.data.cartDetail.length <= 0) {
                            //корзина авторизованного пользователя оказалась пустой
                            setShowTotal(false)
                        } 
                        else 
                        {
                            //корзина авторизованного пользователя не пустая, считаем полную стоимость оставшихся в ней товаров
                            calculateTotal(response.data.cartDetail)
                        }
                    }
                    else
                    //указанный запрос оказался не успешным 
                    {
                        alert('Failed to get cart info')
                    }
                })
        })
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <div>
                {/*компонент показа самих товаров в корзине */}
                <UserCardBlock 
                    //сами товары в корзине
                    products={props.user.cartDetail}
                    //функция удаления товаров из корзины
                    removeItem={removeFromCart}
                />

                {ShowTotal ?
                    //выводим полную стоимость товаров во всей корзине авторизованного пользователя
                    <div style={{marginTop: '3rem'}}>
                        <h2>Total amount: ${Total}</h2>
                    </div>
                    :
                    //товаров в корзине авторизованного пользователя нет
                    <div style={{
                        width: '100%', display: 'flex', flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <br/>
                        <Empty description={false}/>
                        <p>No Items In the Cart</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default CartPage;