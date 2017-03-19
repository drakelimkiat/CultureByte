import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session'

export default class Post extends Component {
    constructor(props) {
      super(props);

      this.state = {
        usersWhoLiked: [],
      };
    }

    componentWillMount() {
      this.getUsersWhoLiked(this.props.post._id);
    }

    getUsersWhoLiked(currentPostId) {
      Meteor.call('posts.usersWhoLiked', currentPostId, function(error, result) {
        if (error) {
          console.log(error.reason);
          return;
        }
        this.setState({usersWhoLiked: result['usernames']});
      }.bind(this));
    }

    unlike(currentPostId, currentUserId) {
      // Decrement like_count of current post
      Meteor.call('posts.unlike', currentPostId);
      // Remove current post id from liked_posts array of user
      Meteor.call('users.unlike', currentPostId, currentUserId);
      // Update users who liked
      this.getUsersWhoLiked(currentPostId);
    }

    like(currentPostId, currentUserId) {
      // Increment like_count of current post
      Meteor.call('posts.like', currentPostId);
      // Add current post id to liked_posts array of user
      Meteor.call('users.like', currentPostId, currentUserId);
      // Update users who liked
      this.getUsersWhoLiked(currentPostId);
    }

    renderLikeButton() {
      const currentPostId = this.props.post._id;
      const currentUser = Meteor.user();
      const currentUserId = currentUser._id;
      console.log("currentPostId:", currentPostId);
      console.log("currentUser:", currentUser);

      if (currentUser.profile != undefined && currentUser.profile.liked_posts != undefined) {
        const likedPosts = currentUser.profile.liked_posts;
        console.log("likedPosts:", likedPosts);
        if (likedPosts.indexOf(currentPostId) != -1) {
          // Current user liked this post. Clicking should unlike
          return <button onClick={this.unlike.bind(this, currentPostId, currentUserId)}><i className="fa fa-heart" aria-hidden="true"></i></button>
        }
      }

      // Current user did not like this post. Clicking should like
      return <button onClick={this.like.bind(this, currentPostId, currentUserId)}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
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
