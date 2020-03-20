import React, { Component } from 'react'
import Filter from './components/Filter'
import SearchHeader from '../../components/SearchHeader'
import './houselist.scss'
import { getCurrentCity } from '../../utils/index'
export default class Houselist extends Component {
  state={
    cityname:''
  }
  async componentDidMount(){
    let dingwei = await getCurrentCity()
    console.log(dingwei.label);
    this.setState({
      cityname:dingwei.label
    })
  }
  onFilter=(filters)=>{
    console.log('houselist的onFilter');
    console.log('houselist收到的filters',filters);
  }
  render() {
    return (
      <div className='houselist'>
        {/* 搜索栏 */}
        <div className='header'>
          <i className='iconfont icon-back'></i>
          <SearchHeader cityname={this.state.cityname}></SearchHeader>
        </div>
        <Filter onFilter={this.onFilter}></Filter>
      </div>
    )

  }
}

