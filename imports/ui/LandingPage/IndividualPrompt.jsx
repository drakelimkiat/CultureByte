import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

class IndividualPrompt extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className={this.props.wrapperClass}>
        <img src={this.props.imageUrl} />
        <div className="caption">
          <h1 className="animated fadeInLeftBig">{this.props.title}</h1>
          <p className="animated fadeInLeftBig">{this.props.subtitle}</p>
          <Link to="/contribution"><span data-scroll className="btn btn-start animated fadeInRightBig">SHARE</span></Link>
        </div>
      </div>
    );
  }
}

IndividualPrompt.propTypes = {
    currentUser: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    imageUrl: PropTypes.string,
    wrapperClass: PropTypes.string
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, IndividualPrompt);
