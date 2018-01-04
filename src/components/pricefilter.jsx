import React from 'react';

const priceFilter = ({priceFilter,handleInptFilter}) => {
  function handleInputChange(event) {
    const target = event.target;
    priceFilter['isChecked'] = target.checked;
    handleInptFilter(target.value,target.checked)
  }
  return (
    <div>
      <label>
        <input
        className="customCheckBox u_invisible"
        name={priceFilter.range}
        type='checkbox'
        value={priceFilter.priceGroup}
        data-min={priceFilter.min}
        data-max={priceFilter.max}
        checked={priceFilter.isChecked}
        onChange={handleInputChange}/>
        <span className="checkboxSpan"></span>
        <span className="u_padL10 u_font14">{priceFilter.range}</span>
      </label>
    </div>
  )
}

export default priceFilter;
