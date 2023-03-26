import React, {useEffect, useState} from 'react'
import axios from '../../../axios.js'
import {Col, Row} from 'antd'

//вытаскиваем компонент показа изображения товара 
import ProductImage from './Sections/ProductImage';
//вытаскиваем компонент показа детальной информации о товаре 
import ProductInfo from './Sections/ProductInfo';
//вытаскиваем функцию осуществления запроса по серверу на добавление товара в корзину товаров по авторизованному пользователю
import {addToCart} from '../../../_actions/user_actions';
//вытаскиваем хук useDispatch 
import {useDispatch} from 'react-redux'

//страница вывода детальной информации о товаре
function DetailProductPage(props) {
    const dispatch = useDispatch();
    //вытаскиваем идентификатор товара
    const productId = props.match.params.productId;
    //скаченный товар по идентификатору productId
    const [Product, setProduct] = useState([]);

    useEffect(() => {
        //запрос на скачивание с сервера информации о товаре с идентификатором productId
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(response => {
            //фиксируем скаченную информацию об указанном товаре в случае успешного запроса
            setProduct(response.data[0])
        })
    }, [productId])

    //добавляем товар в корзину авторизованного пользователя
    const addToCartHandler = (productId) => {
        //осуществляем запрос по серверу на добавление товара в корзину товаров по автоизованному пользователю
        dispatch(addToCart(productId))
    }

    return (
        <div className="postPage" style={{width: '100%', padding: '3rem 4rem'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {/*Название товара */}
                <h1>{Product.title}</h1>
            </div>
            <br/>
            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    {/*Показываем изображения товара */}
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={12} xs={24}>
                    {/*Показываем детальную информацию о товаре */}
                    <ProductInfo
                        //функция добавления товара в корзину авторизованного пользователя
                        addToCart={addToCartHandler} 
                        //детальная инфомация о товаре
                        detail={Product}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage;