import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { analytics } from "meteor/okgrow:analytics";

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';
import Form from './Form.jsx';
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
      if (this.props.posts[0]) {
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

  renderBackButton() {
      // Check if we are at the start of the list
      if (this.state.index != 0) {
          return <button onClick={this.previousPost.bind(this)}>Previous Post</button>;
      } else {
          return <button disabled>First post!</button>;
      }
  }

  renderCreatePostForm() {
    return <Form/>
  }

  nextPost() {
      // Track next post in Google Analytics
      analytics.track('NextPost', {
        Username: Meteor.user().username,
        UserId: Meteor.user()._id
      });
      this.setState({
          index: this.state.index + 1
      });
  }

  previousPost() {
    // Track previous post in Google Analytics
    analytics.track('PreviousPost', {
      Username: Meteor.user().username,
      UserId: Meteor.user()._id
    });
    this.setState({
        index: this.state.index - 1
    });
  }

  render() {
    document.title = 'PostPage';
    let postView = null;
    let nextButton = null;
    let backButton = null;
    let createPostForm = null;
    if (this.props.currentUser) {
        postView = this.renderPost();
        nextButton = this.renderNextButton();
        backButton = this.renderBackButton();
        createPostForm = this.renderCreatePostForm();
    }
    return (
      <div className="container">
        <h1>CultureBytes</h1>
        <AccountsUIWrapper />
        {postView}
        {backButton}
        {nextButton}
        <br/><br/>
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
