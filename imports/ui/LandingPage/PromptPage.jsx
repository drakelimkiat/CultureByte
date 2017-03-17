import React from 'react';
import IndividualPrompt from './IndividualPrompt.jsx'

const PromptPage = () => {
   	return (
      <div id="home">
        <div id="home-slider" className="carousel slide carousel-fade" data-ride="carousel">
          <div className="carousel-inner">
            <IndividualPrompt
              title="title1"
              subtitle="subtitle2"
              imageClassName="imageClassName"
              wrapperClass="item active"/>
            <IndividualPrompt
              title="title2"
              subtitle="subtitle2"
              imageClassName="imageClassName"
              wrapperClass="item"/>
          </div>
          <a className="left-control" href="#home-slider" data-slide="prev"><i className="fa fa-angle-left"></i></a>
          <a className="right-control" href="#home-slider" data-slide="next"><i className="fa fa-angle-right"></i></a>
        </div>
      </div>
   	);
};

export default PromptPage;
