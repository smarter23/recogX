import React from 'react';
import Signin from './signin';
import Login from './login';
import recogx from '../assets/recogx.png'

class Intro extends React.Component {
    componentDidMount(){
        if(localStorage.getItem("loggedIn")){
            this.props.history.push('/analyze')
        }
    }
    render() {
      return (
          <div>
              <img src={recogx} />
              <div className="intro">
                <div className="intro-flex">
                    <div className="mission">
                        <h3>Mission</h3>
                        <p> <span role="img">💖 </span> Development: Help you make your mark in the tech field </p> 
                        <p> <span role="img">💖 </span> Inclusion: Everyone matters and matters equally. </p>
                        <p> <span role="img">💖 </span> Empowerment: Finding opportunities for all and help them grow in tech </p>
                    </div>

                    <div className="vision">
                        <h3>Vision</h3>
                        <p> 🦄 Diversity: Our differences spark innovation and bringing everyone together under the same roof </p>
                        <p> 🦄 Making a difference: Making a positive change in the world with access to opportunity </p>
                        <p> 🦄 Mentorship: Guidance from top class experts in their fields </p>
                    </div>
                </div>
                <Login logs={this.props}/>
              </div>
              <Signin logs={this.props}/>
          </div>
      )
    }
}

export default Intro;