import {
  Product_List,
  Is_Loading,
  Brand_Filter,
  Price_Filter
} from './types';

import {ProductJson} from '../productjson';

export function fetchProductList() {
  return {
    type:Product_List,
    payload:updateFilterJson(ProductJson)
  }
}

export function filterBrandData(fltDat,data) {
  return {
    type:Brand_Filter,
    payload:filterBrndDat(fltDat,data)
  }
}

function filterBrndDat(fltDat,data) {
  let newData = [];
  let isPriceFlt = false;
  let isBrndFlt = false;

  data.baseData.forEach((item) => {
    let brandName = item.brandName.replace(/[^\w]/g,'');
    let priceGroup = item.priceGroup.replace(/[^\w]/g,'');
    if(fltDat['brand'].length === 0 || fltDat['brand'].indexOf(brandName) !== -1) {
      isBrndFlt = true;
    } else {
      isBrndFlt = false;
    }
    if(fltDat['price'].length === 0 || fltDat['price'].indexOf(priceGroup) !== -1) {
      isPriceFlt = true;
    } else {
      isPriceFlt = false;
    }
    if(isBrndFlt && isPriceFlt) {
      newData.push(item);
    }
  })

  data.records = newData;

  return data;
}

function updateFilterJson (data) {
  let BrandFilter = getBrandData(data);

  data['baseData'] = data.records;
  let price = data.records.map((item) => item.retailPrice);
  let sortedArr = price.sort((a,b) => a - b)
  let midPoint = Math.floor(sortedArr.length/2);
  let firstMidPoint = Math.floor(midPoint/2);
  let secondMidPoint = midPoint + firstMidPoint;

  let priceFilter = getPriceData(sortedArr,midPoint,firstMidPoint,secondMidPoint);

  data['brandFilter'] = BrandFilter;
  data['priceFilter'] = priceFilter;

  let dataJson = updateDataJson(data,sortedArr,midPoint,firstMidPoint,secondMidPoint);

   return dataJson;
}
function updateDataJson(data,sortedArr,midPoint,firstMidPoint,secondMidPoint) {
    data.records.forEach((item) => {
      if(item.retailPrice >= sortedArr[0] && item.retailPrice <= sortedArr[firstMidPoint]) {
        item['priceGroup'] = 'cheap';
      } else if(item.retailPrice >= sortedArr[firstMidPoint] && item.retailPrice <= sortedArr[midPoint]) {
        item['priceGroup'] = 'low';
      }else if (item.retailPrice >= sortedArr[midPoint] && item.retailPrice <= sortedArr[secondMidPoint]) {
        item['priceGroup'] = 'medium';
      }else if (item.retailPrice >= sortedArr[secondMidPoint] && item.retailPrice <= sortedArr[sortedArr.length - 1]) {
          item['priceGroup'] = 'high';
      }
    })

    return data;
}
function getPriceData(sortedArr,midPoint,firstMidPoint,secondMidPoint) {

  let priceObj1 = constructPriceObj(sortedArr[0],sortedArr[firstMidPoint],'cheap');
  let priceObj2 = constructPriceObj(sortedArr[firstMidPoint],sortedArr[midPoint],'low');
  let priceObj3 = constructPriceObj(sortedArr[midPoint],sortedArr[secondMidPoint],'medium');
  let priceObj4 = constructPriceObj(sortedArr[secondMidPoint],sortedArr[sortedArr.length - 1],'high');
  let priceArr = [];
  priceArr.push(priceObj1,priceObj2,priceObj3,priceObj4);

  return priceArr;
}
function constructPriceObj(min,max,priceGroup) {
  return {
    range: min +'-'+max,
    min,
    max,
    isChecked:false,
    priceGroup
  }
}
function getBrandData(data) {
  let brandObj = {};
  let brandArr = [];
  data.records.forEach((dt) => {
    let brandName = dt.brandName.replace(/[^\w]/g,'');
    if(!brandObj[brandName]) {
      brandObj[brandName] = {};
      brandObj[brandName]['name'] = brandName;
      brandObj[brandName]['numRslt'] = 1;
      brandObj[brandName]['isChecked'] = false;
      brandArr.push(brandObj[brandName]);
    } else {
      brandObj[brandName]['numRslt'] = brandObj[brandName]['numRslt'] + 1;
    }
  })

  return brandArr;

}
