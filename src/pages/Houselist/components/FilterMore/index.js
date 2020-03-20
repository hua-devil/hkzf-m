import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state={
    selectedValues:[]
  }
  onTagClick=(item)=>{
    let newValues=[...this.state.selectedValues]
    // 没有添加，有就删除
    let index = newValues.indexOf(item.value)
    if(index===-1){
      newValues.push(item.value)
    }else{
      newValues.splice(index,1)
    }
    console.log('选中的值',newValues);
    this.setState({
      selectedValues:newValues
    })
  }
  // 渲染标签
  renderFilters(arr) {
    // 高亮类名： styles.tagActive
    
      // <span className={[styles.tag, styles.tagActive].join(' ')}>东北</span>
    return arr.map((item)=>{
      return <span
      key={item.value}
      className={[styles.tag,].join(' ')}
      onClick={()=>{
        this.onTagClick(item)
      }}>
        {item.label}
      </span>
    })
    
  }

  render() {
    // console.log('more的值',this.props.data);
    let { roomType,oriented,floor,characteristic } =this.props.data
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} />
      </div>
    )
  }
}
