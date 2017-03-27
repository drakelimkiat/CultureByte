import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';import { Link } from 'react-router';

class IndividualCategory extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
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
                  <Link to="/post"><i className="fa fa-link" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
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
