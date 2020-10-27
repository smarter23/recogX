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
  const onFinishSignUp = (values) => {
    console.log(values);
    firebase.auth().createUserWithEmailAndPassword(values.user.email, values.user.password)
    .then(function(res){
      console.log(res)
      if(res.isNewUser){
      // Add Details in Firebase
      const details = firebase.database().ref('users');
      details.push(values.user)
      // Add redirect 
      localStorage.setItem('loggedIn',1);
      localStorage.setItem('uid', firebase.auth().currentUser.uid);
      this.props.logs.history.push('/analzye');
      }
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      let msg = document.getElementById("msg");
      if(errorCode == 'auth/email-already-in-use'){
        msg.innerHTML = "Email exists"
      } else{
        msg.innerHTML = ""
      }
    });

  };
  const onFinishLogin = (values) => {
    console.log(values);
    firebase.auth().signInWithEmailAndPassword(values.user.email, values.user.password)
    .then(function(res){
      console.log(res);
      localStorage.setItem('loggedIn',1);
      localStorage.setItem('uid', firebase.auth().currentUser.uid);
      this.props.logs.history.push('/analzye');
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      let msg = document.getElementById("stat");
      if(errorCode == 'auth/user-not-found'){
        msg.innerHTML = "Please Sign Up first"
      } else{
        msg.innerHTML = ""
      }
    });
  };


  return (
    <Tabs defaultActiveKey="1" onChange={callback} className="loginTab">
      <TabPane tab="Sign Up" key="1">
        <Form {...layout} name="nest-messages" onFinish={onFinishSignUp} validateMessages={validateMessages}>
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
              required:true
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
          <Form.Item
          name={['user', 'gender']}
          label="Gender"
          rules={[
            {
              required: true,
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
        <Form.Item name={['user', 'introduction']} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p id="msg" style={{color:"red"}}></p>
      </TabPane>
      <TabPane tab="Log In" key="2">
        <Form {...layout} name="nest-messages" onFinish={onFinishLogin} validateMessages={validateMessages}>
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
        <p id="stat" style={{color:"red"}}></p>
      </TabPane>
    </Tabs>
  );
};

export default Login;