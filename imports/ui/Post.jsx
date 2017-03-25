import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session'
import { analytics } from "meteor/okgrow:analytics";

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
    // Track unlike in Google Analytics
    analytics.track('Unlike', {
      PostId: currentPostId,
      UserId: currentUserId
    });

    Meteor.call('posts.unlike', currentPostId, currentUserId, function(error, result) {
      if (error) {
        console.log(error.reason);
        return;
      }
      this.setState({liked: false});
    }.bind(this));
  }

  like(currentPostId, currentUserId) {
    // Track like in Google Analytics
    analytics.track('Like', {
      PostId: currentPostId,
      UserId: currentUserId
    });

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

  formatDate(date) {
    day = date.getDate();
    month = date.toLocaleString("en-us", { month: "short" });
    return month + " " + day;
  }

  render() {
    return (
      <div className="post">
        <div className="post-component post-topbar">
          <div className="author">
            <div className="profile-photo">
              <img src="/images/post/profile_photo.jpeg"/>
            </div>
            <div className="profile-text">
              <span className="username">{this.props.post.username}</span><br/>
              <span className="details">
                <span>{this.formatDate(this.props.post.createdAt)}</span>
                <span className="icon dot"><i className="fa fa-circle" aria-hidden="true"></i></span>
                <span>{this.props.post.liked_count ? this.props.post.liked_count : 0}</span>
                <span className="icon heart"><i className="fa fa-heart" aria-hidden="true"></i></span>
              </span>
            </div>
          </div>
          <div className="like">
            { this.renderLikeButton() }
          </div>
        </div>

        <div className="post-component post-title">
          <span className="title">{this.props.post.title}</span>
        </div>

        <div className="post-component post-photo">
          <img src={this.props.post.pictureUrl}/>
        </div>

        <div className="post-component post-body">
          {this.props.post.body}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};
