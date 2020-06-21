import React from 'react';
import { Button, Radio } from 'antd';
import { Avatar } from 'antd';
import "antd/dist/antd.css";
import Nav from './nav';
import Chat from './chat';
import 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import firebase from "./firebase";
import FileUploader from "react-firebase-file-uploader";
import recogx from '../assets/recogx.png';



class Analyze extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        jobs: "",
        url:""
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
  handleProgress = progress => {console.log(progress); this.setState({progress:"Analyzing"})}
  handleUploadError = error => {
    // this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    let urlu;
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("resume")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        let urlu = url;
        console.log(url,urlu)
        this.setState({url:url})
      });
    firebase.database().ref("resumes").child(localStorage.getItem('uid')).set({"link":'', "skills":[''], "uid": localStorage.getItem('uid')})

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
              <a href={data.link} target="_blank" style={{textDecoration:"none", color:"#F14CE5", fontSize:14,  marginBottom:"10px"}}><i>Learn More</i></a>  
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

              <h1> Resume Analysis </h1>

              {/* <Avatar style={{ color: '#fffff', backgroundColor: '#DF8FD9',position: "fixed",right: "34px" }}>A</Avatar> */}

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

            <div className="results" style={{marginTop:"20px"}}>{this.state.progress}</div>
              
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