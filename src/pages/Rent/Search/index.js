import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCurrentCity } from '../../../utils'
import { API } from '../../../utils/api'

import styles from './index.module.css'

export default class Search extends Component {
  // 当前城市id
  // cityId = getCity().value

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li key={item.community} className={styles.tip}>
        {item.communityName}
      </li>
    ))
  }
  changeValue=async(val)=>{
    this.setState({
      searchTxt:val
    })
    if(!val){
      this.setState({
        tipsList:[]
      })
      return
    } 
    // 发送ajax请求获取数据
    let dingwei = await getCurrentCity()
    clearTimeout(this.timeId)
    this.timeId=setTimeout(async()=>{
      let res = await API.get('/area/community',{
        params:{
          name:val,
          id:dingwei.value
        }
      })
      console.log('小区数组',res);
      this.setState({
        tipsList:res.data.body
      })
    },500)
    
  }
  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          onChange={this.changeValue}
          value={searchTxt}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
