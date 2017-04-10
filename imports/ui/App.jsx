import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { analytics } from "meteor/okgrow:analytics";

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';
import Form from './Form.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import { Infinitez } from 'react-infinite';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: 'time',
      elements: undefined,
      isInfiniteLoading: false,
    };
  }

  buildElements(start, end, p) {
    console.log("buildElements " + p);
    if (p == undefined) {
      p = this.props.posts;
    }
    if (p[0]) {
      end = Math.min(p.length, end);
      var elements = [];
      for (var i=start; i<end; i++) {
        if (this.state.sortType == 'time') {
          elements.push(<Post
            key={p[i]._id}
            post={p[i]}
            type="post" />);
        } else if (this.state.sortType == 'pop') {
          elements.push(<Post
            key={p[i]._id}
            post={p[i]}
            type="post" />);
        }
      }
      return elements;
    }
  }

  handleInfiniteLoad() {
    var that = this;
    setTimeout(function() {
      if (that.state.elements) {
        that.setState({
          isInfiniteLoading: true,
        });
        var elemLength = that.state.elements.length,
          newElements = that.buildElements(elemLength, elemLength + 1);
        that.setState({
          isInfiniteLoading: false,
          elements: that.state.elements.concat(newElements)
        });
      }
    }, 2500);
  }

  elementInfiniteLoad() {
    return (
      <div>
        Loading...
      </div>
    );
  }

  componentWillUpdate() {
    if (!Meteor.user()) {
      browserHistory.push('/home');
    }
  }

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps newProps: " + newProps.posts);
    if (newProps && newProps.posts[0]) {
      console.log("componentWillReceiveProps " + "success");
      this.setState({
        elements: this.buildElements(0, 2, newProps.posts)
      });
      console.log("componentWillReceiveProps " + "success2");
    } else {
      console.log("componentWillReceiveProps " + "failed");
    }
  }

  renderCreatePostForm() {
    return <Form/>
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
    let toggleButton = null;
    let createPostForm = null;
    if (this.props.currentUser) {
      toggleButton  = this.renderToggleButton();
      createPostForm = this.renderCreatePostForm();
    }
    console.log("rendering " + this.state.elements);
    return (
      <Grid>
        <div className="content">
          <Row>
            <Col lg={6} lgOffset={2} md={8} sm={8} xs={12}>
              {toggleButton}
              <Infinite elementHeight={300}
                         containerHeight={1000}
                         infiniteLoadBeginEdgeOffset={200}
                         onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}>
                {this.state.elements}
              </Infinite>
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
