import React from 'react';
import recogx from '../assets/recogx.png';
import { Form, Input, InputNumber, Button, Tabs, Card } from 'antd';
import firebase from './firebase.js';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
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

  const addJob = (values) => {
    console.log(values);
    firebase.database().ref("jobs").child(values.job.company).set({"company":values.job.company, "link": values.job.link,"position":values.job.position,"skills":values.job.skills})
  };
  const addCommunity = (values) => {
    console.log(values);
    firebase.database().ref("communities").child(values.community.name).set({"bio":values.community.bio, "link": values.community.link,"name":values.community.name})
  };
class AdminDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            feedback:"",
            resumes:'',
            users:''
        }
    }
    componentDidMount(){
        this.getUserData();
        this.getFeedbackData();
        this.getResumeData();
      }
      getUserData = () => {
        let ref1 = firebase.database().ref('users');
        ref1.on('value', snapshot => {
          const state = snapshot.val();
          // console.log(state, firebase.auth().currentUser.uid)
          console.log(state[firebase.auth().currentUser.uid])
          let details = state;
          this.setState({users : details});
        });
      }
      getFeedbackData = () => {
        let ref = firebase.database().ref('feedback');
        ref.on('value', snapshot => {
          const state = snapshot.val();
          this.setState({feedback : state});
        });
        console.log('DATA RETRIEVED');
      }
      getResumeData = () => {
        let ref = firebase.database().ref('resumes');
        ref.on('value', snapshot => {
          const state = snapshot.val();
          this.setState({resumes : state});
        });
        console.log('RESUMES RETRIEVED');
      }
    render(){
        const {feedback} = this.state;
        const {resumes} = this.state;
        const {users} = this.state;
        let feedbackkeys = Object.keys(feedback);
        const feedbacklist = feedbackkeys.length ? (
          feedbackkeys.map(
            data => {
                // console.log(data)
              return (
                <Card title={ feedback[data].title } style={{ width: 400,margin:"auto",marginTop:20 }}>
                <p> { feedback[data].description }</p>
                <a href = {"mailto:" + feedback[data].email} style={{textDecoration:"none", color:"#F14CE5", fontSize:14,  marginBottom:"10px"}}><i>Email</i></a>  
              </Card>
              ) 
            }
          ) 
        ) : (
          <div>
            <p style={{textAlign:"center", position:"relative"}}>Loading ... </p>
          </div>
        )
        let resumekeys = Object.keys(resumes);
        const resumelist = resumekeys.length ? (
          resumekeys.map(
            data => {
                console.log(data)
              return (
                <Card title={users[data].name + resumes[data].uid} style={{ width: 400,margin:"auto",marginTop:20 }}>
                <p> { users[data].introduction }</p>
                <a href = {resumes[data].link} target="_blank" >View Resume</a> <br></br>
                <a href = {"mailto:" + users[data].email}   style={{textDecoration:"none", color:"#F14CE5", fontSize:14,  marginBottom:"10px"}}><i>Email</i></a>  
              </Card>
              ) 
            }
          ) 
        ) : (
          <div>
            <p style={{textAlign:"center", position:"relative"}}>Loading ... </p>
          </div>
        )
        return(
            <div>
              <img src={recogx} />
                <h1>Recogx Admin Dashboard</h1>
                <div className="intro" style={{justifyContent:"space-around", width:"80%", margin:"auto"}}>
                    <div>
                    {/* Add jobs */}
                    <Card title="Add Jobs"  style={{ width: 400,marginTop:20 }}>
                        <Form {...layout} name="nest-messages" onFinish={addJob} validateMessages={validateMessages}>
                            <Form.Item
                                name={['job', 'company']}
                                label="Company"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Link"
                                name={['job', 'link']}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter a valid link!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Position"
                                name={['job', 'position']}
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Skills"
                                name={['job', 'skills']}
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                Add
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    {/* Add communities */}
                    <Card title="Add Communities" style={{ width: 400,marginTop:20 }}>
                    <Form {...layout} name="nest-messages" onFinish={addCommunity} validateMessages={validateMessages}>
                            <Form.Item
                                name={['community', 'bio']}
                                label="Bio"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                label="Link"
                                name={['community', 'link']}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter a valid link!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Name"
                                name={['community', 'name']}
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                Add
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    </div>
                {/* Retrieve feedback/testamonials */}
                <Card title="Feedback" style={{ width: 500,marginTop:20 }} bordered={false}>
                    {feedbacklist}
                </Card>
                </div>
                <Card title="Resumes" style={{ width: 500,marginTop:20 }} bordered={false}>
                    {resumelist}
                </Card>
            </div>
        )
    }
}

export default AdminDashboard;
