import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './less/home.less';

// components
import Header from '../Header'
import SubMenu from '../SubMenu'
import Footer from '../Footer'
import {Breadcrumb, Row, Col} from 'antd';
import * as actions from '../../actions/user';

class Home extends React.Component{
    constructor(props) {
        super(props);

        // 用户基本信息存在，则直接读取并保存sessionStorage ，否则 从sessionStorage中读取
        if (this.props.user.info) {
            sessionStorage.user = JSON.stringify(this.props.user.info)
        } else if (sessionStorage.user) {
            this.props.user.info = JSON.parse(sessionStorage.user)
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="page">
                <Header user={this.props.user.info} logout={this.props.logout} history={this.props.history}/>
                <div className="contain">
                    <Breadcrumb>
                        <Breadcrumb.Item>产品</Breadcrumb.Item>
                        <Breadcrumb.Item>运维管理</Breadcrumb.Item>
                        <Breadcrumb.Item className="last">发布部署服务</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row className="contain-docs">
                        <Col className="contain-docs-nav" span={4}>
                            <SubMenu />
                        </Col>
                        <Col className="contain-docs-main" span={20}>

                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        );
    }
}

let mapStateToProps = state => state;
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
