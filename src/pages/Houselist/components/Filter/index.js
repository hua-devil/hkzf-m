import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'
// 数据要写在父组件  四个都要判断
const titleStatus = {
  area:false,
  mode:false,
  price:false,
  more:false
}
export default class Filter extends Component {
  state={
    titleSelectedStatus:titleStatus,
    openType:''
  }
  onTitltClick=(type)=>{
    console.log('执行了filter',type);
    this.setState({
      titleSelectedStatus:{
        ...titleStatus,
        [type]:true  //属性是变量可以加中括号
      },
      openType:type
    })
  }
  // 父  点击取消得函数
  onCancel=()=>{
    console.log('取消');
    this.setState({
      openType:''
    })
  }
  // 父  点击确定得函数
  onSave=()=>{
    console.log('确认');
    this.setState({
      openType:''
    })
  }
  renderPicker=()=>{
    let {openType} = this.state
    if(openType==='area'||openType==='mode'||openType==='price'){
      return <FilterPicker onCancel={this.onCancel} onSave={this.onSave} />
    }else{
      return null
    }
  }
  renderMask=()=>{
    let {openType} = this.state
    if(openType==='area'||openType==='mode'||openType==='price'){
      return <div className={styles.mask} />
    }else{
      return null
    }
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.renderMask()}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSelectedStatus={this,this.state.titleSelectedStatus} onTitltClick={this.onTitltClick} />

          {/* 前三个菜单对应的内容： */}
          {this.renderPicker()}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
