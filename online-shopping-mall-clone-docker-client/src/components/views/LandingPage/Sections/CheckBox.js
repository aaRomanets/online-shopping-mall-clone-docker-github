import React, {useState} from 'react'
import { Checkbox, Collapse } from 'antd';

const {Panel} = Collapse;

//страница показа галочек со странами изготовления товаров
function CheckBox(props) {

    const [Checked, setChecked] = useState([]);

    //активируем каждую галочку
    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value); 
        const newChecked   = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        //галочка активирована
        setChecked(newChecked);
        //активацию каждой галочки отправляем по месту назначения
        props.handleFilters(newChecked)
    }

    // устанавливаем список галочек
    const renderCheckboxLists = () => {
        return (
            props.list && props.list.map((value, index) => (
                <React.Fragment key={index}>
                    {/* Сама галочка */}
                    <Checkbox
                        onChange = {() => handleToggle(value._id)}
                        type="checkbox"
                        checked={Checked.indexOf(value._id) === -1 ? false : true}
                    />
                    {/* Название галочки */}
                    <span>{value.name}</span>
                </React.Fragment>
            ))
        )
    }

    return (
        //сам список галочек
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox;