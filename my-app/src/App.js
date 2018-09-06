import React, { Component } from 'react';

import axios from 'axios';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      posts: [],
    }
  }

  componentDidMount() {
    this.updatePosts()
  }
  updatePosts = () => {
    axios.get('http://10.22.196.153:4000/v1/posts')
    .then(res => res.data.posts)
    .then(posts => {
      this.setState({posts})
    })
    .catch(function (error) {
      console.log(error);
    });
    setTimeout(this.updatePosts, 1000)
  }

  sendMessage = () => {
    const {username, message} = this.state
    if(this.verifyMessage(username, message)) {
      axios.post('http://10.22.196.153:4000/v1/post', {
          username,
          message
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log('cannot be empty values')
    }
  }

  verifyMessage(user, pass) {
    return(user !== '' && pass !== '')
  }

  render() {
    let posts = this.state.posts.map((posts, key) => {
      return (
        <div key={key}>
          <p><b>{posts.username}: </b> {posts.message}</p>
        </div>
      )
    })
    return (
      <div>

        <input placeholder = 'Username' value={this.state.username} onChange={(e) => {
          this.setState({username: e.target.value})
        }} />
        <br/>

        <input type = 'message' placeholder = 'Message' value={this.state.message} onChange={(e) => {
          this.setState({message: e.target.value})
        }} />
        <br/>

        <button onClick = {this.sendMessage}>Send a massage</button>


        {posts}


      </div>
    );
  }
}

export default App;
