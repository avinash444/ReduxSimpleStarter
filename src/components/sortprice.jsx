import React from 'react';
const SortPrice = ({handleSortType,sortObj}) => {
  const handlePriceSorting = (type) => {
    handleSortType(type);
  }
  return (
    <div className="sortBase">
      <div className="u_font14 u_pad8 u_clLtGrey">sortBy :</div>
      <div className={sortObj['priceLow'] ? 'activeClass priceLow u_font14 u_pad8 u_clLtGrey u_cursPoint':'priceLow u_font14 u_pad8 u_clLtGrey u_cursPoint' } onClick={(e) => handlePriceSorting('priceLow',e)}>Lowest Price</div>
      <div className={sortObj['priceHigh'] ? 'activeClass priceHigh u_font14 u_pad8 u_clLtGrey u_cursPoint':'priceHigh u_font14 u_pad8 u_clLtGrey u_cursPoint'} onClick={(e) => handlePriceSorting('priceHigh',e)}>Highest Price</div>
    </div>
  )
}
export default SortPrice
