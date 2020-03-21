import React, { Component } from 'react'

export default class Sticky extends Component {
  pRef = React.createRef()
  cRef = React.createRef()
  componentDidMount(){
    // 当前页面滚动得时候  判断是否滚动到顶
    // onscroll  页面滚动事件
    window.addEventListener('scroll',()=>{
      // 判断是否到底部  div placerholder 距离顶部为0就到顶了
      // console.log('滚动了');
      // 使用ref  获取 placerholder  div
      let pDiv = this.pRef.current
      let cDiv = this.cRef.current
      // 获取div距顶部得距离
      // 元素.getBoundingClientRect() 获取距离  上下左右得位置
      // console.log(pDiv.getBoundingClientRect().top);
      let pTop = pDiv.getBoundingClientRect().top
      if(pTop<=0){
        cDiv.style.position='fixed'
        cDiv.style.top=0
        cDiv.style.width='100%'
        cDiv.style.zIndex=999
      }
    })
  }
  render() {
    return <div className="sticky">
      {/* 单纯点 placerholder div 用来判断是否到顶了 */}
      <div ref={this.pRef} id="placerholder"></div>
      {/* 要定位得内容 */}
      <div ref={this.cRef} id="content">
        {this.props.children}
      </div>
    </div>
  }
}
