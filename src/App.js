import React from 'react';
import './App.css';
import Intro from './components/intro';
import Analyze from './components/analyser';
import Explore from './components/explore';
import Admin from './components/admin';
import AdminDashboard from './components/admindashboard';


import { Route, BrowserRouter, Redirect, withRouter, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={Intro} />
        <Route exact path='/analyze' component={Analyze} />
        <Route exact path='/explore' component={Explore} />
        <Route exact path='/recogx-admin' component={Admin} />
        <Route exact path='/recogx-admin-dashboard' component={AdminDashboard} />
      </Switch>
      {/* Footer */}
    </div>
    </BrowserRouter>
  );
}

export default App;
