import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]
// 1.class组件时this.props  2. 函数组件props接受传来得值
export default function FilterTitle(props) {
  let {titleSelectedStatus} = props
  console.log(titleSelectedStatus);
  return (
    <Flex align="center" className={styles.root}>
      {/* 循环生成四个标题 */}
      {titleList.map((item,index) => {
        let isSelect = titleSelectedStatus[item.type]
        return <Flex.Item key={index}>
        {/* 选中类名： selected */}
        <span className={[styles.dropdown, isSelect?styles.selected:''].join(' ')}>
          <span>{item.title}</span>
          <i className="iconfont icon-arrow" />
        </span>
      </Flex.Item>
      })}
      
    </Flex>
  )
}
