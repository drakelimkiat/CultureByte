import React from 'react';

const TitleSection = () => {
  const MediaQuery = require('react-responsive');
  const body = (
    <div>
      <div className="cb-row">
        <div className="col-twelve">
          <h5>Hello welcome to Culture Bytes.</h5>
          <h1>We introduce you to interesting culture facts</h1>
        </div>
      </div>
    </div>);

    return (
      <div id="intro">
        <div className="intro-content">
          <MediaQuery minDeviceWidth={1025}>{body}</MediaQuery>
          <MediaQuery maxDeviceWidth={1024} minDeviceWidth={769} className="large-screen">{body}</MediaQuery>
          <MediaQuery maxDeviceWidth={768} minDeviceWidth={501} className="medium-screen">{body}</MediaQuery>
          <MediaQuery maxDeviceWidth={500} className="small-screen">{body}</MediaQuery>
        </div>
      </div>
    );
  };

  export default TitleSection;
