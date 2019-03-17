import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Link} from "react-router-dom";
import './App.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ActiveThreads from "./components/auth/activeThreads";
import GuestRoute from "./components/route/GuestRoute";
import UserRoute from "./components/route/UserRoute";

class App extends Component {
  render() {
    
    return (
    
  	    <Router>
  	      <div className="App">
  	        <Navbar />
  	        <Route exact path="/" component={Landing}/>
            <GuestRoute
                path="/login"
                exact
                component={Login}
            />
            <GuestRoute
                path="/register"
                exact
                component={Register}
            />
            <UserRoute
                path="/activeThreads"
                exact
                component={ActiveThreads}
            />
            
  	      </div>
  	    </Router>
      
    );
  }
}

export default App;
