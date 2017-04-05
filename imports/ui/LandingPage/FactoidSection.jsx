import React from 'react';
import IndividualFactoid from './IndividualFactoid.jsx';

const FactoidSection = () => {
  const MediaQuery = require('react-responsive');
  const body = (
    <div>
      <div id="factoid">
        <h2>Here are some culture facts</h2>
        <div id="factoid-slider" className="carousel slide carousel-fade" data-ride="carousel">
          <div className="carousel-inner">
            <IndividualFactoid
              title="Shall we apply for HDB together?"
              location="Singapore"
              snippet="That is how most Singaporean males pop the question"
              classNames="item active"/>
            <IndividualFactoid
              title="Three Steps One Bow"
              location="Singapore"
              snippet="Buddhist devotees would arrive at the temples from as early as the day before to queue up for the three steps one bow ceremony."
              classNames="item" />
            <IndividualFactoid
              title="San Francisco's Major Earthquake"
              location="San Francisco"
              snippet="The 1906 San Francisco earthquake struck the coast of Northern California on April 18 with an estimated moment magnitude of 7.8"
              classNames="item" />
          </div>
          <a className="left-control" href="#factoid-slider" data-slide="prev"><i className="fa fa-angle-left"></i></a>
          <a className="right-control" href="#factoid-slider" data-slide="next"><i className="fa fa-angle-right"></i></a>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <MediaQuery minDeviceWidth={1025} className="desktop-screen">{body}</MediaQuery>
      <MediaQuery maxDeviceWidth={1024} className="mobile-screen">{body}</MediaQuery>
    </div>
  );
};

export default FactoidSection;
