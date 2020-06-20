import React from 'react';
import Signin from './signin'

class Intro extends React.Component {
    render() {
      return (
          <div>
              <h1> RecogX </h1>
              <div className="intro">
                <div className="mission">
                    <p>💖 To spread love and opportunities </p> 
                    <p>💖 To spread love and opportunities </p>
                    <p>💖 To spread love and opportunities </p>
                </div>

                <div className="vision">
                    <p> 🦄 To explore possibilities in tech </p>
                    <p> 🦄 To explore possibilities in tech </p>
                    <p> 🦄 To explore possibilities in tech </p>
                </div>
             </div>
              <Signin />
          </div>
      )
    }
}

export default Intro;