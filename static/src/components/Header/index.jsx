import React from 'react'
import { Row, Col, Dropdown, Icon, Menu } from 'antd'
import './less/header.less'
import SubMenu from './components/SubMenu'

class Header extends React.Component {
  handleMenuClick (e) {
    switch (e.key) {
      case '1':
        this.props.logout()
        delete localStorage['loginable']
        document.cookie = 'user='
        this.props.history.push('/')
        return false
      case '2':
        this.props.history.push('/course-pc')
        return false
      default:
        return false
    }
  }

  render () {
    const contBtns = (
      <Menu className="user-ctrols" onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="1">
          <Icon type="logout" />退出
        </Menu.Item>
      </Menu>
    )

    return (
      <Row className="head">
        <Col span={22} className="header">
          <div className="my-logo pull-left">
            <span className="text">React中后台前端</span>
          </div>
          <SubMenu />
          <Dropdown overlay={contBtns} trigger={['click']} className="pull-right">
            <a className="nav-user">
              Hi, {this.props.user.true_name}
              <Icon type="caret-down" />
            </a>
          </Dropdown>
        </Col>
      </Row>
    )
  }
}

export default Header
