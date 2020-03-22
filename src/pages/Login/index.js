import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  state={
    username:'',
    password:''
  }
  getusername=(e)=>{
    console.log(e.target.value);
    this.setState({
      username:e.target.value
    })
  }
  getpassword=(e)=>{
    console.log(e.target.value);
    this.setState({
      password:e.target.value
    })
  }
  // 表单点击提交
  handleSubmit=(e)=>{
    // 表单默认会刷新跳转  ，不行跳转就阻止默认行为
    e.preventDefault()
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={this.state.username}
                onChange={this.getusername}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                value={this.state.password}
                onChange={this.getpassword}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              {/* 
                form表单提交事件onsubmit
                注意：1.如果form表单里面又按钮，type='submit'，就会onsubmit提交 在form标签绑定
                    2.如果type='button' 只是普通按钮，点击只是普通点击事件 
               */}
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login
