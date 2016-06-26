import React from 'react';
import {Link} from 'react-router'
import {Row, Popover, Icon} from 'antd';

import './less/header.less';

class Header extends React.Component{
    constructor(props) {
        super(props);
    }

    handleLogout(e) {
        sessionStorage.clear();
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        const contBtns = (
          <ul className="user-ctrols">
            <li>
                <Link to="/"><Icon type="setting" />修改密码</Link>
            </li>
            <li className="divider"></li>
            <li onClick={this.handleLogout.bind(this)}>
                <Icon type="logout" />退出
            </li>
          </ul>
        );

        return (
            <Row className="head">
              <div className="header">
                <Link to="/console" className="my-logo pull-left">
                    <span className="text">KOA＋REACT DEMO</span>
                </Link>
                <Popover placement="bottomRight" content={contBtns} trigger="click" className="pull-right">
                    <a className="nav-user">
                        {this.props.user.nickname}
                        <Icon type="down" />
                    </a>
                </Popover>
              </div>
            </Row>
        );
    }
}

export default Header;
