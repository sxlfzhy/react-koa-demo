import React from 'react';
import {Form, Input, Row, Col, Button, DatePicker, Select} from 'antd';
import './less/activity.less';

import {activity} from '../../constants';

const FormItem = Form.Item;

class Sub1 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {config: activity.config};
    }

    render() {
        return (
            <Form horizontal className="ant-advanced-search-form">
                <Row gutter={16}>
                    <Col sm={8}>
                        <FormItem label="名称" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
                            <Input placeholder="名称" />
                        </FormItem>
                    </Col>
                    <Col sm={8}>
                        <FormItem label="类型" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <Select placeholder="类型" defaultValue="" style={{ width: '100%' }}>
                                {
                                    Object.keys(this.state.config.type).map(key => <Select.Option value={key}>{this.state.config.type[key]}</Select.Option>)
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col sm={8}>
                        <FormItem label="时间" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} >
                            <DatePicker size="default" />
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

export default Sub1;
