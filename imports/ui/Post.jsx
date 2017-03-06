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

    getUsersWhoLiked(currentPost) {
      Meteor.call('posts.usersWhoLiked', currentPost, function(error, result) {
        if (error) {
          console.log(error.reason);
          return;
        }
        this.setState({usersWhoLiked: result['usernames']});
      }.bind(this));
    }

    unlike(currentPost, currentUser) {
      // Decrement like_count of current post
      Meteor.call('posts.unlike', currentPost);
      // Remove current post id from liked_posts array of user
      Meteor.call('users.unlike', currentPost, currentUser);
      // Update users who liked
      this.getUsersWhoLiked(currentPost);
    }

    like(currentPost, currentUser) {
      // Increment like_count of current post
      Meteor.call('posts.like', currentPost);
      // Add current post id to liked_posts array of user
      Meteor.call('users.like', currentPost, currentUser);
      // Update users who liked
      this.getUsersWhoLiked(currentPost);
    }

    renderLikeButton() {
      const currentPost = this.props.post._id;
      const currentUser = Meteor.user();
      console.log("currentPost:", currentPost);
      console.log("currentUser:", currentUser);

      if (currentUser.profile != undefined && currentUser.profile.liked_posts != undefined) {
        const likedPosts = currentUser.profile.liked_posts
        console.log("likedPosts:", likedPosts);
        if (likedPosts.indexOf(currentPost) != -1) {
          // Current user liked this post. Clicking should unlike
          return <button onClick={this.unlike.bind(this, currentPost, currentUser)}>Unlike</button>
        }
      }

      // Current user did not like this post. Clicking should like
      return <button onClick={this.like.bind(this, currentPost, currentUser)}>Like</button>
    }

    render() {
        return (
            <div>
              Id: {this.props.post._id}<br/>
              Title: {this.props.post.title}<br/>
              Body: {this.props.post.body}<br/>
              PictureUrl: {this.props.post.pictureUrl}<br/>
              <img style={{width:500, height:500}} src={this.props.post.pictureUrl}/><br/>
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
