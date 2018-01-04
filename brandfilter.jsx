import React from 'react';

const brandFilter = ({brandFilter,handleInptFilter}) => {
  function handleInputChange(event) {
    const target = event.target;

    brandFilter['isChecked'] = target.checked;
    handleInptFilter(target.value,target.checked)
  }
  return (
    <div>
      <label>
        <input
        className="customCheckBox u_invisible"
        name={brandFilter.name}
        type='checkbox'
        checked={brandFilter.isChecked}
        value={brandFilter.name}
        onChange={handleInputChange} />
        <span className="checkboxSpan"></span>
        <span className="u_padL10 u_font14">{brandFilter.name + '('+brandFilter.numRslt+')'}</span>
      </label>
    </div>
  )
}

export default brandFilter;
