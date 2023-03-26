import React, {useState} from 'react'
import {Collapse, Radio} from 'antd'
const {Panel} = Collapse;

//страница показа Radio кнопок, характеризующих диапазоны цен товаров
function RadioBox(props) {

    const [Value, setValue] = useState('0');

    //устанавливаем список Radio кнопок по соответствующим именам из props
    const renderRadioBox = () => (
        props.list && props.list.map((value) => (
            <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
        ))
    )

    //функция изменения состояния каждой Radio кнопки
    const handleChange = (event) => {
        setValue(event.target.value);
        //состояние соответствующей Radio кнопки через props отправляем по месту назначения
        props.handleFilters(event.target.value )
    }

    return (
        //сам список Radio кнопок
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="price" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox;