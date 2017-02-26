import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts.js';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        };
    }

    nextPost() {
        this.setState({
            index: this.state.index + 1
        })
    }

  render() {
    return (
      <div className="container">
        <h1>CultureBytes</h1>
        <h1>{this.props}</h1>
        <h3>{{'name': 'limkiat'}.name}</h3>
        <button onClick={this.nextPost.bind(this)}></button>
      </div>
    );
  }
}

App.propTypes = {
    posts: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        posts: Posts.find({}).fetch()
    };
}, App);