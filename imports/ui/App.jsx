import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';
import Form from './Form.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          index: 0,
          popIndex: 0,
          sortType: 'time'
      };
  }

  renderPost() {
      if (this.state.sortType == 'time') {
        if (this.props.posts[0]) {
            return <Post
                key={this.props.posts[this.state.index]._id}
                post={this.props.posts[this.state.index]} />
        }
      } else if (this.state.sortType == 'pop') {
        if (this.props.popPosts[0]) {
            return <Post
                key={this.props.popPosts[this.state.popIndex]._id}
                post={this.props.popPosts[this.state.popIndex]} />
        }
      }
  }

  renderNextButton() {
      let index = null;
      let postArray = null;
      if (this.state.sortType == 'time') {
        index = this.state.index;
        postArray = this.props.posts;
      } else if (this.state.sortType == 'pop') {
        index = this.state.popIndex;
        postArray = this.props.popPosts;
      }
      // Check if we are at the end of the list
      if (postArray.length != index + 1) {
          return <button className="next" onClick={this.nextPost.bind(this)}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>;
      } else {
          return <button className="next" disabled><i className="fa fa-arrow-right" aria-hidden="true"></i></button>;
      }
  }

  renderBackButton() {
      let index = null;
      if (this.state.sortType == 'time') {
        index = this.state.index;
      } else if (this.state.sortType == 'pop') {
        index = this.state.popIndex;
      }
      // Check if we are at the start of the list
      if (index != 0) {
          return <button onClick={this.previousPost.bind(this)}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>;
      } else {
          return <button disabled><i className="fa fa-arrow-left" aria-hidden="true"></i></button>;
      }
  }

  renderCreatePostForm() {
    return <Form/>
  }

  nextPost() {
    if (this.state.sortType == 'time') {
      this.setState({
          index: this.state.index + 1
      });
    } else if (this.state.sortType == 'pop') {
      this.setState({
          popIndex: this.state.popIndex + 1
      });
    }
  }

  previousPost() {
    if (this.state.sortType == 'time') {
      this.setState({
          index: this.state.index - 1
      });
    } else if (this.state.sortType == 'pop') {
      this.setState({
          popIndex: this.state.popIndex - 1
      });
    }
  }

  renderToggleButton() {
    if (this.state.sortType == 'time') {
      return <div className="category"><button className="category-button enable" onClick={this.onToggleBetweenTimeAndPop.bind(this)}>New <i className="fa fa-clock-o" aria-hidden="true"></i></button><button className="category-button" onClick={this.onToggleBetweenTimeAndPop.bind(this)}>Hot <i className="fa fa-fire" aria-hidden="true"></i></button></div>;
    } else if (this.state.sortType == 'pop') {
      return <div className="category"><button className="category-button" onClick={this.onToggleBetweenTimeAndPop.bind(this)}>New <i className="fa fa-clock-o" aria-hidden="true"></i></button><button className="category-button enable" onClick={this.onToggleBetweenTimeAndPop.bind(this)}>Hot <i className="fa fa-fire" aria-hidden="true"></i></button></div>;
    }
  }

  onToggleBetweenTimeAndPop() {
    if (this.state.sortType == 'time') {
      this.setState({
        sortType: 'pop'
      })
    } else if (this.state.sortType == 'pop') {
      this.setState({
        sortType: 'time'
      })
    }
  }

  render() {
    let postView = null;
    let toggleButton = null;
    let nextButton = null;
    let backButton = null;
    let createPostForm = null;
    if (this.props.currentUser) {
        postView = this.renderPost();
        toggleButton  = this.renderToggleButton();
        nextButton = this.renderNextButton();
        backButton = this.renderBackButton();
        createPostForm = this.renderCreatePostForm();
    }
    return (
      <div className="container">
        <div className="content">
          {toggleButton}
          {postView}
          {createPostForm}
          <div className="pagination">
            {backButton}
            {nextButton}
          </div>
          <AccountsUIWrapper />
        </div>
      </div>
    );
  }
}

App.propTypes = {
    posts: PropTypes.array.isRequired,
    popPosts: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('posts');

    return {
        posts: Posts.find({}).fetch(),
        popPosts: Posts.find({}, {
            sort: { liked_count: -1 }
          }).fetch(),
        currentUser: Meteor.user()
    };
}, App);
