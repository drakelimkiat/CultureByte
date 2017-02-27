import React, { Component, PropTypes } from 'react';
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
      if (this.props.posts[0]) {
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

