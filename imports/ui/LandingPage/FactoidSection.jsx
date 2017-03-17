import React from 'react';
import IndividualFactoid from './IndividualFactoid.jsx'

const FactoidSection = () => {
  var snippet1 = "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.";
  return (
    <div id="factoid-slider" >
      <h2>Here are some snippets of culture facts</h2>
      <div className="carousel slide carousel-fade" data-ride="carousel">
        <div className="carousel-inner">
          <IndividualFactoid
            title="title 1"
            location="location 1"
            snippet={snippet1}
            wrapperClass="factoid active"/>
          <IndividualFactoid
            title="title 2"
            location="location 2"
            snippet={snippet1}
            wrapperClass="factoid" />
        </div>
        <a className="left-control" href="#home-slider" data-slide="prev"><i className="fa fa-angle-left"></i></a>
        <a className="right-control" href="#home-slider" data-slide="next"><i className="fa fa-angle-right"></i></a>
      </div>
    </div>
  );
};

export default FactoidSection;
