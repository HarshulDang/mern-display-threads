import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	let isUserAuthenticated = false;
    // console.log(localStorage.getItem('email'))
    if(localStorage.getItem('email')){
        isUserAuthenticated = true;
    }

    return (

	    <Route
	        {...rest}
	        render={props =>
	            ((isUserAuthenticated) ? <Component {...props} /> : <Redirect to="/" />)
	        }
	    />
	)
};


export default UserRoute;
