import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Landing extends Component {
	render() {
		return (
			<div style={{ height: "75vh"}} className="container valign-wrapper">
				<div className="row">
					<div className="col s12 center-align">
						<h4>
							A <b>Full Stack Application</b> designed using {" "}
							<span style={{ fontFamily: "monospace" }}>MERN</span>
						
						</h4>	
						<p className="flow-text grey-text text-darken-1">
							The Application that displays thread created by the user
						</p>
						<br />
						<NavLink to="/register" style={{
								width:"150px",
								borderRadius:"3px",
								letterSpacing:"1.5px"
							}}
							className="btn btn-large waves-effect waves-light hoverable blue accent-3"
						>
							Register
						</NavLink>
						<NavLink to="/login"
							style={{
								marginLeft: "2rem",
								width:"150px",
								borderradius:"3px",
								letterSpacing: "1.5px"
							}}
							className="btn btn-large waves-effect white hoverable black-text"
						>
							Log In
						</NavLink>
					</div>
				</div>
			</div>

		);
	}
}

export default Landing;