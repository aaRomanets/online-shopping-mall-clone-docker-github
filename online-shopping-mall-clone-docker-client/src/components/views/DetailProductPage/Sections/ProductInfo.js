import React, {useEffect, useState} from 'react'
import {Button, Descriptions} from 'antd'

//компонент показа полной информации о товаре
function ProductInfo(props) {
    //информация о товаре
    const [Product, setProduct] = useState({});

    useEffect(() => {
        //фиксируем информацию о товаре от props
        setProduct(props.detail)
    }, [props.detail])

    //добавляем товар в корзину авторизованного пользователя через функцию addToCart от props
    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }

    return (
        <div>
            <Descriptions title="Product Info">
                {/*Цена товара */}
                <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
                {/*Описание товара */}
                <Descriptions.Item label="Description">{Product.description}</Descriptions.Item>
            </Descriptions>
            <br/>
            <br/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {/*Кнопка добавления товара в корзину по авторизованному пользователю */}
                <Button size="large" shape="round" type="danger" onClick = {addToCarthandler}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo;