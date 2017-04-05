import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { analytics } from "meteor/okgrow:analytics";

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';
import Form from './Form.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { browserHistory } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

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

  componentWillUpdate() {
    if (!Meteor.user()) {
      browserHistory.push('/home');
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.posts.length == 0) {
      return;
    }

    if (newProps.posts.length != this.props.posts.length) {
      if (this.state.sortType == 'time') {
        this.setState({
          index: 0
        });
      } else if (this.state.sortType == 'pop') {
        this.setState({
          popIndex: newProps.popPosts.length - 1
        });
      }
      return;
    }
  }

  renderPost() {
    if (this.state.sortType == 'time') {
      if (this.props.posts[0]) {
        return <Post
          key={this.props.posts[this.state.index]._id}
          post={this.props.posts[this.state.index]}
          type="post" />
      }
    } else if (this.state.sortType == 'pop') {
      if (this.props.popPosts[0]) {
        return <Post
          key={this.props.popPosts[this.state.popIndex]._id}
          post={this.props.popPosts[this.state.popIndex]}
          type="post" />
      }
    }
  }

  renderNextButton() {
    if (this.props.posts.length == 0) {
      return;
    }

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
      return <button className="next pagination-button" onClick={this.nextPost.bind(this)}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>;
      } else {
        return <button className="next pagination-button" disabled><i className="fa fa-arrow-right" aria-hidden="true"></i></button>;
        }
      }

      renderBackButton() {
        if (this.props.posts.length == 0) {
          return;
        }

        let index = null;
        if (this.state.sortType == 'time') {
          index = this.state.index;
        } else if (this.state.sortType == 'pop') {
          index = this.state.popIndex;
        }
        // Check if we are at the start of the list
        if (index != 0) {
          return <button className="back pagination-button" onClick={this.previousPost.bind(this)}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>;
          } else {
            return <button className="back pagination-button" disabled><i className="fa fa-arrow-left" aria-hidden="true"></i></button>;
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

            if (this.state.sortType == 'time') {
              this.setState({
                index: this.state.index + 1
              });
              analytics.track('NewNextPost', {
                Username: Meteor.user().username,
                UserId: Meteor.user()._id
              });
            } else if (this.state.sortType == 'pop') {
              this.setState({
                popIndex: this.state.popIndex + 1
              });
              analytics.track('HotNextPost', {
                Username: Meteor.user().username,
                UserId: Meteor.user()._id
              });
            }
          }

          previousPost() {
            // Track previous post in Google Analytics
            analytics.track('PreviousPost', {
              Username: Meteor.user().username,
              UserId: Meteor.user()._id
            });

            if (this.state.sortType == 'time') {
              this.setState({
                index: this.state.index - 1
              });
              analytics.track('NewPreviousPost', {
                Username: Meteor.user().username,
                UserId: Meteor.user()._id
              });
            } else if (this.state.sortType == 'pop') {
              this.setState({
                popIndex: this.state.popIndex - 1
              });
              analytics.track('HotPreviousPost', {
                Username: Meteor.user().username,
                UserId: Meteor.user()._id
              });
            }
          }

          renderToggleButton() {
            if (this.state.sortType == 'time') {
              return (
                <div className="category">
                  <button className="category-button enable" onClick={this.onToggleBetweenTimeAndPop.bind(this)}>New <i className="fa fa-clock-o" aria-hidden="true"></i></button>
                  <button className="category-button" onClick={this.onToggleBetweenTimeAndPop.bind(this)}>Hot <i className="fa fa-fire" aria-hidden="true"></i></button>
                </div>
              );
            } else if (this.state.sortType == 'pop') {
              return (
                <div className="category">
                  <button className="category-button" onClick={this.onToggleBetweenTimeAndPop.bind(this)}>New <i className="fa fa-clock-o" aria-hidden="true"></i></button>
                  <button className="category-button enable" onClick={this.onToggleBetweenTimeAndPop.bind(this)}>Hot <i className="fa fa-fire" aria-hidden="true"></i></button>
                </div>
              );
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
            document.title = 'Post';
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
              <Grid>
                <div className="content">
                  <Row>
                    <Col lg={6} lgOffset={2} md={8} sm={8} xs={12}>
                      {toggleButton}
                      {postView}
                      {backButton}
                      {nextButton}
                    </Col>
                    <Col lg={3} lgPull={1} md={4} sm={4} xs={12}>
                      {createPostForm}
                    </Col>
                  </Row>
                </div>
              </Grid>
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
            posts: Posts.find({}, {
              sort: { createdAt: -1 }
            }).fetch(),
            popPosts: Posts.find({}).fetch(),
            currentUser: Meteor.user()
          };
        }, App);
