import React, { Component } from 'react'
import Filter from './components/Filter'
import SearchHeader from '../../components/SearchHeader'
import './houselist.scss'
import styles from './houselist.module.css'
import { getCurrentCity } from '../../utils/index'
import {API} from '../../utils/api'
import {List,AutoSizer,WindowScroller} from 'react-virtualized';
import {BASE_URL} from '../../utils/url'
export default class Houselist extends Component {
  state={
    cityname:'',
    cityId:'',
    count:0,
    list:[]
  }
  filters={}
  async componentDidMount(){
    let dingwei = await getCurrentCity()
    // console.log(dingwei.label);
    this.setState({
      cityname:dingwei.label,
      cityId:dingwei.value
    },()=>{
      this.searchhouselist()
    })
  }
  onFilter=(filters)=>{
    // console.log('houselist的onFilter');
    console.log('houselist收到的filters',filters);
    this.filters = filters  //1.传参 2.state3 .赋值给this
    this.searchhouselist()
  }
  searchhouselist = async()=>{
    let res = await API.get("/houses",{
      params:{
        cityId:this.state.cityId,
        ...this.filters,
        start:1,
        end:20
      }
    })
    console.log('赛选出的数据',res);
    this.setState({
      count:res.data.body.count,
      list:res.data.body.list
    })
  }
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // 索引号
    style // 重点属性：一定要给每一个行数添加该样式
  }) => {
    let house = this.state.list[index]
    if(!house){
      return <div key={key} style={style} className='loading'>正在加载……</div>
    }
    return (
      <div className={styles.house} key={key} style={style}>
            <div className={styles.imgWrap}>
                <img className={styles.img} src={BASE_URL+house.houseImg} alt="" />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{house.title}</h3>
                <div className={styles.desc}>{house.desc}</div>
                <div>
                  {/* ['近地铁', '随时看房'] */}
                  {house.tags.map((item,index)=>{
                    return <span key={index} className={[styles.tag,styles.tag1 ].join(' ')} >
                                {item}
                            </span>
                  })}           
                </div>
                <div className={styles.price}>
                    <span className={styles.priceNum}>{house.price}</span> 元/月
                </div>
            </div>
        </div>
    )
  }
  render() {
    return <div className='houselist'>
        {/* 搜索栏 */}
        <div className='header'>
          <i className='iconfont icon-back'></i>
          <SearchHeader cityname={this.state.cityname}></SearchHeader>
        </div>
        <Filter onFilter={this.onFilter}></Filter>
        <WindowScroller>
          {({height,isScrolling,onChildScroll,scrollTop})=>(
            <AutoSizer>
              {({ width }) => (
                <List
                  autoHeight
                  scrollTop={scrollTop}
                  onScroll={onChildScroll}
                  isScrolling={isScrolling}
                  // 组件的宽度
                  width={width}
                  // 组件的高度
                  height={height}
                  rowCount={this.state.count} // List列表项总条目数
                  // 每行的高度
                  rowHeight={120} // 每一行高度
                  rowRenderer={this.rowRenderer}
                />
               )}
           </AutoSizer>
          )}
        </WindowScroller>
      </div>
  }
}



