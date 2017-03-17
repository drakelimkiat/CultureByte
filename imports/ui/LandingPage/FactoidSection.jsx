import React from 'react';
import IndividualFactoid from './IndividualFactoid.jsx'

const FactoidSection = () => {
  return (
    <div id="home">
      <div id="home-slider" className="carousel slide carousel-fade" data-ride="carousel">
        <div className="carousel-inner">

        </div>
        <a className="left-control" href="#home-slider" data-slide="prev"><i className="fa fa-angle-left"></i></a>
        <a className="right-control" href="#home-slider" data-slide="next"><i className="fa fa-angle-right"></i></a>
      </div>
    </div>
  );
};

export default FactoidSection;
