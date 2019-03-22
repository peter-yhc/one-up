import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Splash from './splash/splash';
import Atlas from './atlas/atlas';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/movie" component={Atlas} />
      </Switch>
    </div>
  );
}

export default App;
