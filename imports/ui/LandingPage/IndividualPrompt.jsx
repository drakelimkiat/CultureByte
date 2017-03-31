import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import Popup from '../Popup.jsx';

class IndividualPrompt extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    const showPopup = this.props.currentUser ? false : true;
    return (
      <div className={this.props.classNames}>
        <img src={this.props.imageUrl} />
        <div className="caption">
          <h1 className="animated fadeInLeftBig">{this.props.title}</h1>
          <p className="animated fadeInLeftBig">{this.props.subtitle}</p>
          <Link to={ this.props.currentUser ? "/contribution" : ""}>
            <span data-scroll className="btn btn-start animated fadeInRightBig shareButton">
              SHARE
              <Popup show={showPopup} />
            </span>
          </Link>
        </div>
            <Popup />
      </div>
    );
  }
}

IndividualPrompt.propTypes = {
    currentUser: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    imageUrl: PropTypes.string,
    classNames: PropTypes.string
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, IndividualPrompt);
