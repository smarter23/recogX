import React from 'react';
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Nav from './nav';
import Chat from './chat';

class Analyze extends React.Component {
    render() {
      return (
          <div>
              <h1> Resume Analysis </h1>

              <div> 
                  <p>✨ upload your resume and let our engines do the magic!</p>
                  <p>✨ top analysis and reviews</p>
                  <p>✨ job opportunities</p>

              </div>
              <Button size="large">Upload PDF</Button>
              <div className="results"></div>

              <Chat />
              <Nav />
          </div>
      )
    }
}

export default Analyze;