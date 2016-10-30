import React from 'react'
import Catalog from './components/Catalog'
import './less/course.less'

export default class Course extends React.Component {
  constructor (props) {
    super(props)
    this.state = {load: false}
  }
  render () {
    const {hm} = this.props.location.query
    return (
      <div>
        {
          hm
          ? this.props.children
          : <Catalog> {this.props.children} </Catalog>
        }
      </div>
    )
  }
}
