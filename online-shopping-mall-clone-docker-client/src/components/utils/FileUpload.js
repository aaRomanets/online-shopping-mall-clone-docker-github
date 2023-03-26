import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import Icon from '@ant-design/icons';
import axios from '../../axios.js';

//страница загрузки и удаления изображений товара
function FileUpload(props) {
    const [Images, setImages] = useState([]);

    //функция загрузки изображения files[0] с компьютера
    const onDrop = (files) => {        
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        if (files) {formData.append("file", files[0])};

        //запрос на запись изображения которое мы будем выбирать внутри Node Server
        axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    //фиксируем изображения товара
                    setImages([...Images, response.data.image]);
                    //отправляем все изображения товара по месту назначения
                    props.refreshFunction([...Images, response.data.image]);
                } else {
                    alert("Failed to save the Image in Server")
                }
        })
    }

    //функция удаления лишнего изображения товара
    const onDelete = (image) => {
        //удаляем выбранное изображение товара из списка всех его изображений
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images];
        newImages.splice(currentIndex, 1);

        //фиксируем изображения товара
        setImages(newImages);
        //отправляем все изображения товара по месту назначения
        props.refreshFunction(newImages);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {/*Зона перемещения изображений товара с веб-страницы на экран компьютера */}
            <Dropzone onDrop={onDrop} multiple={false} maxSize={8000000} >
                {({getRootProps, getInputProps}) => {
                    return (
                        <div style={{width:'300px', height: '240px', border: '1px solid lightgray', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                    {...getRootProps()}
                        >
                            <input {...getInputProps()} /> 
                            <Icon type="plus" style={{fontSize: '3rem'}}/>                       
                        </div>
                    )
                }}
            </Dropzone>

            {/*Выводим изображения товаров */}
            <div style={{display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
                {Images.map((image,index) => {
                    return (    
                        <div onClick={() => onDelete(image)}>
                            <img 
                                style={{minWidth: '300px', width: '300px', height: '240px'}} 
                                src={`http://localhost:4022/${image}`} 
                                alt={`productImg-${index}`}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FileUpload;