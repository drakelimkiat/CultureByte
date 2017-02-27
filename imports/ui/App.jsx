import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';

// App component - represents the whole app
class App extends Component {


  render() {
    return (

      <div className="container">
        <h1>CultureBytes</h1>
        
        <h4>{this.props.posts[0] != undefined ? this.props.posts[0].name : ''}</h4>
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