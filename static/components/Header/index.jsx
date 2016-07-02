import React from 'react';
import {Link} from 'react-router'
import {Row, Dropdown, Icon, Menu} from 'antd';

import './less/header.less';

class Header extends React.Component{
    constructor(props) {
        super(props);
    }

    handleMenuClick (e) {
        switch (e.key) {
            case '1':
                sessionStorage.clear();
                this.props.logout();
                this.props.history.push('/');
                return false;
            default:
                return false;
        }
    }

    render() {
        const contBtns = (
            <Menu className="user-ctrols" onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="0">
                    <Link to="/"><Icon type="setting" />修改密码</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                    <Icon type="logout" />退出
                </Menu.Item>
            </Menu>
        );

        return (
            <Row className="head">
              <div className="header">
                <Link to="/console" className="my-logo pull-left">
                    <span className="text">KOA＋REACT DEMO</span>
                </Link>
                <Dropdown overlay={contBtns} trigger={['click']} className="pull-right">
                    <a className="nav-user">
                        {this.props.user.nickname}
                        <Icon type="down" />
                    </a>
                </Dropdown>
              </div>
            </Row>
        );
    }
}

export default Header;
