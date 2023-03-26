import React, {useEffect, useState, useCallback} from 'react'
import axios from '../../../axios.js'
import Icon from '@ant-design/icons';
import {Row, Col, Card} from 'antd'
import ImageSlider from '../../utils/ImageSlider'
//вытаскиваем страницу показа галочек со странами изготовления товаров
import CheckBox from './Sections/CheckBox'
//вытаскиваем страницу показа Radio кнопок, характеризующих диапазоны цен товаров
import RadioBox from './Sections/RadioBox'
//вытаскиваем списки стран и цен
import { continents, price } from './Sections/Datas'
//вытаскиваем компонент задания текстовой метки поиска товаров на сервере
import SearchFeature from './Sections/SearchFeature'
const {Meta} = Card;

function LandingPage() {
    //список товаров скаченных с сервера
    const [Products, setProducts] = useState([]);
    //сколько товаров нужно пропустить в базе данных на сервере перед их скачиванием с сервера
    const [Skip, setSkip]         = useState(0);
    //максимальное заданное количество товаров скачиваемых с сервера
    let Limit       = 6;
    const [PostSize, setPostSize] = useState();

    //Фильтрация товаров
    const [Filters, setFilters] = useState({
        //Товары распределяются по странам
        continents: [],
        //Товары распределяются по цене
        price: []
    })

    //получение товаров из базы данных на сервере, количество которых ограничено структурой variables
    const getProducts = useCallback(
        (variables) => 
        {
            axios.post('/api/product/getProducts', variables)
            .then(response => {
                //скачивание продуктов с сервера оказалось успешным
                if (response.data.success) {
                    if (variables.loadMore) {
                        //добавляем дополнительную партию скаченных с сервера товаров вдобавок к имеющимся
                        setProducts([...Products,...response.data.products]);
                    } else {
                        //фиксируем первую партию товаров скаченных с сервера
                        setProducts(response.data.products);
                    }
                    //фиксируем количество скаченных товаров
                    setPostSize(response.data.postSize);
                } else {
                    alert('Failed to fetch product datas')
                }
            })
        },
        [setProducts, Products]
    );

    useEffect(() => {
        const variables = {
            //сколько товаров пропускаем перед их скачиванием с сервера
            skip: Skip,
            //максимальное количество товаров, которое мы скачиваем с сервера
            limit: Limit
        }

        //делаем запрос на скачивание товаров по указанным параметрам
        getProducts(variables);
    }, [Skip, Limit, getProducts])

    //если мы хотим скачать с сервера еще больше товаров чем уже скачали
    const onLoadMore = () => {
        //столько товаров пропускаем перед их скачиванием с сервера
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            //этот флаг говорит о том, что скачиваем дополнительное количество товаров вдобавок к тому которое уже скачали
            loadMore: true
        }

        //делаем запрос на скачивание товаров по указанным параметрам
        getProducts(variables);

        //устанавливаем новое число товаров которое мы пропускаем перед их скачиванием с сервера
        setSkip(skip)
    }

    //изображаем карточки скаченных товаров
    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24}>
                {/*Изображения товара */}
                <Card
                    hoverable={true}
                    cover={
                        <a href={`/product/${product._id}`}>
                            {/*В этом слайдере выводим все изображения товара */}
                            <ImageSlider images={product.images}/>
                        </a>
                    }
                >
                    <Meta
                        //название товара
                        title = {product.title}
                        //цена товара
                        description = {`$${product.price}`}
                    />
                </Card>
            </Col>
        )
    })

    //функция показа скаченных товаров с учетом их фильтрации по ценам или странам
    const showFilteredResults = (filters) => {
        const variables = {
            //пропускаем столько товаров 
            skip: 0,
            //скачиваем такое максимальное количество товаров 
            limit: Limit,
            //массивы фильтрации товаров перед их скачиванием
            filters: filters
        }
        //запускаем процесс скачивания товаров
        getProducts(variables);
        //обнуляем количество товаров, которое пропускаем перед их скачиванием c сервера
        setSkip(0);
    }

    //функция определения диапазона цен по которому будем фильтровать товары, скачиваемые с сервера
    const handlePrice = (value) => {
        const data = price;

        let array  = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value,10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters};
        newFilters[category] = filters;

        if (category === "price") {
            //определяем диапазон цен по которому будем фильтровать товары, скачиваемые с сервера
            let priceValues = handlePrice(filters);
            //фиксируем диапазон цен по которому будем фильтровать товары, скачиваемые с сервера
            newFilters[category] = priceValues;
        }

        //показываем скаченные товары с учетом их фильтрации по ценам или странам
        showFilteredResults(newFilters);
        //фиксируем страны и диапазон цен на основании которого будем фильтровать товары скачиваемые с сервера
        setFilters(newFilters);
    }

    //функция показа скаченных товаров с учетом их фильтрации по ценам или странам и их метки поиска по названию или описанию
    const updateSearchTerms = (newSearchTerm) => {
        const variables = {
            //количество товаров, которое опускаем перед их скачиванием
            skip: 0,
            //скачиваем такое максимальное количество товаров 
            limit: Limit,
            //массивы фильтрации товаров перед их скачиванием
            filters: Filters,
            //метка фильтрации товаров по их названию или описанию
            searchTerm: newSearchTerm
        }
        //обнуляем количество скаченных товаров, которое пропускаем
        setSkip(0)
        //запускаем процесс скачивания товаров
        getProducts(variables)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{textAlign:'center'}}>
                <h2> Let's Travel Anywhere <Icon type="rocket"/></h2>
            </div>

            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    {/*Список стран по которым будем осуществлять фильтрацию скаченных с сервера товаров */}
                    <CheckBox
                        list={continents}
                        handleFilters={filters => handleFilters(filters,"continents")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    {/*Список диапазонов цен по которым будем осуществлять фильтрацию скаченных с сервера товаров */}
                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters,"price")}
                    />
                </Col>
            </Row>

            {/* Окно задания поиска нужного товара по его описанию */ }
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />
            </div>

            {/*Тут показываем уже скаченные товары, если они уже есть */}
            {Products.length === 0 ? 
                //Нет скаченных с сервера товаров
                <div  style={{display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
                    <h2>No post yet...</h2>
                </div>
                :
                //Есть скаченные с сервера товары
                <div>
                    <Row gutter={[16,16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br/><br/>

            {/*Если на сервере остались еще товары помимо тех которые были уже скачены то их также можно скачать */}
            {PostSize >= Limit && 
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }
        </div>
    )
}

export default LandingPage;