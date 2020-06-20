import React from 'react';
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Google from '../assets/google-icon.svg'


class Signin extends React.Component {
    render() {
      return (
          <div>
               <Button size="large">Sign In <img src={Google} className="google"/></Button>
          </div>
      )
    }
}

export default Signin;