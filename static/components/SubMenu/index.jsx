import React from 'react';
import { Link } from 'react-router'
import { Menu, Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/role';

const SubMenu = Menu.SubMenu;

class Sider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current: this.props.current[0] ? this.props.current[0].key : '',
            openKeys: this.props.open[0] ? this.props.open.map(item => item.key) : []
        };
    }

    handleClick(e) {
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1),
        });
    }

    onToggle(info) {
        this.setState({
            openKeys: info.open ? this.state.openKeys.concat(info.keyPath) : info.keyPath.slice(1),
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            current: nextProps.current[0] ? nextProps.current[0].key : '',
            openKeys: nextProps.open[0] ? nextProps.open.map(item => item.key) : []
        });
    }

    render() {
        return (
            <Menu onClick={this.handleClick.bind(this)} openKeys={this.state.openKeys} onOpen={this.onToggle.bind(this)} onClose={this.onToggle.bind(this)} selectedKeys={[this.state.current]} mode="inline">
                {
                    this.props.role.menus.map(item => {
                        return  <SubMenu key={item.key} title={item.name} menu={item}>
                                    {
                                        item.children.map(child => {
                                            return  <Menu.Item key={child.key} menu={child}>
                                                        <Link to={child.link}>{child.name}</Link>
                                                    </Menu.Item>
                                        })
                                    }
                                </SubMenu>;
                    })
                }
            </Menu>
        );
    }
}


let mapStateToProps = state => state;
let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sider);
