import React from 'react'
import { Row, Col } from 'antd'
import Menu from './components/Menu'

export default class Course extends React.Component {

  render () {
    return (
      <Row style={{marginTop: '15px'}}>
        <Col span={5}>
          <Menu />
        </Col>
        <Col span={19}>
          {this.props.children}
        </Col>
      </Row>
    )
  }
}
