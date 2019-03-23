import React from 'react';
import CreateNewThread from './createNewThread';
import axios from 'axios';
import {Button, Icon} from 'react-materialize';


class ActiveThreads extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.getData = this.getData.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getData(this);
  }

  handleOnThreadCreate = (title,description,tags,date) => {
    // console.log('parent triggered');
    // console.log(title,description,tags,date);
    this.getData(this);
  } 

  onClick(){
    localStorage.clear()
    this.props.history.push('/')
  }

 


  getData(e){
    axios.get('https://displaythreads.herokuapp.com/api/users/getAll')
      .then(function(response) {
        // console.log(response)
        e.setState({data: response.data});
        
    });
}

	render() {
    return (

      <div>
          
        <table>
          <thead>
            <tr><th></th><th className='desc-col'>Title</th><th className='button-col'>Description</th><th className='button-col'>Tags</th><th className='button-col'>Date</th><th className='button-col'>Posted By</th></tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(thread){
                return  <tr><td className='counterCell'></td><td className='desc-col'>{thread.title}</td><td className='button-col'>{thread.description}</td><td className='button-col'>{thread.tags}</td><td className='button-col'>{thread.date}</td><td className='button-col'>{thread.postedBy}</td></tr>
              })
            }
            </tbody>
        </table>
        <CreateNewThread onNewThreadCreate={(title,description,tags,date)=>this.handleOnThreadCreate(title,description,tags,date)}/>
        <div className="button-center">
            <Button waves='light' onClick={this.onClick} style={{position: "absolute", top:"8%", right: "5%"}}>Log Out</Button>
        </div>
      </div>


      
          
          
    );
  }
} 

export default ActiveThreads;