import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'
import {API} from '../../utils/api'
import { withFormik } from 'formik'
// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  // state={
  //   username:'',
  //   password:''
  // }
  // getusername=(e)=>{
  //   console.log(e.target.value);
  //   this.setState({
  //     username:e.target.value
  //   })
  // }
  // getpassword=(e)=>{
  //   console.log(e.target.value);
  //   this.setState({
  //     password:e.target.value
  //   })
  // }
  // 表单点击提交
  // handleSubmit= async (e)=>{
  //   // 表单默认会刷新跳转  ，不行跳转就阻止默认行为
  //   e.preventDefault()
  //   let {username,password} = this.state
  //   if(username===''){
  //     Toast.info('用户名不能为空',2)
  //   }
  //   if(password===''){
  //     Toast.info('密码不能为空',2)
  //   }
  //   let res = await API.post('http://api-haoke-web.itheima.net/user/login',{
  //     username,
  //     password
  //   })
  //   console.log('登录结果',res);
  //   if(res.data.status===200){
  //     localStorage.setItem('my-token',res.data.body.token)
  //     Toast.info('登录成功',1)
  //   }else{
  //     Toast.info(res.data.description,1)
  //   }
  // }
  render() {
    let {values,handleSubmit,handleChange} = this.props
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={values.username}
                onChange={handleChange}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                value={values.password}
                onChange={handleChange}
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

  // mapPropsToValues: () => ({ name: '' })
  // mapPropsToValues放到props上values，替换state
  // handleSubmit 替代提交代码 会提交在props上
export default withFormik({
  mapPropsToValues: () => {
    return {
      username:'',
      password:''
    }
  },
  handleSubmit:async (values,{props})=>{
    console.log('登录values',values);
    let {username,password} = values
    if(username===''){
      Toast.info('用户名不能为空',2)
    }
    if(password===''){
      Toast.info('密码不能为空',2)
    }
    let res = await API.post('http://api-haoke-web.itheima.net/user/login',{
      username,
      password
    })
    console.log('登录结果',res);
    if(res.data.status===200){
      localStorage.setItem('my-token',res.data.body.token)
      Toast.info('登录成功',1)
    }else{
      Toast.info(res.data.description,1)
    }
  }
})(Login) 
// withFormik({配置对象})(组件)   表单处理的配置