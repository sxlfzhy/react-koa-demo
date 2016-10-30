import React from 'react'
import { Link } from 'react-router'
import { Menu } from 'antd'
import './less/menu.less'

class Sider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 'course'
    }
  }

  handleClick (e) {
    this.setState({current: e.key})
  }

  componentWillMount () {
    const hash = location.hash.split('?')[0].split('/')
    if (hash.length > 2) {
      this.setState({current: hash[2]})
    }
  }

  render () {
    return (
      <Menu onClick={this.handleClick.bind(this)}
        mode="horizontal"
        className="menu-misi"
        selectedKeys={[this.state.current]}
        >
        <Menu.Item key="course">
          <Link to="/home/course">TAB1</Link>
        </Menu.Item>
        <Menu.Item key="courseware">
          <Link to="/home/courseware">TAB2</Link>
        </Menu.Item>
        <Menu.Item key="wallet">
          <Link to="/home/wallet">TAB3</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Sider
