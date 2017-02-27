import React, { Component, PropTypes } from 'react';

export default class Post extends Component {
    render() {
        return (
            <h4>{this.props.post.name}</h4>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired
};