import React, { Component, PropTypes } from 'react';

export default class Post extends Component {
    render() {
        return (
            <div>
              Title: {this.props.post.title}<br/>
              Body: {this.props.post.body}<br/>
              PictureUrl: {this.props.post.pictureUrl}<br/>
              <img style={{width:500, height:500}} src={this.props.post.pictureUrl != '' ?
                this.props.post.pictureUrl : '/default-placeholder.png'}/><br/>
              Username: {this.props.post.username}<br/>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired
};
