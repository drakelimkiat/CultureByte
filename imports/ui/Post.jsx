import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session'
import { analytics } from "meteor/okgrow:analytics";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: null,
      isEditing: null,
      editedTitle: null,
      editedBody: null,
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

  setIsEditing() {
    this.setState({isEditing: true});
  }

  handleTitleChange(e) {
    this.setState({editedTitle: e.target.value});
  }

  handleBodyChange(e) {
    this.setState({editedBody: e.target.value});
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
      this.props.onLikeButtonClick(currentPostId);
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
      this.props.onLikeButtonClick(currentPostId);
      this.setState({liked: true});
    }.bind(this));
  }

  update(currentPostId) {
    let title = (this.state.editedTitle == null) ? this.props.post.title : this.state.editedTitle;
    let body = (this.state.editedBody == null) ? this.props.post.body : this.state.editedBody;

    Meteor.call('posts.update', currentPostId, title, body, function(error, result) {
      if (error) {
        console.log(error.reason);
        return;
      }
      this.setState({isEditing: false, editedTitle: null, editedBody: null});
    }.bind(this));
  }

  renderLikeButton() {
    const currentPostId = this.props.post._id;
    const currentUser = Meteor.user();
    const currentUserId = currentUser._id;

    if (this.state.liked) {
      // Current user liked current post. Clicking should unlike
      return <button onClick={this.unlike.bind(this, currentPostId, currentUserId)}><i className="fa fa-heart" aria-hidden="true"></i></button>;
    } else {
      // Current user did not like current post. Clicking should like
      return <button onClick={this.like.bind(this, currentPostId, currentUserId)}><i className="fa fa-heart-o" aria-hidden="true"></i></button>;
    }
  }

  renderEditButton() {
    return <button onClick={this.setIsEditing.bind(this)}><i className="fa fa-pencil" aria-hidden="true"></i></button>;
  }

  renderSubmitButton() {
    const currentPostId = this.props.post._id;
    return <button onClick={this.update.bind(this, currentPostId)}>Submit</button>;
  }

  renderTitleTextarea() {
    return <textarea className="ghost-input-edit ghost-input-edit-title" type="text" defaultValue={this.props.post.title} onChange={this.handleTitleChange.bind(this)}/>;
  }

  renderBodyTextarea() {
    return <textarea className="ghost-input-edit ghost-input-edit-body" type="text" defaultValue={this.props.post.body} onChange={this.handleBodyChange.bind(this)}/>;
  }

  formatDate(date) {
    day = date.getDate();
    month = date.toLocaleString("en-us", { month: "short" });
    return month + " " + day;
  }

  render() {
    let title = (this.state.isEditing) ? this.renderTitleTextarea() : this.props.post.title;
    let body = (this.state.isEditing) ? this.renderBodyTextarea() : this.props.post.body;
    let icon = "";
    if (this.state.isEditing == true) {
      icon = this.renderSubmitButton();
    } else if (this.props.type == "contribution") {
      icon = this.renderEditButton();
    } else if (this.props.type == "post") {
      icon = this.renderLikeButton();
    }

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
          <div className="like-or-edit">
            {icon}
          </div>
        </div>

        <div className="post-component post-title">
          <span className="title">{title}</span>
        </div>

        <div className="post-component post-photo">
          <img src={this.props.post.pictureUrl}/>
        </div>

        <div className="post-component post-body">
          {body}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};
