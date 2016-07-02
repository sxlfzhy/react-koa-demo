import React from 'react';
import {Form, Input, Row, Col, Button, DatePicker, Select} from 'antd';
import './less/activity.less';

import {activity} from '../../constants';

const FormItem = Form.Item;

class ActivityList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {config: activity.config};
    }

    render() {
        return (
            <Form horizontal className="ant-advanced-search-form">
                <Row gutter={16}>
                    <Col sm={8}>
                        <FormItem label="活动ID／名称" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
                            <Input placeholder="活动ID／名称" />
                        </FormItem>
                        <FormItem label="活动类型" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <DatePicker size="default" />
                        </FormItem>
                        <FormItem label="创建人" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <Input placeholder="创建人" size="default" />
                        </FormItem>
                    </Col>
                    <Col sm={8}>
                        <FormItem label="活动类型" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <Select placeholder="活动类型" defaultValue="" style={{ width: '100%' }}>
                                {
                                    Object.keys(this.state.config.type).map(key => <Select.Option value={key}>{this.state.config.type[key]}</Select.Option>)
                                }
                            </Select>
                        </FormItem>
                        <FormItem label="较长搜索名称" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <DatePicker size="default" />
                        </FormItem>
                        <FormItem label="搜索名称" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <Input placeholder="请输入搜索名称" size="default" />
                        </FormItem>
                    </Col>
                    <Col sm={8}>
                        <FormItem label="活动时间" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <Input placeholder="创建人" size="default" />
                        </FormItem>
                        <FormItem label="较长搜索名称" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <DatePicker size="default" />
                        </FormItem>
                        <FormItem label="搜索名称" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <Input placeholder="请输入搜索名称" size="default" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                        <Button>清除条件</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default ActivityList;
