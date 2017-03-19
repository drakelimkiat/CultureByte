import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { analytics } from "meteor/okgrow:analytics";

export default class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {
          message: 'Contribute by filling in the below details.',
          isSubmitting: false,
      };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Get input title and body
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const body = ReactDOM.findDOMNode(this.refs.bodyInput).value.trim();

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
          message: 'Contribution submitted! Care to submit another?'
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
          {this.state.message} <br/>
          <form className="new-post" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="titleInput" placeholder="Title"/> <br/>
            <input type="text" ref="bodyInput" placeholder="Body"/> <br/>
            <input type="file" id="pictureInput" /> <br/>
            <input type="submit" value="Submit" /> <br/>
          </form>
        </div>
      );
    }
  }
}
