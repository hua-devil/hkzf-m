import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'
import {API} from '../../utils/api'
import { withFormik,Form,Field,ErrorMessage } from 'formik'
// 分别代替form   Field替换input
import * as Yup from 'yup'
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
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              <Field 
              type="text"
              name="username"
              placeholder="请输入账号"
              className={styles.input}
              ></Field>
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            <ErrorMessage name='username' className={styles.error} component='div'></ErrorMessage>
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              ></Field>
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            <ErrorMessage name='password' className={styles.error} component='div'></ErrorMessage>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </Form>
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
  // 配合yup验证表单、
  // username:'要求不能为空'
  
  validationSchema:Yup.object().shape({
    username:Yup.string().required('用户名不能为空').matches(/^\w{5,8}$/, '用户名长度为5到8位'),
    password:Yup.string().required('密码不能为空').matches(/^\w{4,10}$/,'密码长度为5到12位')
  }),
  handleSubmit:async (values,{props})=>{
    console.log('登录values',values);
    let {username,password} = values
    let res = await API.post('http://api-haoke-web.itheima.net/user/login',{
      username,
      password
    })
    console.log('登录结果',res);
    if(res.data.status===200){
      localStorage.setItem('my-token',res.data.body.token)
      Toast.info('登录成功',1)
      props.history.go(-1)
    }else{
      Toast.info(res.data.description,1)
    }
  }
})(Login) 
// withFormik({配置对象})(组件)   表单处理的配置