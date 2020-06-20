import React from 'react';
import './App.css';
import Intro from './components/intro';
import Analyze from './components/analyser';
import Explore from './components/explore';

import { Route, BrowserRouter, Redirect, withRouter, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={Intro} />
        <Route exact path='/analyze' component={Analyze} />
        <Route exact path='/explore' component={Explore} />
      </Switch>
      {/* Footer */}
    </div>
    </BrowserRouter>
  );
}

export default App;
