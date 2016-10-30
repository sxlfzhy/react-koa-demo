import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'
import { Row, Col } from 'antd'
import './less/home.less'

// components
import Header from '../Header'
import * as actions from '../../actions/user'

let mapStateToProps = (state) => state
let mapDispatchToProps = (dispatch) => bindActionCreators({
  ...actions
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component {
  getCookie (name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
  }

  constructor (props) {
    super(props)
    const userCookie = this.getCookie('user')
    // 用户基本信息存在，则直接读取并保存sessionStorage ，否则 从sessionStorage中读取
    if (this.props.user.info) {
      document.cookie = 'user=' + encodeURIComponent(JSON.stringify(this.props.user.info))
    } else if (userCookie) {
      this.props.user.info = JSON.parse(userCookie)
    } else {
      hashHistory.push({
        pathname: '/login',
        query: {
          break: true
        }
      })
    }
  }

  render () {
    return (
      <div className="page">
        <Header user={this.props.user.info} logout={this.props.logout} history={this.props.history} />
        <Row>
          <Col span={20} offset={2} className="contain">
            {this.props.children}
          </Col>
        </Row>
      </div>
    )
  }
}
