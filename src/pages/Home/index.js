import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import './home.css'
import Index from '../Index'
import Houselist from '../Houselist'
import News from '../News'
import Profile from '../Profile'

const tabItem = [{
    title:'首页',
    icon:'icon-ind',
    path:'/home/index'
},{
    title:'找房',
    icon:'icon-findHouse',
    path:'/home/houselist'
},{
    title:'资讯',
    icon:'icon-infom',
    path:'/home/news'
},{
    title:'我的',
    icon:'icon-my',
    path:'/home/profile'
}]  
export default class Home extends Component {
  state = {
    selectedTab: '/home/index',
    hidden: false
  }
  renderTabbar(){
    return tabItem.map((item)=>{
      return <TabBar.Item
        title={item.title}
        key="Life"
        icon={<i className={`iconfont ${item.icon}`}></i>
        }
        selectedIcon={<i className={`iconfont ${item.icon}`}></i>
        }
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path,
          });
          this.props.history.push(item.path)
        }}
      >
      </TabBar.Item>
    })
  }
  render() {
    return (
      <div className="home">
        <Route path="/home/index" component={Index}></Route>
        <Route path="/home/houselist" component={Houselist}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/profile" component={Profile}></Route>
        {/* TabBar底部大盒子  TabBar.Item每一项*/}
        <TabBar
          unselectedTintColor="#949494" // 未选中的颜色
          tintColor="#21b97a"// 选中的颜色
          barTintColor="white"    // 底部栏背景色
          hidden={this.state.hidden}   // 是否隐藏
          onRenderContent={true} // 是否需要渲染内容
        >
          {/* title 文字 key 唯一的key icon未选中的图标 selectedIcon  选中的图标  */}
          {this.renderTabbar()}
          
        </TabBar>
        
      </div>
    )
  }
}

