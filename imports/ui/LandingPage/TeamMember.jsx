import React from 'react';

const TeamMember = ({name, role, description, imageClassName}) => {
  const MediaQuery = require('react-responsive');
  const body = (
    <div>
      <div className="team-member">
        <div className={imageClassName}></div>
        <div className="member-info">
          <h3>{name}</h3>
          <h4>{role}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <MediaQuery minDeviceWidth={601} className="desktop-screen">{body}</MediaQuery>
      <MediaQuery maxDeviceWidth={600} className="mobile-screen">{body}</MediaQuery>
    </div>
  );
};

export default TeamMember;
