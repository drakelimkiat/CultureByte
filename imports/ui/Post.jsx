import React, { Component, PropTypes } from 'react';

export default class Post extends Component {
    render() {
        return (
            <div>
              Title: {this.props.post.title}<br/>
              Body: {this.props.post.body}<br/>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired
};