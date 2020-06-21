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


class Analyze extends React.Component {

    
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
      return (
          <div>
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

              <div className="results"></div>

              <Chat />
              <Nav />
          </div>
      )
    }
}

export default Analyze;