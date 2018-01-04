import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchProductList,filterBrandData} from '../actions/index';
import EachList from './eachlist';
import Filter from './Filter';

class MainResult extends Component {
  constructor(props){
  	super(props);
  
  	this.state = {
      scrollPage:0,

    };
    this.resultHits = [];
    this.fltData = {
      brand:[],
      price:[]
    }
    this.brandFltData = [];
    this.priceFltrData = [];
  }
  onScrollPagination = () => {
    if(this.state.scrollPage <= this.props.dataList.records.length - 1) {
      this.setState((prevState) => {
        return {scrollPage:prevState.scrollPage + 1}
      });
    }
  }
  handleFilterSelection = (name,cond,fltrType) => {
      if(cond) {
        this.fltData[fltrType].push(name);
      }else {
        this.fltData[fltrType] =  this.fltData[fltrType].filter((item) => {
          return item !== name;
        });
      }
      this.props.filterBrandData(this.fltData,this.props.dataList)
      this.resultHits = [];
      this.setState({scrollPage:0});

  }

  componentDidMount() {
    this.props.fetchProductList();
  }

  render(){
    const {dataList} = this.props;
    const {scrollPage} = this.state;

    if(!dataList.records && !dataList.isLoading) {
      return <div>Fetching The Results Please Wait..</div>
    }
    if(!dataList.records.length && !dataList.baseData.length){
      return <div> The List Is Empty </div>
    }
    if(dataList.records[scrollPage]) {
      this.resultHits = [...this.resultHits,...dataList.records[scrollPage]]
    }

    return(
      <div className="u_marT75">

        <EachList
          list={this.resultHits}
          rsltLngth={dataList.records.length}
          scrollPage={scrollPage}
          scrollPagination={this.onScrollPagination}
        />
        <div className="flt_heading u_font12">Filters</div>
        <Filter
          brandFilter={dataList.brandFilter}
          priceFilter={dataList.priceFilter}
          handleFilterSelection={this.handleFilterSelection}
        />

      </div>
    );
  }
}
function mapStateToProps({dataList,isLoading}) {
  return {dataList,isLoading}
}
export default connect(mapStateToProps, {fetchProductList,filterBrandData})(MainResult);
