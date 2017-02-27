import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Form extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Get input title and body
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
    const body = ReactDOM.findDOMNode(this.refs.bodyInput).value.trim();

    // Create new post
    Meteor.call('posts.insert', title, body);

    // Clear form
    ReactDOM.findDOMNode(this.refs.titleInput).value = '';
    ReactDOM.findDOMNode(this.refs.bodyInput).value = '';
  }

  render() {
    return (
      <div className="form">
        <form className="new-post" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="titleInput" placeholder="Title"/>
          <input type="text" ref="bodyInput" placeholder="Body"/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}