import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { analytics } from "meteor/okgrow:analytics";
import { Button } from 'react-bootstrap';
import { Instagram } from 'meteor/helium:instagram';
import { Session } from 'meteor/session'

export default class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {
          message: 'Share your story!',
          isSubmitting: false
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

  handleInstagramAuth(event) {
    event.preventDefault();
    let userId = Meteor.user()._id;
    this.linkInsta(userId);
  }

  linkInsta(userId) {
    userInfo = Meteor.users.findOne({_id: userId});
    var username;
    
    try {
      username = userInfo['profile']['instagram']['username'];
    }
    catch(err) {
      console.log('User has not linked an Instagram account.');
      username = null;
    }

    if (username) {
      this.setState({
        message: 'Instagram account already linked: @' + username
      });
    }
    else {
      Instagram.requestCredential((tokenOrError) => {
        let secret = Package.oauth.OAuth._retrieveCredentialSecret(tokenOrError);
        let userId = Meteor.user()._id;
        Meteor.call('updateInstagramData', userId, tokenOrError, secret, function(error, result) {
          if (error) {
            console.log(error.reason);
            this.setState({
              message: 'ERROR: Instagram account cannot be linked. Request to be a Sandbox user today!'
            });
          } else {
            console.log("Instagram authorization done");
            this.setState({
              message: 'Instagram account linked: @' + result
            });
          }
        }.bind(this));
      });
    }
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
                console.error('Error uploading');

                this.setState({
                  isSubmitting: false,
                  message: 'Failed to upload picture. Please make sure file is in one of these types: .png/.jpeg/.jpg/.gif'
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
            <Button className="btn btn-primary icon-save" onClick={this.handleInstagramAuth.bind(this)} block>
              <i className="fa fa-instagram"></i>  Link to Instagram
              </Button>
            <input className="ghost-button" type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
}
