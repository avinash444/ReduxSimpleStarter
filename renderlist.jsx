import React from 'react';
import Thumbnail from './Thumbnail';

const RenderList = ({list,sortType}) => {
  const renderList = (list,sortType) => {
     let listArray = [];
    if(sortType === 'low') {
      listArray = list.sort((a,b) => a.retailPrice  - b.retailPrice);
    }else if (sortType === 'high') {
      listArray  = list.sort((a,b) => b.retailPrice - a.retailPrice);
    } else {
      listArray = list;
    }
    return listArray

  }

  return (
    <div>
      {
        renderList(list,sortType).map((item,index) => {
        return (
          <div key={'el_'+index} className="col-m-4 u_mar3">
            <Thumbnail className="eachList v-pannel flt-wth" src={item.imgUrl}>
              <div className="u_font12">{item.brandName}</div>
              <div className="u_font14 text-wrap u_wdth95p u_fontW400">{item.name}</div>
              <div className="u_font14 u_fontWb">{item.retailPrice}</div>
            </Thumbnail>
          </div>
        )
      })
    }
    </div>
  )
}

export default RenderList;
