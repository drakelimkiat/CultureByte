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
import Modal from 'react-modal';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: 'time',
      elements: undefined,
      isInfiniteLoading: false,
      isModalOpen: false
    };
  }

  componentWillMount() {
    this.initBuildElements(this.props);
  }

  componentWillUpdate() {
    if (!Meteor.user()) {
      browserHistory.push('/home');
    }
  }

  componentWillReceiveProps(newProps) {
    this.initBuildElements(newProps);
  }

  initBuildElements(newProps) {
    if (newProps && newProps.posts && newProps.posts[0]) {
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
    return <Form closeModal={this.closeModal.bind(this)} />
  }

  renderToggleButton() {
    const sortByTime = this.state.sortType == 'time';
    const sortByPop = this.state.sortType == 'pop';
      return (
        <Row className="category">
          <Col lg={8} xs={10}>
            <button className={"category-button " + (sortByTime ? "enable" : "")} onClick={this.onToggleBetweenTimeAndPop.bind(this)}>New <i className="fa fa-clock-o" aria-hidden="true"></i></button>
            <button className={"category-button " + (sortByPop ? "enable" : "")} onClick={this.onToggleBetweenTimeAndPop.bind(this)}>Hot <i className="fa fa-fire" aria-hidden="true"></i></button>
          </Col>
          <Col lg={4} xs={2}>
            <button className="category-button new-post-button" onClick={this.openModal.bind(this)}>New Post</button>
          </Col>
      </Row>
      );
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

  openModal(){
      this.setState({isModalOpen: true});
  }

  closeModal(){
      this.setState({isModalOpen: false});
  }

  render() {
    document.title = 'Post';
    let toggleButton = null;
    let createPostForm = null;
    if (this.props.currentUser) {
      toggleButton  = this.renderToggleButton();
      createPostForm = this.renderCreatePostForm();
    }

    const modalStyle = {
        content : {
            top : '110px',
            left: '10%',
            right: '10%'
        }
    }

    return (
      <Grid>
        <div className="content">
          <Row>
            <Col lg={6} lgOffset={3} xs={12}>
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
          </Row>
          <Modal
              isOpen={this.state.isModalOpen}
              onRequestClose={this.closeModal.bind(this)}
              contentLabel="Create Post"
              style={modalStyle}
          >
            {createPostForm}
          </Modal>
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
