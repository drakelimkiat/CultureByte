import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session'

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: null,
    };
  }

  componentWillMount() {
    this.setLiked();
  }

  setLiked() {
    const currentPostId = this.props.post._id;
    const currentUser = Meteor.user();
    const currentUserId = currentUser._id;

    if (currentUser.profile != undefined && currentUser.profile.liked_posts != undefined) {
      const likedPosts = currentUser.profile.liked_posts;
      if (likedPosts.indexOf(currentPostId) != -1) {
        // Current user liked current post
        this.setState({liked: true});
        return;
      }
    }
    // Current user did not like current post
    this.setState({liked: false});
  }

  unlike(currentPostId, currentUserId) {
    Meteor.call('posts.unlike', currentPostId, currentUserId, function(error, result) {
      if (error) {
        console.log(error.reason);
        return;
      }
      this.setState({liked: false});
    }.bind(this));
  }

  like(currentPostId, currentUserId) {
    Meteor.call('posts.like', currentPostId, currentUserId, function(error, result) {
      if (error) {
        console.log(error.reason);
        return;
      }
      this.setState({liked: true});
    }.bind(this));
  }

  renderLikeButton() {
    const currentPostId = this.props.post._id;
    const currentUser = Meteor.user();
    const currentUserId = currentUser._id;

    if (this.state.liked) {
      // Current user liked current post. Clicking should unlike
      return <button onClick={this.unlike.bind(this, currentPostId, currentUserId)}><i className="fa fa-heart" aria-hidden="true"></i></button>
    } else {
      // Current user did not like current post. Clicking should like
      return <button onClick={this.like.bind(this, currentPostId, currentUserId)}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
    }
  }

  render() {
    return (
      <div>
      Id: {this.props.post._id}<br/>
      Title: {this.props.post.title}<br/>
      Body: {this.props.post.body}<br/>
      PictureUrl: {this.props.post.pictureUrl}<br/>
      <img style={{width:500, height:500}} src={this.props.post.pictureUrl != '' ?
      this.props.post.pictureUrl : '/default-placeholder.png'}/><br/>
      Username: {this.props.post.username}<br/>
      No. of Likes: {this.props.post.liked_count}<br/>
      Users who Liked: {this.state.usersWhoLiked}<br/>
      { this.renderLikeButton() }
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};
