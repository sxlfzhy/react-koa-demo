import React from 'react'
import './less/login.less'
import { Form, Input, Button, Checkbox, Row } from 'antd'
import crypto from 'crypto'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { remoteUrl as URL } from '../../constants'
import Fetch from '../../../../libs/Fetch'
import aside from './images/aside.png'

import * as actions from '../../actions/user'
const FormItem = Form.Item

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.loginable = JSON.parse(localStorage['loginable'] || '{}')

    this.state = {
      load: false
    }
  }
  /**
  *  调用action 登录方法
  */
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log(errors)
        return false
      }

      // 表单验证通过
      this.setState({load: true})
      const md5 = crypto.createHash('sha1')
      md5.update(values.passwd)
      this.login({
        userName: values.phone_no,
        password: md5.digest('hex')
      }, values.agreement)
    })
  }

  login (user, agreement) {
    Fetch.post(URL.LOGIN, user)
      .then((res) => {
        this.setState({load: false})

        if (res.success) {
          this.props.setUser(res.data)
          // 如果用户勾选了自动登录，保存localStorage
          user.agreement = agreement
          if (user.agreement) {
            if (user.phone_no && user.passwd) {
              localStorage['loginable'] = JSON.stringify(user)
            }
          } else {
            delete localStorage['loginable']
          }

          this.context.router.push({
            pathname: this.props.location.query.direct || '/home',
            query: JSON.parse(this.props.location.query.params || '{}')
          })
        }
      })
  }

  getCookie (name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
  }

  componentDidMount () {
    const {access_token: accessToken} = this.props.location.query
    if (accessToken) {
      this.setState({load: true})
      Fetch.post(URL.USER_GET_INFO, {access_token: accessToken})
        .then((res) => {
          this.setState({load: false})
          if (res.success) {
            this.props.setUser(res.data)

            this.context.router.push({
              pathname: this.props.location.query.direct || '/home',
              query: JSON.parse(this.props.location.query.params || '{}')
            })
          }
        })
    }

    if (this.getCookie('user')) {
      this.context.router.push({
        pathname: this.props.location.query.direct || '/home',
        query: JSON.parse(this.props.location.query.params || '{}')
      })
    }

    const loginable = JSON.parse(localStorage['loginable'] || '{}')
    if (loginable.agreement) {
      this.login(loginable)
    }
  }

  render () {
    const { getFieldProps } = this.props.form

    const userProps = getFieldProps('phone_no', {
      validate: [{
        rules: [
          {required: true, message: '用户名不能为空'}
        ],
        trigger: ['onBlur']
      }],
      initialValue: this.loginable.phone_no
    })

    const pwdProps = getFieldProps('passwd', {
      validate: [{
        rules: [
          {required: true, message: '密码不能为空'}
        ],
        trigger: ['onChange']
      }],
      initialValue: ''
    })

    const agreementProps = getFieldProps('agreement', {
      initialValue: this.loginable.agreement
    })

    return (
      <div className="login-body text-center">
        <div className="login-main">
          <img src={aside} className="img-aside" />
          <section>
            <h4 className="login-title" >React Demo 中后台开发框架</h4>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Input.Group className="login-from-group">
                <FormItem >
                  <Input {...userProps} autoComplete="off" size="large" placeholder="请输入用户名" maxLength={11} />
                </FormItem>
                <FormItem>
                  <input className="fix-auto-complete" type="password" />
                  <Input size="large" type="password" placeholder="请输入密码" {...pwdProps} />
                </FormItem>
                <Button size="large"
                  type="primary"
                  htmlType="submit"
                  loading={this.state.load}
                > {this.state.load ? '登录中...' : '登录'} </Button>
                <Row className="action-row">
                  <Checkbox className="pull-left" {...agreementProps} defaultChecked={this.loginable.agreement}>
                    自动登录
                  </Checkbox>
                  忘记密码请与管理员联系！
                </Row>
              </Input.Group>
            </Form>
          </section>
        </div>
        <p className="copyright">Copyright©yangyang.zhang@wenba100.com</p>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
}

export default Form.create({})(connect(mapStateToProps, mapDispatchToProps)(Login))
