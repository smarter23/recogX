import React from 'react';
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Nav from './nav';
import Chat from './chat';
import 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import firebase from "./firebase";
import FileUploader from "react-firebase-file-uploader";
import recogx from '../assets/recogx.png'



class Analyze extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        jobs: "",
    }
}

  componentDidMount(){
    this.getUserData();
  }
  getUserData = () => {
    let ref = firebase.database().ref('jobs');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState({jobs : state});
    });
    console.log('DATA RETRIEVED');
  }

    
  handleUploadStart = () => console.log("start");
  handleProgress = progress => console.log(progress)
  handleUploadError = error => {
    // this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("resume")
      .child(filename)
      .getDownloadURL()
      .then(url => console.log(url));
  };
    render() {

      const {jobs} = this.state;
      const jobslist = jobs.length ? (
        jobs.map(
          data => {
            return (
              <div className="community">
              <h4> 🌟{ data.company }</h4>
              <p> { data.position }</p>
              <p> Skill -  { data.skills }</p>
              <a href={data.link} target="_blank" style={{textDecoration:"none", color:"#F14CE5", fontSize:14}}><i>Learn More</i></a>  
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
              <img src={recogx} style={{position: "fixed",left: "34px",height: "7vh"}}/>

              <h1> Resume Analysis </h1>

              <div style={{marginBottom:"5vh"}}> 
                  <p>✨ upload your resume and let our engines do the magic!</p>
                  <p>✨ top analysis and reviews</p>
                  <p>✨ job opportunities</p>

              </div>
              {/* <Button size="large">Upload PDF</Button> */}
              <label style={{backgroundColor: "#D8A1D4", color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer', marginTop:"20px"}}>
                Upload Resume
              <FileUploader
                accept="pdf/*"
                name="avatar"
                hidden
                randomizeFilename
                storageRef={firebase.storage().ref("resume")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
            />
            </label>

              
              <div className="communities">
              <h2 style={{textAlign:"left", marginTop:"10px"}}>Job listings</h2>
                {jobslist}
              </div>

              <Chat />
              <Nav />
          </div>
      )
    }
}

export default Analyze;