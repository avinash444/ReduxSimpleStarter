import { combineReducers } from 'redux';
import ListReducer from './listreducer';
const rootReducer = combineReducers({
  dataList:ListReducer
});

export default rootReducer;
