import React,{Component} from 'react';
import BrandFilter from './brandfilter';
import PriceFilter from './pricefilter';

export default class Filter extends Component {
  constructor(props){
  	super(props);
  	this.state = {};
  }
  handleBrndFilter = (name,cond) => {
    this.props.handleFilterSelection(name,cond,'brand');
  }
  handlePriceFilter = (name,cond) => {
    this.props.handleFilterSelection(name,cond,'price');
  }
  render(){
    const {brandFilter,priceFilter} = this.props;
    return(
      <div className="filter-bar">
        <div className="brandfltHeading u_fontWb">Brand</div>
        <div>
        {
          brandFilter.map((item,index) => {
            return <BrandFilter key={'brnd_'+index} brandFilter={item} handleInptFilter={this.handleBrndFilter} />
          })
        }
        </div>
        <div className="prcFltHeading u_fontWb">Price</div>
        <div>
        {
          priceFilter.map((item,index) => {
            return <PriceFilter key={'price_'+index} priceFilter={item} handleInptFilter={this.handlePriceFilter} />
          })
        }
       </div>
     </div>
    );
  }
}
