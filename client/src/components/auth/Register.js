import React, { Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

var querystring = require('querystring');

class Register extends Component {
	constructor(){
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};
		this.onClick = this.onClick.bind(this);
		this.insertSignInData = this.insertSignInData.bind(this);
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		console.log('newUser');
	};

	onClick(e) {
      this.insertSignInData(this)
      		.then(res => {
      			alert("Registration Successfully")
      			localStorage.setItem('email', this.state.email)
      			this.props.history.push('/activeThreads',{email: this.state.email})
      		})
      		.catch(err => {
        		console.log("err",err) 
        		alert('Email already exists');
      		})
	};

	insertSignInData(e) {
		console.log(e.state.name,e.state.email,e.state.password)
		return axios({
				  method: 'post',
				  url: 'http://localhost:5000/api/users/register',
				  data: {
				    	  name: e.state.name,
				          email: e.state.email,
				          password: e.state.password
				  }
				})
      // axios.post('http://localhost:5000/api/users/register',{
      //     name: e.state.name,
      //     email: e.state.email,
      //     password: e.state.password
      //   })
      // .then(res => console.log(res))
      // .catch(err => console.log("err",err))
    }


    

	render() {
		const { errors } = this.state;

		return (
			<div className="container">
				<div className="row">
					<div className="col s8 offset-s2">
						<Link to="/" className="btn-flat waves-effect">
							<i className="material-icons left">keyboard_backspace</i>
							Back to home
						</Link>
						<div className="col s12" style={{ paddingLeft:"11.250px"}}>
							<h4>
								<b>Register</b> below
							</h4>
							<p className="grey-text text-darken-1">
								Already have an account? <Link to="/login">Log in</Link>
							</p>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.name}
									error={errors.name}
									id="name"
									type="text"
								/>
								<label htmlFor="name">Name</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.email}
									error={errors.email}
									id="email"
									type="email"
								/>
								<label htmlFor="name">Email</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.password}
									error={errors.password}
									id="password"
									type="password"
								/>
								<label htmlFor="name">Password</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.password2}
									error={errors.password2}
									id="password2"
									type="password"
								/>
								<label htmlFor="name">Confirm Password</label>
							</div>
							<div className="col s12" style={{ paddingLeft: "11.250" }}>
								<button onClick={this.onClick}
								 	style={{
								 		width: "150px",
								 		borderRadius: "3px",
								 		letterSpacing:"1.5px",
								 		marginTop: "1rem"
								 	}}
								 	type= "submit"
								 	className="btn btn-large waves-effect waves-light hoverable blue accent-3">
								 	Sign Up
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;