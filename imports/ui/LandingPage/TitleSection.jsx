import React from 'react';

const TitleSection = () => {
  const MediaQuery = require('react-responsive');
  const body = (
    <div>
      <div className="cb-row">
        <h5>Hello welcome to Culture Bytes.</h5>
        <h1>We introduce you to interesting culture facts</h1>
      </div>
    </div>);

    return (
      <div id="intro">
        <div className="intro-content">
          <MediaQuery minWidth={601} className="large-screen">{body}</MediaQuery>
          <MediaQuery maxWidth={600} className="small-screen">{body}</MediaQuery>
        </div>
      </div>
    );
  };

  export default TitleSection;
