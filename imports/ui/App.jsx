import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          index: 0
      };
  }

  renderPost() {
      if (this.props.posts[0] != undefined) {
          console.log(this.props.posts);
          return <Post
              key={this.props.posts[this.state.index]._id}
              post={this.props.posts[this.state.index]} />
      }
  }

  nextPost() {
      this.setState({
          index: this.state.index + 1
      });
  }

  render() {
    return (
      <div className="container">
        <h1>CultureBytes</h1>
        {this.renderPost()}
        <button onClick={this.nextPost.bind(this)}>Next Post</button>

        <br/><br/>

        <Form/>
      </div>
    );
  }
}

App.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('posts');

    return {
        posts: Posts.find({}).fetch()
    };
}, App);

class Form extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Get input title and body
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const body = ReactDOM.findDOMNode(this.refs.bodyInput).value.trim();
    console.log(title)
    console.log(body)

    // Create new post
    Posts.insert({
      title: title,
      body: body
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.titleInput).value = '';
    ReactDOM.findDOMNode(this.refs.bodyInput).value = '';
  }

  render() {
    return (
      <div className="form">
        <form className="new-post" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="titleInput" placeholder="Title"/>
          <input type="text" ref="bodyInput" placeholder="Body"/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}