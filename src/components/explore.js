import React from 'react';
import Nav from './nav';
import Chat from './chat';
import Sidebar from './sidebar';
import 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import firebase from './firebase';
import recogx from '../assets/recogx.png'
import { Avatar } from 'antd';
// import "antd/dist/antd.css";
import { UserOutlined } from '@ant-design/icons';





class Explore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        communities: "",
    }
}

  componentDidMount(){
    this.getUserData();
  }
  getUserData = () => {
    let ref = firebase.database().ref('communities');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState({communities : state});
    });
    console.log('DATA RETRIEVED');
  }
    render() {
      const {communities} = this.state;
      const communitylist = communities.length ? (
        communities.map(
          data => {
            return (
              <div className="community">
              <h2> 🌟{ data.name }</h2>
              <p> { data.bio }</p>
              <a href={data.link} target="_blank" style={{textDecoration:"none", color:"#F14CE5", fontSize:14, marginBottom:"10px"}}><i>Learn More</i></a>  
            </div>
            ) 
          }
        ) 
      ) : (
        <div>
          <p style={{textAlign:"center", position:"fixed", left:"50%"}}>Loading ... </p>
        </div>
      )
      return (
          <div>
              <img src={recogx} style={{position: "fixed",left: "34px",height: "7vh"}} className="sidelogo"/>
              <h1> Explore Communities </h1>
              {/* <Avatar style={{ color: '#ffff', backgroundColor: '#DF8FD9', position: "fixed",right: "34px" }}>A</Avatar> */}
              <div className="communities">
                 {communitylist}
              </div> 
              <Chat />
              <Sidebar />
              <Nav />
          </div>
      )
    }
}

export default Explore;