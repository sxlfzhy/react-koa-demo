
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/configure'
import './less/app.less'

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

@connect(undefined, mapDispatchToProps)
export default class App extends React.Component {
  constructor (props) {
    super(props)

    // 载入页面的配置信息
    if (_DEV_) {
      console.log('configure init!')
    }
    this.props.init()
  }

  componentDidMount () {
    document.onkeydown = (e) => {
      const keycode = e.which
      if (keycode === 116) {   // F5
        location.reload()
      }
    }
  }

  render () {
    return (
      <div className="app_bg">
        {this.props.children}
      </div>
    )
  }
}
