import React from 'react'
import Store from '../Store'

export default class Recommend extends React.Component {
  render () {
    return <Store readOnly={this.props.readOnly} />
  }
}

Recommend.propTypes = {
  readOnly: React.PropTypes.bool
}

Recommend.defaultProps = {
  readOnly: true
}
