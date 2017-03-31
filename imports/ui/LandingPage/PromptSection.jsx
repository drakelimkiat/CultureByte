import React from 'react';
import IndividualPrompt from './IndividualPrompt.jsx'

const PromptSection = () => {
  return (
    <div id="home">
      <div id="home-slider" className="carousel slide carousel-fade" data-ride="carousel">
        <div className="carousel-inner">
          <IndividualPrompt
            title="CHILDHOOD"
            subtitle="What did you do during your childhood?"
            imageUrl="/images/prompt/childhood.jpg"
            classNames="item active"/>
          <IndividualPrompt
            title="SCHOOL"
            subtitle="What is unique about the school system in your country?"
            imageUrl="/images/prompt/school.jpg"
            classNames="item"/>
          <IndividualPrompt
            title="FESTIVALS"
            subtitle="Do you know of an interesting festival in your country?"
            imageUrl="/images/prompt/festivals.jpg"
            classNames="item"/>
          <IndividualPrompt
            title="SOCIAL NORMS"
            subtitle="Do you know of any unwritten social norms in your country?"
            imageUrl="/images/prompt/socialNorm.jpg"
            classNames="item"/>
          <IndividualPrompt
            title="LOCAL SLANG"
            subtitle="What are some local slangs used in your country?"
            imageUrl="/images/prompt/slang.jpg"
            classNames="item"/>
        </div>
        <a className="left-control" href="#home-slider" data-slide="prev"><i className="fa fa-angle-left"></i></a>
        <a className="right-control" href="#home-slider" data-slide="next"><i className="fa fa-angle-right"></i></a>
      </div>
    </div>
  );
};

export default PromptSection;
