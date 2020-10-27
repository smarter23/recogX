import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import recogx from '../assets/recogx.png';
import { Redirect } from 'react-router-dom';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

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
  const onFinish = (values) => {
    console.log(values);
    if(values.user.email == "admin@recogx.com"){
        console.log('GOoo')
        let msg = document.getElementById('adstat');
        msg = '';
        localStorage.setItem('adminrecogx', 1);
        this.context.history.push('/recogx-admin-dashboard')
    } else {
        let msg = document.getElementById('adstat');
        msg.innerHTML = "Only Whitelisted people can apply";
    }
  };

class Admin extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
              <img src={recogx} />
                <h1>Admin of Recogx</h1>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                        {
                            type: 'email',
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name={['user', 'password']}
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
                <p id="adstat"></p>
                {/* Retrieve feedback/testamonials */}
                {/* Add communities */}
                {/* Add jobs */}
            </div>
        )
    }
}

export default Admin;
