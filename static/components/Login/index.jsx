import React from 'react';
import './less/login.less';
import {Form, Input, Button, Checkbox, Icon, Row, Col, Tooltip, Alert} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/user';
const FormItem = Form.Item;

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {load: false};
    }

    /**
    *  调用action 登录方法
    */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return false;
            }
            // 表单验证通过
            this.setState({load: true});

            this.props.login(values);
        });
    }

    // 监听登录成功，如果登录成功，跳转成功页面
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.info || sessionStorage.user) {
            this.props.history.push('/console')
        }
        this.state = {load: false};
    }

    componentDidMount() {
        if (sessionStorage.user) {
            this.props.history.push('/console')
        }
    }

    render() {
        const {getFieldProps} = this.props.form;
        const userAddon = (<Icon type="user" />);
        const pwdAddon = (<Icon type="lock" />);
        let alert = null;
        if (this.props.user.error) {
            alert = (<Alert message={this.props.user.error.text} type="error" showIcon />)
        }

        const userProps = getFieldProps('userName', {
            validate: [{
                rules: [
                    {required: true, message: '用户名不能为空'}
                ],
                trigger: ['onChange'],
            }],
        });

        const pwdProps = getFieldProps('password', {
            validate: [{
                rules: [
                    {required: true, message: '密码不能为空'}
                ],
                trigger: ['onChange'],
            }],
        });
        return (
            <div className="login-body">
                <div className="login-main">
                    <div className="login-title">
                        <h1>
                            KOA+REACT 中后台DEMO
                        </h1>
                        <h4>© yangyang.zhang@wenba100.com</h4>
                    </div>
                    <div className="login-cnt">
                        <Form onSubmit={this.handleSubmit.bind(this)} form={this.props.form}>
                            <Input.Group className="login-from-group">
                                <FormItem>
                                    <Input addonBefore={userAddon} autoComplete="off" size="large" placeholder="账户" {...userProps} />
                                </FormItem>
                                <FormItem>
                                    <Input addonBefore={pwdAddon} size="large" type="password" placeholder="密码" {...pwdProps} />
                                </FormItem>
                                {alert}
                                <Row className="pull-right">
                                    <Tooltip title="请联系管理员！">
                                        <a href="javascript:;">忘记密码</a>
                                    </Tooltip>
                                </Row>
                                <Button size="large" type="primary" htmlType="submit" loading={this.state.load}> {this.state.load ? '登录中...' : '登录'} </Button>
                            </Input.Group>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = state => state;
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default Form.create({})(connect(mapStateToProps, mapDispatchToProps)(Login));
