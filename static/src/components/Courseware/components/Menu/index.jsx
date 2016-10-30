import React from 'react'
import { Menu } from 'antd'
import './less/style.less'

class Sider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 'recommend'
    }
  }

  handleClick (e) {
    this.setState({
      current: e.key
    })

    if (this.props.changeRouter) {
      this.props.changeRouter(e.key)
    } else {
      let link = '/'
      switch (e.key) {
        case 'recommend':
          link = '/home/courseware/recommend'
          break
        default:
          link = '/home/courseware/mine'
      }
      this.context.router.push({
        pathname: link
      })
    }
  }

  componentWillMount () {
    const hash = location.hash.split('?')[0].split('/')
    if (hash.length > 3 && !this.props.changeRouter) {
      this.setState({
        current: hash[3]
      })
    }
  }

  render () {
    return (
      <Menu onClick={this.handleClick.bind(this)}
        mode="vertical"
        selectedKeys={[this.state.current]}
        className="c-courseware-menu menu-junjun"
        >
        <Menu.Item key="recommend">
          <i className="icon-recmd" />
          <p>子tab1</p>
        </Menu.Item>
        <Menu.Item key="mine">
          <i className="icon-mine" />
          <p>子tab2</p>
        </Menu.Item>
      </Menu>
    )
  }
}

Sider.propTypes = {
  changeRouter: React.PropTypes.func
}

Sider.contextTypes = {
  router: React.PropTypes.object
}

Sider.defaultProps = {
  changeRouter: null
}

export default Sider
