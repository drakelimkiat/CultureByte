import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {
          pictureUrl: 'http://larics.fer.hr/wp-content/uploads/2016/04/default-placeholder.png'
      };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Get input title and body
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const body = ReactDOM.findDOMNode(this.refs.bodyInput).value.trim();

    // Create new post
    Meteor.call('posts.insert', title, body, this.state.pictureUrl);

    // Clear form
    ReactDOM.findDOMNode(this.refs.titleInput).value = '';
    ReactDOM.findDOMNode(this.refs.bodyInput).value = '';
  }

  componentDidMount() {
    Slingshot.fileRestrictions("PostPicture", {
      allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
      maxSize: null // 2 MB (use null for unlimited)
    });
  }

  uploadPicture() {
      let userId = Meteor.user()._id;
      let metaContext = { avatarId: userId };
      let uploader = new Slingshot.Upload("PostPicture", metaContext);
      uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
          if (error) {
              console.error('Error uploading', uploader.xhr.response);
              alert (error);
          } else {
              console.log(downloadUrl);
              this.setState({pictureUrl: downloadUrl});
          }
      }.bind(this));
  }

  render() {
    return (
      <div className="form">
        <form className="new-post" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="titleInput" placeholder="Title"/>
          <input type="text" ref="bodyInput" placeholder="Body"/>
          <input type="file" id="input" onChange={this.uploadPicture.bind(this)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
