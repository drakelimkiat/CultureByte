import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';
import Form from './Form.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { browserHistory } from 'react-router';

class Contribution extends Component {
  constructor(props) {
      super(props);
      this.state = {
          index: 0,
      };
  }

  renderPost() {
    if (this.props.posts[0]) {
      return <Post
        key={this.props.posts[this.state.index]._id}
        post={this.props.posts[this.state.index]}
        type="contribution" />
    }
  }

  componentWillMount() {
    if (!Meteor.user()) {
      browserHistory.push('/');
      return;
    }
  }

  componentWillUpdate() {
    if (!Meteor.user()) {
      browserHistory.push('/');
      return;
    }
  }

  renderNextButton() {
      if (this.props.posts.length == 0) {
        return;
      }

      var index = this.state.index;
      var postArray = this.props.posts;
      // Check if we are at the end of the list
      if (postArray.length != index + 1) {
          return <button className="next" onClick={this.nextPost.bind(this)}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>;
      } else {
          return <button className="next" disabled><i className="fa fa-arrow-right" aria-hidden="true"></i></button>;
      }
  }

  renderBackButton() {
      if (this.props.posts.length == 0) {
        return;
      }

      var index = this.state.index;
      // Check if we are at the start of the list
      if (index != 0) {
          return <button onClick={this.previousPost.bind(this)}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>;
      } else {
          return <button disabled><i className="fa fa-arrow-left" aria-hidden="true"></i></button>;
      }
  }

  nextPost() {
    this.setState({
        index: this.state.index + 1
    });
  }

  previousPost() {
    this.setState({
        index: this.state.index - 1
    });
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          {this.renderPost()}
          <div className="pagination">
            {this.renderBackButton()}
            {this.renderNextButton()}
          </div>
        </div>
      </div>
    );
  }
}

Contribution.propTypes = {
    posts: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('posts');

    return {
        posts: Posts.find({author: Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    };
}, Contribution);
