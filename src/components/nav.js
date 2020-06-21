import React from 'react'
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';


class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: "analyze",
        }
    }
    handleClick = (e) => {
        // console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };

    componentDidMount() {
        if(this.props.location.pathname === '/analyze'){
            this.setState({
                current: 'analyze'
            })
        }else if(this.props.location.pathname === '/explore'){
            this.setState({
                current: 'explore'
            })
    }
    }    
    
    render(){
        return(
            <div>
                <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                    <Menu.Item key="analyze">
                    <NavLink to="/analyze" style={{fontSize:16, fontWeight:700, textDecoration:"none"}}>Analyze</NavLink>
                    </Menu.Item>
                    <Menu.Item key="explore">
                    <NavLink to="/explore" style={{fontSize:16, fontWeight:700, textDecoration:"none"}}>Explore</NavLink>
                    </Menu.Item>
                </Menu>        
            </div>
        );
    }   
}

export default withRouter(Nav);