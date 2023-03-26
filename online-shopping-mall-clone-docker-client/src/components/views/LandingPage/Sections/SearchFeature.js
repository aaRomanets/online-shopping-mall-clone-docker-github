import React, {useState} from 'react'
import {Input} from 'antd'

const {Search} = Input;

//компонент задания текстовой метки для поиска товаров на сервере
function SearchFeature(props) {

    //требуемая метка
    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        //фиксируем требуемую метку
        setSearchTerms(event.currentTarget.value);
        //отправляем требуемую метку через props в место назначения
        props.refreshFunction(event.currentTarget.value);
    }

    return (
        <div>
            <Search
                value = {SearchTerms}
                onChange = {onChangeSearch}
                placeholder="Search By Typing..."
            />
        </div>
    )
}

export default SearchFeature;