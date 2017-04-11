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

  componentWillUpdate() {
    if (!Meteor.user()) {
      browserHistory.push('/home');
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps && newProps.posts[0]) {
      if (this.state.elements == undefined) {
        this.setState({
          elements: this.buildElements(0, 5, newProps.posts)
        });
      } else {
        if (this.state.sortType == "time") {
          this.setState({
            elements: this.buildElements(0, this.state.elements.length, newProps.posts)
          });
        } else if (this.state.sortType == "pop") {
          this.setState({
            elements: this.buildElements(0, this.state.elements.length, newProps.popPosts)
          });
        }
      }
    }
  }

  buildElements(start, end, p) {
    if (p[0]) {
      end = Math.min(p.length, end);
      var elements = [];
      for (var i=start; i<end; i++) {
        elements.push(<Post
          key={p[i]._id}
          post={p[i]}
          type="post" />);
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
        var elemLength = that.state.elements.length;
        var newElements = [];
        if (that.state.sortType == "time") {
          newElements = that.buildElements(0, elemLength + 5, that.props.posts);
        } else if (that.state.sortType == "pop") {
          newElements = that.buildElements(0, elemLength + 5, that.props.popPosts);
        }
        that.setState({
          isInfiniteLoading: false,
          elements: newElements,
        });
      }
    }, 1500);
  }

  elementInfiniteLoad() {
    var text = "";
    if (this.props.posts && this.state.elements) {
      if (this.props.posts.length == this.state.elements.length) {
        text = "End"
      } else {
        text = "Loading..."
      }
    }
    return (
      <div>
        {text}
      </div>
    );
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
        sortType: 'pop',
        elements: this.buildElements(0, 5, this.props.popPosts),
      });
    } else if (this.state.sortType == 'pop') {
      this.setState({
        sortType: 'time',
        elements: this.buildElements(0, 5, this.props.posts),
      });
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

    return (
      <Grid>
        <div className="content">
          <Row>
            <Col lg={6} lgOffset={2} md={8} sm={8} xs={12}>
              {toggleButton}
              <Infinite elementHeight={300}
                         containerHeight={window.innerHeight}
                         infiniteLoadBeginEdgeOffset={600}
                         onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         useWindowAsScrollContainer={true}>
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
