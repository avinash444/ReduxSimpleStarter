import React,{Component} from 'react';
import RenderList from './renderlist';
import Sort from './sortprice';
export default class EachList extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        sortBy:{
          priceLow:false,
          priceHigh:false
        }
      };
    }
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }
    handleSortType = (type) => {
      if(type === 'priceLow') {
        let sortObj = Object.assign({},this.state.sortBy,{priceLow:true,priceHigh:false});
        this.setState({sortBy:sortObj});
      }else {
          let sortelseObj = Object.assign({},this.state.sortBy,{priceHigh:true,priceLow:false});
          this.setState({sortBy:sortelseObj});
      }

    }
    onScroll = () => {
      if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
      && this.props.scrollPage <= this.props.rsltLngth - 1){
        this.props.scrollPagination();
      }
    }

    render(){
      const {list} = this.props;
      const{sortBy} = this.state;
      const lstLngth = list.length > 0;
      const sortKey = `${sortBy['priceLow'] && lstLngth}-${sortBy['priceHigh'] && lstLngth}-${lstLngth}`;
      return (
        <div>
          <Sort
            handleSortType={this.handleSortType}
            sortObj={this.state.sortBy}
            />
            <div  className="result-bar">
              {{
                ['true-false-true']:<RenderList list={list} sortType='low'/>,
                ['false-true-true']:<RenderList list={list} sortType='high'/>,
                ['false-false-true']:<RenderList list={list} sortType='nosort'/>,
                ['false-false-false']:<div>Sorry No Results Found For Your Search Criteria</div>
              }[sortKey]}
            </div>
        </div>
      );
    }
}
