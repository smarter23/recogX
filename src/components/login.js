import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Button, Tabs } from 'antd';
import firebase from './firebase.js';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const { TabPane } = Tabs;

function callback(key){
  console.log(key);
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Login = () => {
  const onFinish = (values) => {
    console.log(values);
    const details = firebase.database().ref('users');
    details.push(values.user)
  };

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Sign In" key="1">
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label="Age"
          rules={[
            {
              type: 'number',
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'website']} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </TabPane>
      <TabPane tab="Log In" key="2">
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
            name={['user', 'name']}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'age']}
            label="Age"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
    </Tabs>
  );
};

export default Login;