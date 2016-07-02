import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './less/home.less';

// components
import Header from '../Header'
import SubMenu from '../SubMenu'
import Footer from '../Footer'
import {Breadcrumb, Row, Col, Icon} from 'antd';
import * as actions from '../../actions/user';
import * as RoleActions from '../../actions/role';

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

        this.state = {
            breads: []
        }
    }

    componentWillMount () {
        this.props.menuRefer(this.props.location.pathname)
    }

    render() {
        this.props.menuRefer(this.props.location.pathname)

        const breads = [{
                    link: '#/console',
                    name: <Icon type="home" />
                }].concat(this.props.role.open).concat(this.props.role.current)

        return (
            <div className="page">
                <Header user={this.props.user.info} logout={this.props.logout} history={this.props.history}/>
                <div className="contain">
                    <Breadcrumb>
                        {
                            breads.map(item => <Breadcrumb.Item href={'#' + item.link} key={item.name}>{item.name}</Breadcrumb.Item>)
                        }
                    </Breadcrumb>
                    <Row className="contain-docs">
                        <Col className="contain-docs-nav" span={4}>
                            <SubMenu open={this.props.role.open} current={this.props.role.current}/>
                        </Col>
                        <Col className="contain-docs-main" span={20}>
                            {this.props.children}
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        );
    }
}

let mapStateToProps = state => state;
let mapDispatchToProps = dispatch => bindActionCreators({
    ...actions,
    ...RoleActions
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
