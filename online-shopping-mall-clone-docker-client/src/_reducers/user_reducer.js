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
} from '../_actions/types';
 

function user_reducer(state={},action){
    switch(action.type){
        //вытаскиваем данные из store по метке REGISTER_USER
        case REGISTER_USER:
            return {...state, register: action.payload }
        //вытаскиваем данные из store по метке LOGIN_USER
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        //вытаскиваем данные из store об авторизованном пользователе по метке AUTH_USER
        case AUTH_USER:
            return {...state, userData: action.payload }
        //из store вытаскиваем результат, полученный в результате применения запроса по метке  ADD_TO_CART_USER
        //и формируем полную корзину товаров по авторизованному  пользователю
        case ADD_TO_CART_USER:
            return {
                ...state, userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }
        //из store вытаскиваем результат, полученный в результате применения запроса по метке GET_CART_ITEMS_USER
        case GET_CART_ITEMS_USER: {
            return {...state, cartDetail: action.payload}            
        }
        //из store вытаскиваем результат, полученный в результате применения запроса по метке REMOVE_CART_ITEM_USER
        case REMOVE_CART_ITEM_USER: {
            return {
                ...state,
                //полная информация об оставшихся товарах в корзине авторизованного пользователя
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    //серии оставшихся одинаковых товаров в корзине авторизованного пользлователя
                    cart: action.payload.cart                    
                }                
            }
        }
        default:
            return state;
    }
}

export default user_reducer;