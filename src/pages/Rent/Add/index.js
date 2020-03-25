import React, { Component } from 'react'

import {
  Flex,
  List,
  InputItem,
  Picker,
  ImagePicker,
  TextareaItem,
  Modal,
  Toast
} from 'antd-mobile'

import NavHeader from '../../../components/NavHeader'
import HousePackge from '../../../components/HousePackage'

import styles from './index.module.css'
import {API} from '../../../utils/api'
const alert = Modal.alert

// 房屋类型
const roomTypeData = [
  { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
]

// 朝向：
const orientedData = [
  { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
]

// 楼层
const floorData = [
  { label: '高楼层', value: 'FLOOR|1' },
  { label: '中楼层', value: 'FLOOR|2' },
  { label: '低楼层', value: 'FLOOR|3' }
]

export default class RentAdd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 临时图片地址
      tempSlides: [],

      // 小区的名称和id
      community: {
        name: '',
        id: ''
      },
      // 价格
      price: '',
      // 面积
      size: 0,
      // 房屋类型
      roomType: '',
      // 楼层
      floor: '',
      // 朝向：
      oriented: '',
      // 房屋标题
      title: '',
      // 房屋图片
      houseImg: '',
      // 房屋配套：
      supporting: '',
      // 房屋描述
      description: ''
    }
  }
  componentDidMount(){
    // console.log('rentadd的 props',this.props)
    if(this.props.location.state){
      this.setState({
      community:{
        name:this.props.location.state.name,
        id:this.props.location.state.id
      }
    })}
  }
  // 取消编辑，返回上一页
  onCancel = () => {
    alert('提示', '放弃发布房源?', [
      {
        text: '放弃',
        onPress: async () => this.props.history.go(-1)
      },
      {
        text: '继续编辑'
      }
    ])
  }
  getValue=(name,val)=>{
    // console.log('获取的值',name,val)
    this.setState({
      [name]:val
    })
  }
  handleSupporting=(arr)=>{
    // console.log('房屋配置数据',arr)
    this.setState({
      supporting:arr.join('|')  //拆分成字符串
    })
  }
  // 房屋选择图片
  handleHouseImg=(files,operation,index)=>{
    // console.log('选择的图片数组files,老师地址',files)
    // console.log('操作类型operation，添加add,删除remove',operation)
    // console.log('添加位undefined，删除图片的索引index',index)
    this.setState({
      tempSlides:files
    })
  }
  // 点击提交
  addHouse=async()=>{
    // this.state.tempSlides  临时图片地址
    // ImagePicker拿到的是  临时的  使用  纯前端的  显示的
    // 只是前端拿到了，通过fileReader 实现了预览  不是真正的上传
    // 图片要发送请求上传到后台 后台返回服务器的图片地址
    // 这才是真正的上传图片， 服务器存起来了
    // 1.先把图片真正的上传处理了
    let houseImg=''
    console.log('临时图片',this.state.tempSlides)
    if(this.state.tempSlides.length>0){
      // 循环图片数组
      // ajax上传图片文件必须配合DormData
      // FormData 是原生js自带的应该对象 专门用来配合ajax上传文件
      // 1.new一下
      let formdata = new FormData();
      // 2.追加参数  formdata.append('参数名',值)
      // formdata.append('参数名',图片对象)
      this.state.tempSlides.forEach((item)=>{
        formdata.append('file',item.file)
      })
      let res = await API.post("/houses/image",formdata,{
        headers:{
          "Content-Type":"multipart/form-data"  //图片必须
        }
      })
      console.log('上传图片的结果',res);
      houseImg = res.data.body.join('|')
    }
    let house={
      houseImg:houseImg,
      title:this.state.title,
      description:this.state.description,
      oriented:this.state.oriented,
      supporting:this.state.supporting,
      price:this.state.price,
      rommType:this.state.rommType,
      size:this.state.size,
      floor:this.state.floor,
      community:this.state.community.id
    }
    let houseRes = await API.post('/user/houses',house)
    console.log('发布结果',houseRes);
    if(houseRes.data.status===200){
      Toast.info('发布成功',1)
      this.props.history.push('/rent')
    }else {
      Toast.info('服务器偷懒了，请稍后再试~', 2, null, false)
    }
  }
  render() {
    const Item = List.Item
    const { history } = this.props
    const {
      community,
      price,
      size,
      roomType,
      floor,
      oriented,
      description,
      tempSlides,
      title
    } = this.state
    
    return (
      <div className={styles.root}>
        <NavHeader onLeftClick={this.onCancel}>发布房源</NavHeader>

        <List
          className={styles.header}
          renderHeader={() => '房源信息'}
          data-role="rent-list"
        >
          {/* 选择所在小区 */}
          <Item
            extra={community.name || '请输入小区名称'}
            arrow="horizontal"
            onClick={() => history.replace('/rent/search')}
          >
            {community.name || '请输入小区名称'}
          </Item>
          <InputItem 
          onChange={(val)=>{
            this.getValue('price',val)
          }}
          placeholder="请输入租金/月" 
          extra="￥/月" 
          value={price}>
            租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
          </InputItem>
          <InputItem placeholder="请输入建筑面积" extra="㎡" 
          value={size}
          onChange={(val)=>{
            this.getValue('size',val)
          }}>
            建筑面积
          </InputItem>
          <Picker data={roomTypeData} value={[roomType]} cols={1} 
          onChange={(val)=>{
            this.getValue('roomType',val[0])
          }}>
            <Item arrow="horizontal">
              户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
            </Item>
          </Picker>

          <Picker data={floorData} value={[floor]} cols={1} 
          onChange={(val)=>{
            this.getValue('floor',val[0])
          }}>
            <Item arrow="horizontal">所在楼层</Item>
          </Picker>
          <Picker data={orientedData} value={[oriented]} cols={1} 
          onChange={(val)=>{
            this.getValue('oriented',val[0])
          }}>
            <Item arrow="horizontal">
              朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向
            </Item>
          </Picker>
        </List>

        <List
          className={styles.title}
          renderHeader={() => '房屋标题'}
          data-role="rent-list"
        >
          <InputItem
            placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
            value={title}
            onChange={(val)=>{
              this.getValue('title',val)
            }}
          />
        </List>

        <List
          className={styles.pics}
          renderHeader={() => '房屋图像'}
          data-role="rent-list"
        >
          <ImagePicker
            files={tempSlides}    // false  显示在页面的图片 数组
            multiple={true}   // 是否同时选择多个图片 true可以
            className={styles.imgpicker}
            onChange={this.handleHouseImg}
          />
        </List>

        <List
          className={styles.supporting}
          renderHeader={() => '房屋配置'}
          data-role="rent-list"
        >
          <HousePackge select 
          onSelect={this.handleSupporting} />
        </List>

        <List
          className={styles.desc}
          renderHeader={() => '房屋描述'}
          data-role="rent-list"
          
        >
          <TextareaItem
            rows={5}
            placeholder="请输入房屋描述信息"
            autoHeight
            value={description}
            onChange={(val)=>{
            this.getValue('description',val)
          }}
          />
        </List>

        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel} onClick={this.onCancel}>
            取消
          </Flex.Item>
          <Flex.Item className={styles.confirm} onClick={this.addHouse}>
            提交
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
