import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

class IndividualFactoid extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className={this.props.wrapperClass}>
        <div id="individual-factoid">
          <Link to="/post">
            <h3>{this.props.title}</h3>
            <h4>{this.props.location}</h4>
            <p>{this.props.snippet}</p>
          </Link>
        </div>
      </div>
    );
  }
}

IndividualFactoid.propTypes = {
    currentUser: PropTypes.object,
    title: PropTypes.string,
    location: PropTypes.string,
    snippet: PropTypes.string,
    wrapperClass: PropTypes.string
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, IndividualFactoid);
