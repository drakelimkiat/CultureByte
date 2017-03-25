import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { analytics } from "meteor/okgrow:analytics";

export default class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {
          message: 'Share your story!',
          isSubmitting: false,
      };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Get input title and body
    const title = this.refs.titleInput.value.trim();
    const body = this.refs.bodyInput.value.trim();

    // Input title and body validation
    if (title == "" && body == "") {
      this.setState({
        message: 'Please include a title and body.'
      });
      return;
    } else if (title == "") {
      this.setState({
        message: 'Please include a title.'
      });
      return;
    } else if (body == "") {
      this.setState({
        message: 'Please include a body.'
      });
      return;
    }

    // Track post contribution using Google Analytics
    analytics.track('Post Contribution', {
      ContributionTitle: title,
      ContributionBody: body,
    });

    this.setState({
      isSubmitting: true,
      message: 'Submitting your contribution...'
    })

    this.uploadPicture(title, body);
  }

  componentDidMount() {
    Slingshot.fileRestrictions("PostPicture", {
      allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
      maxSize: 20 * 1024 * 1024 // 2 MB (use null for unlimited)
    });
  }

  uploadPicture(title, body) {

      let userId = Meteor.user()._id;
      let metaContext = { avatarId: userId };
      let uploader = new Slingshot.Upload("PostPicture", metaContext);

      if (document.getElementById('pictureInput').files[0] != null) {
        uploader.send(document.getElementById('pictureInput').files[0], function (error, downloadUrl) {
            if (error) {
                console.error('Error uploading', uploader.xhr.response);
                alert (error);

                this.setState({
                  isSubmitting: false,
                  message: 'Failed to upload picture. Please try again.'
                });

            } else {
                console.log(downloadUrl);
                this.storeIntoDatabase(title, body, downloadUrl);
            }
        }.bind(this));
      } else {
        this.storeIntoDatabase(title, body, '');
      }
  }

  storeIntoDatabase(title, body, pictureUrl) {
    // Create new post
    Meteor.call('posts.insert', title, body, pictureUrl, (error) => {
      this.setState({
        isSubmitting: false
      });

      if (error) {
        this.setState({
          message: 'Failed to submit contribution. Please try again.'
        });
      } else {
        this.setState({
          message: 'CultureByte shared!'
        });
      }
    });
  }

  render() {
    if (this.state.isSubmitting) {
      return (
        <div>
          <div className="spinner"></div>
          <div className="loadingText">Creating your CultureByte</div>
        </div>
      );
    } else {
      return (
        <div className="form">
          <form className="new-post" onSubmit={this.handleSubmit.bind(this)}>
            {this.state.message}<br/>
            <div className="line"></div>
            <textarea className="ghost-input" type="text" ref="titleInput" placeholder="Title"/>
            <div className="line"></div>
            <textarea className="ghost-input" rows="8" type="text" ref="bodyInput" placeholder="Body"/>
            <div className="line"></div>
            <input className="ghost-input" type="file" id="pictureInput" />
            <div className="line"></div>
            <input className="ghost-button" type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
}
