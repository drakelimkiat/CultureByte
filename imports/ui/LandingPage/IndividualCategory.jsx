import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';import { Link } from 'react-router';
import Popup from '../Popup.jsx';

class IndividualCategory extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    const showPopup = this.props.currentUser ? false : true;
    const MediaQuery = require('react-responsive');
    const body = (
      <div>
        <div className="folio-item wow fadeInRightBig col-1-2" data-wow-duration="1000ms" data-wow-delay="400ms">
          <div className="folio-image">
            <div className={this.props.imageClassName} />
          </div>
          <div className="overlay">
            <div className="overlay-content">
              <div className="overlay-text">
                <div className="folio-info">
                  <h3>{this.props.title}</h3>
                  <p>{this.props.subtitle}</p>
                </div>
                <div className="folio-overview">
                  <div className="folio-link">
                    <Link to={this.props.currentUser ? "/post" : ""}>
                      <i className="fa fa-link">
                        <Popup />
                      </i>
                    </Link>
                  </div>
                      <Popup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <MediaQuery minWidth={751} className="large-screen">{body}</MediaQuery>
        <MediaQuery maxWidth={750} className="small-screen">{body}</MediaQuery>
      </div>
    );
  }
}

IndividualCategory.propTypes = {
    currentUser: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    imageClassName: PropTypes.string
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, IndividualCategory);
