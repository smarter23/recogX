import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Modal } from 'antd';
import { Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import FeedbackForm from './feedbackform';

const { Option } = Select;

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
  state = { visible: false,  modal2Visible: false };

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

  render() {
    return (
      <>
       <Avatar
            size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
            }}
            icon={<AntDesignOutlined />}
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
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
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        {/* <Button type="primary" onClick={() => this.setModal2Visible(true)}>
            Feedback
        </Button> */}
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