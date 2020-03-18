import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchHeader extends Component {
  render() {
    return <Flex className='searchBox'>
            <Flex className='searchLeft'>
                <div
                className='location'
                onClick={()=>{
                  this.props.history.push("/citylist")
                }}
                >
                {this.props.cityname}
                <i className="iconfont icon-arrow" />
                </div>
                <div
                className='searchForm'
                >
                    <i className="iconfont icon-seach" />
                    请输入小区或地址
                </div>
            </Flex>
            <i className="iconfont icon-map" 
            onClick={()=>{
              this.props.history.push("/map")
            }} />
        </Flex>
  }
}
SearchHeader.propType={
  cityname:PropTypes.string
}
SearchHeader.defaultProps={
  cityname:'默认'
}
export default withRouter(SearchHeader)
