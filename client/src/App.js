import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import "./styles.scss";
import { Redirect } from 'react-router-dom';
import BubblePage from './components/BubblePage';

export function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <Route path="/bubblePage" render={props => privateRoute(BubblePage, props)} />
      </div>
    </Router>
  );
}

function privateRoute (Component, props) {
  if (localStorage.getItem('token')) {
    return <Component {...props}/>
  }
  else {
    return <Redirect to="/"/>
  }
}

export default App;
