import React from 'react';
import Nav from './nav';
import Chat from './chat';
import 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import firebase from './firebase'



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
              <a href={data.link} target="_blank" ><i>Learn More</i></a>  
            </div>
            ) 
          }
        ) 
      ) : (
        <div>
        </div>
      )
      return (
          <div>
              <h1> Explore Communities </h1>
              <div className="communities">
                 {communitylist}
              </div> 
              <Chat />
              <Nav />
          </div>
      )
    }
}

export default Explore;