import React from 'react'
import {Carousel} from 'antd'

//Слайдер показа изображений каждого товара скаченного с сервера
function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image,index) => (
                    <div>
                        <img 
                            style={{width: '100%', height: '300px'}} 
                            src={`http://localhost:4022/${image}`} 
                            alt="productImage" 
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider;