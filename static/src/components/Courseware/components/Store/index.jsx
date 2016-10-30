import React from 'react'
import { Form, Select, Table } from 'antd'
import { Const } from '../../../../constants'
import { connect } from 'react-redux'
import './style.less'

const FormItem = Form.Item
const mapStateToProps = (state) => ({
  user: state.user
})

@connect(mapStateToProps)
export default class Store extends React.Component {
  constructor (props) {
    super(props)
    const _this = this
    const {tid, term, subject} = this.props.user.info
    this.param = {
      cwtype: this.props.isMine ? 2 : 1,
      grade_type: '',
      difficulty: '',
      type: '',
      page: 1,
      limit: 10,
      tid,
      term,
      subject
    }

    this.state = {
      dataSource: [],
      pagination: {
        total: 0,
        onChange (current) {
          _this.query(current)
        },
        pageSize: this.param.limit
      }
    }

    this.columns = [{
      title: 'td1',
      dataIndex: 'points'
    }, {
      title: 'td2',
      dataIndex: 'type'
    }, {
      title: 'td3',
      dataIndex: 'difficulty'
    }, {
      title: 'td4'
    }]

    if (this.props.isMine) {
      this.columns.splice(1, 0, {
        title: 'td5',
        dataIndex: 'username'
      })
    }
  }

  handleSubmit (key, value) {
    this.param[key] = value
    this.query()
  }

  render () {
    return (
      <div className="c-courseware-store" >
        <Form inline>
          <FormItem>
            <Select placeholder="select"
              className="no-border"
              defaultValue=""
              onChange={this.handleSubmit.bind(this, 'difficulty')}
            >
              <Select.Option value="">下拉框</Select.Option>
              {
                Object.keys(Const.coursewareDegree)
                  .map((key) => <Select.Option value={key} key={key}>{Const.coursewareDegree[key]}</Select.Option>)
              }
            </Select>
          </FormItem>
        </Form>
        <Table columns={this.columns}
          bordered
          size={this.props.readOnly ? '' : 'small'}
          loading={this.state.loading}
          dataSource={this.state.dataSource}
          pagination={this.state.pagination} />
      </div>
    )
  }
}

Store.propTypes = {
  isMine: React.PropTypes.bool,
  readOnly: React.PropTypes.bool
}

Store.defaultProps = {
  isMine: false,
  readOnly: true
}
