import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Modal } from 'antd';
import { Avatar,Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import FeedbackForm from './feedbackform';
import firebase from './firebase.js';

const { Option } = Select;
const { TextArea } = Input;

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

const feedbackFinish = (values) => {
    console.log(values);
  };

class DrawerForm extends React.Component {
  state = { visible: false,  modal2Visible: false, details:'' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  componentDidMount(){
    this.getUserData();
  }
  getUserData = () =>{
    let ref = firebase.database().ref('users');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      // console.log(state, firebase.auth().currentUser.uid)
      console.log(state[firebase.auth().currentUser.uid])
      let details = state[firebase.auth().currentUser.uid]
      this.setState({details : details});
    });
    console.log('DATA RETRIEVED');
  }

  // emailUpdate = (e) => {
  //   console.log(e.target.value)
  //   this.setState(prevState => ({
  //     details: {                   
  //         ...prevState.details,    
  //         email: e.target.value       
  //     }
  //  }))
  // }

  // bioUpdate = (e) => {
  //   this.setState(prevState => ({
  //     details: {                   
  //         ...prevState.details,    
  //         introduction: e.target.value       
  //     }
  //  }))
  // }

  updateDetails = (values) => {
    console.log(values)
    this.setState({
      details: {       
         ...this.state.details, 
        email: values.email,
        introduction: values.description   
      }    
    });
    // Update details on firebase
    firebase.database().ref("users").child(firebase.auth().currentUser.uid).update(this.state.details);
  }

  render() {
    // console.log(firebase.auth().currentUser)
    let {details} = this.state;
    let value = details.introduction;
    return (
      <>
       <Avatar
            style ={{backgroundColor: '#DF8FD9'}}
            icon={<UserOutlined />}
            size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
            }}
            onClick={this.showDrawer} style={{position:"fixed", right:20, top:50}}
         />
        <Drawer
          title="Profile"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark onFinish={this.updateDetails}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ message: 'Please enter user name' }]}
                  value = {this.state.details.name}
                >
                  <Input placeholder={this.state.details.name}  value = {this.state.details.name} disabled/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ type:'email', required: true, message: 'Please enter valid email' }]}
                >
                  <Input 
                    placeholder={this.state.details.email}
                    value = {this.state.details.email}
                    // onChange = {this.emailUpdate} 
                    />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder={value}
                    value = {value}
                    autoSize={{ minRows: 3, maxRows: 5 }} 
                    // onChange = {this.bioUpdate}
                  />

                </Form.Item>
              </Col>
            </Row>
            <Form.Item wrapperCol={{ ...layout.wrapperCol}}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>

          </Form>
        {/* <Button type="primary" onClick={() => this.setModal2Visible(true)}>
            Feedback
        </Button> */}
        <Divider />
        <FeedbackForm />
        </Drawer>
        {/* <Modal
          title="Feedback"
          centered
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
          okButtonProps={{form:'feedbackForm', key: 'submit', htmlType: 'submit'}}
          onCancel={() => {
              dispatch({
                  type: 'categoryEditor/closeEditor'
              }) 
          }}
        //   footer={[
        //     <Button key="back" onClick={this.handleCancel}>
        //       Return
        //     </Button>,
        //     <Button key="submit" form="feebackForm" type="primary" htmlType="submit">
        //       Submit
        //     </Button>
        //   ]}
        >
        <Form {...layout} name="nest-messages" onFinish={feedbackFinish} validateMessages={validateMessages} id="feedbackForm">
          <Form.Item
            name={['user', 'title']}
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'description']} label="Description">
          <Input.TextArea />
        </Form.Item>
        </Form>
        </Modal> */}
        
      </>
    );
  }
}

export default DrawerForm