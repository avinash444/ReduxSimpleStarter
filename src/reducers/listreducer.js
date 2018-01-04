import {Product_List,Is_Loading,Brand_Filter} from '../actions/types';
const INTIAL_STATE = {isLoading:false}
export default function(state=INTIAL_STATE,action) {
  switch (action.type) {
    case Is_Loading:
     return Object.assign({},state,isLoading:true)
    case Product_List:
      return Object.assign({},state,chunk(action.payload,20),state['isLoading']:false)
    case Brand_Filter:
      return Object.assign({},state,chunk(action.payload,20),state['isLoading']:false)
    default:
      return state
  }
}

function chunk(object,size) {
  let record = object.records;
  if(!record.length) {
    return object
  }

  let index = 0;
  let chunk = [];

  while(index <= record.length){
    chunk.push(record.slice(index,index + size));
    index += size;
  }

 object.records = chunk

 return object;
}
