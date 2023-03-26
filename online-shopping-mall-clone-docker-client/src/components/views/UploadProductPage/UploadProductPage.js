import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
//вытаскиваем страницу загрузки файла как на сервер так и на клиентское приложение
import FileUpload from '../../utils/FileUpload'
import axios from '../../../axios.js';

const { Title } = Typography;
const { TextArea } = Input;

//список стран, которые имеют отношение к изготовлению товаров
const Continents = [
    {key: 1, value: "Africa"},
    {key: 2, value: "Europe"},
    {key: 3, value: "Asia"},
    {key: 4, value: "North America"},
    {key: 5, value: "South America"},
    {key: 6, value: "Australia"},
    {key: 7, value: "Antarctica"}
]

//страница создания нового товара авторизованным пользователем
function UploadProductPage(props) {

    //название нового товара
    const [TitleValue, setTitleValue] = useState("");
    //описание нового товара
    const [DescriptionValue, setDescriptionValue] = useState("");
    //цена нового товара
    const [PriceValue, setPriceValue] = useState(0);
    //страна изготовления нового товара
    const [ContinentValue, setContinentValue] = useState(1);

    //Изображения нового товара
    const [Images, setImages] = useState([]);

    //фиксируем название товара
    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value);
    }

    //фиксируем описание товара
    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value);
    }

    //фиксируем цену товара
    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value);
    }

    //фиксируем страну изготовления товара
    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    //фиксируем изображения нового товара
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    //действие осуществления запроса по загрузке нового товара на сервер
    const onSubmit = (event) => {
        event.preventDefault();

        if (!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        } 

        //данные о товаре выбранном авторизованным пользователем
        const variables = {
            //идентификатор пользователя, который выбрал товар
            writer: props.user.userData._id,
            //название товара
            title: TitleValue,
            //описание товара
            description: DescriptionValue,
            //цена товара
            price: PriceValue,
            //изображения товара
            images: Images,
            //страна изготовления товара
            continents: ContinentValue
        }

        //запрос на загрузку нового товара на сервер в модель товаров по базе данных MongoDb
        axios.post('/api/product/uploadProduct', variables).then(response => {
            if (response.data.success) 
            {
                //загрузка нового товара на сервер прошла успешно
                alert('Product Successfully Uploaded');
                props.history.push('/');
            } 
            else 
            {
                //загрузка нового товара на сервер не удалась
                alert('Failed to upload Product')
            }
        })
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style = {{textAlign:'center', marginBottom: '2rem'}}>
                <Title level={2}>Upload Travel Product</Title>
            </div>
            
            <Form onSubmit={onSubmit}>
                {/* Сюда загружаем изображение товара */}
                <FileUpload refreshFunction={updateImages}/>
                {/* Поле ввода названия товара */}
                <br/>
                <br/>
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br/>
                <br/>
                {/* Поле ввода описания товара */}
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br/>
                <br/>
                {/* Поле задания цены товара */}
                <label>Price($)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number" 
                />
                <br/>
                <br/>
                {/* Список выбора страны изготовления товара */}
                <select onChange={onContinentsSelectChange}>
                    {Continents.map(item  => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br/>
                <br/>

                {/* Кнопка осуществления запроса на загрузку нового товара на сервер */}
                <Button
                    onClick = {onSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage;