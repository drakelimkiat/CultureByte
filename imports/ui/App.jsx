import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

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
          return <Post
              key={this.props.posts[this.state.index]._id}
              post={this.props.posts[this.state.index]} />
      }
  }

  renderNextButton() {
      // Check if we are at the end of the list
      if (this.props.posts.length != this.state.index + 1) {
          return <button onClick={this.nextPost.bind(this)}>Next Post</button>;
      } else {
          return <button disabled>No more posts!</button>;
      }
  }

  renderCreatePostForm() {
    return <Form/>
  }

  nextPost() {
      this.setState({
          index: this.state.index + 1
      });
  }

  render() {
    let postView = null;
    let nextButton = null;
    let createPostForm = null;
    if (this.props.currentUser) {
        postView = this.renderPost();
        nextButton = this.renderNextButton();
        createPostForm = this.renderCreatePostForm();
    }
    return (
      <div className="container">
        <h1>CultureBytes</h1>
        <AccountsUIWrapper />
        {postView}
        {nextButton}
        {createPostForm}
      </div>
    );
  }
}

App.propTypes = {
    posts: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('posts');

    return {
        posts: Posts.find({}).fetch(),
        currentUser: Meteor.user()
    };
}, App);

class Form extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Get input title and body
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const body = ReactDOM.findDOMNode(this.refs.bodyInput).value.trim();

    // Create new post
    Meteor.call('posts.insert', title, body);

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