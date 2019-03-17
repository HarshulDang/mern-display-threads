import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	let isUserAuthenticated = false;
    console.log(localStorage.getItem('email'))
    if(localStorage.getItem('email')){
        isUserAuthenticated = true;
    }
    
    return (
	    <Route
	        {...rest}
	        render={ props => ( isUserAuthenticated ? <Redirect to="/activeThreads" /> : <Component {...props} />)
	        }
	    />
    )
};

export default GuestRoute;
