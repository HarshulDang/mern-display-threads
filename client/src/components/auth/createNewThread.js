import React , { Component } from 'react';
import {Modal} from 'react-materialize';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button, Icon} from 'react-materialize';


export default class CreateNewThread extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			tags: '',
			date: '',
			messageFromServer: '',
			modalIsOpen: false
		}
		this.openModal = this.openModal.bind(this);
      	this.closeModal = this.closeModal.bind(this);
      	this.insertThread = this.insertThread.bind(this);
      	this.onClick = this.onClick.bind(this);
      	this.handleTextChange = this.handleTextChange.bind(this);
	}

	openModal() {
      this.setState({
        modalIsOpen: true
      });
    }

    closeModal() {
      this.setState({
        modalIsOpen: false,
        title: '',
        description: '',
        tags: '',
        date: ''
      });
    }

    onClick(e) {
      this.insertThread(this);
      console.log('Modal on click')
      console.log(this.state.title,this.state.description,this.state.tags,this.state.date)
      // this.props.onNewThreadCreate(this.state.title,this.state.description,this.state.tags,this.state.date);


	};

	insertThread(e) {
		console.log(e.state.title,e.state.description,e.state.tags,e.state.date)
		axios({
				  method: 'post',
				  url: 'https://displaythreads.herokuapp.com/api/users/insert',
				  data: {
				    	  title: e.state.title,
				          description: e.state.description,
				          tags: e.state.tags,
				          date: e.state.date,
				          postedBy: localStorage.getItem('email')
				          
				  }
				})
			.then(res => {
				console.log(res);
				e.setState({ messageFromServer: res.data.message});
				this.props.onNewThreadCreate(this.state.title,this.state.description,this.state.tags,this.state.date);
			})
			.catch(err => console.log("err",err))

	}

	handleTextChange(e) {
      if (e.target.name == "title") {
        this.setState({
          title: e.target.value
        });
      }
      if (e.target.name == "description") {
        this.setState({
          description: e.target.value
        });
      }
      if (e.target.name == "tags") {
        this.setState({
          tags: e.target.value
        });
      }
      if (e.target.name == "date") {
        this.setState({
          date: e.target.value
        });
      }
    }


	render() {
		return(
				  <div>
					  	<Modal					  		
					  		header='Add New Thread'
  							trigger={<Button floating large className='red' waves='light' icon='add' onClick={this.openModal}
  								style={{bottom:"8%", right: "5%",position:'absolute'}}></Button>}
	            			isOpen={this.state.modalIsOpen}
	            			onRequestClose={this.closeModal}
	          				className="Modal">

	          				{this.state.messageFromServer
	          					?
	          						(
	          							<div>{this.state.messageFromServer}</div>
	          						)
	          					:
	          						(
		          						<div>
		          							<div>
						       					<label for="title">Title:</label><input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTextChange}></input>
						       					<label for="description">Description:</label><input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}></input>
								  				<label for="tags">Tags:</label><input type="text" id="tags" name="tags" value={this.state.tags} onChange={this.handleTextChange}></input>
								  				<label for="date">Date:</label><input type="text" id="date" name="date" value={this.state.date} onChange={this.handleTextChange}></input>
											</div>
											<div className="button-center">
												<Button waves='light' onClick={this.onClick}>Add New Thread</Button>
											</div>
										</div>
	          						) 
	          				}
	          					
						</Modal>
					</div>
				
		);
	}
}