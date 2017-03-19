import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session'
import { analytics } from "meteor/okgrow:analytics";

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
      // Track unlike in Google Analytics
      analytics.track('Unlike', {
        PostId: currentPostId,
        UserId: currentUserId
      });
      // Decrement like_count of current post
      Meteor.call('posts.unlike', currentPostId);
      // Remove current post id from liked_posts array of user
      Meteor.call('users.unlike', currentPostId, currentUserId);
      // Update users who liked
      this.getUsersWhoLiked(currentPostId);
    }

    like(currentPostId, currentUserId) {
      // Track like in Google Analytics
      analytics.track('Like', {
        PostId: currentPostId,
        UserId: currentUserId
      });
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
