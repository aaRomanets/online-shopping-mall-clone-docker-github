import { combineReducers } from 'redux';
import user from './user_reducer';

//полный редюсер
const rootReducer = combineReducers({
    user,
});

export default rootReducer;