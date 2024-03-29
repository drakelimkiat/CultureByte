import React from 'react';
import IndividualPrompt from './IndividualPrompt.jsx'

const PromptSection = () => {
  const MediaQuery = require('react-responsive');
  const text = (
    <div>
      <h2>Itching to share?</h2>
      <p>Check out our prompts for inspiration</p>
    </div>
  );
  const body = (
    <div>
      <div id="prompt-slider" className="carousel slide carousel-fade" data-ride="carousel">
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
            imageUrl="/images/prompt/slang.png"
            classNames="item"/>
        </div>
        <a className="left-control" href="#prompt-slider" data-slide="prev"><i className="fa fa-angle-left"></i></a>
        <a className="right-control" href="#prompt-slider" data-slide="next"><i className="fa fa-angle-right"></i></a>
      </div>
    </div>
  );
  return (
    <div id="prompt">
      <div id="prompt-description">
        <MediaQuery maxWidth={750} className="small-screen">{text}</MediaQuery>
      </div>
      <div>
        <MediaQuery minWidth={761} className="large-screen">{body}</MediaQuery>
        <MediaQuery maxWidth={760} className="small-screen">{body}</MediaQuery>
      </div>
    </div>
  );
};

export default PromptSection;
