import React from 'react'
import Store from '../Store'

export default class MyCourseware extends React.Component {
  render () {
    return <Store isMine readOnly={this.props.readOnly} />
  }
}

MyCourseware.propTypes = {
  readOnly: React.PropTypes.bool
}

MyCourseware.defaultProps = {
  readOnly: true
}
