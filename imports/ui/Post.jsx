import React, { Component, PropTypes } from 'react';

export default class Post extends Component {
    render() {
        return (
            <div>
              <h3>{this.props.post.name}</h3>
              {this.props.post.body}
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired
};