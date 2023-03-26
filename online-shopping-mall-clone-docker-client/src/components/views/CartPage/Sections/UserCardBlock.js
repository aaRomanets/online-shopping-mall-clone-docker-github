import React from 'react'

//компонент показа полной информации о странице товаров авторизованного пользователя
function UserCardBlock(props) {
    //функция вывода изображения товара из указанной корзины
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0];
            return `http://localhost:4022/${image}`
        }
    }

    //функция вывода всех товаров из указанной корзины
    const renderItems = () => (
        //предварительно проверяем существование указанных товаров в props
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td>
                    {/*Изображение товара */}
                    <img 
                        style={{ width: '70px' }} 
                        alt="product"  
                        src={renderCartImage(product.images)} 
                    />
                </td> 
                {/*Количество единиц товара в указанной корзине */}
                <td>{product.quantity} EA</td>
                {/*Цена соответствующего товара */}
                <td>$ {product.price} </td>
                <td>
                    {/*Кнопка удаления всех единиц указанного товара из корзины */}
                    <button 
                        onClick = {() => props.removeItem(product._id)}
                    >
                        Remove 
                    </button> 
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                {/*Заголовок страницы вывода всех товаров корзины */}
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                {/*Осуществление самого вывода товаров в указанной корзине */}
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock;