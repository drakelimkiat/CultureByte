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
      <MediaQuery minWidth={601} className="desktop-screen">{body}</MediaQuery>
      <MediaQuery maxWidth={600} className="small-screen">{body}</MediaQuery>
    </div>
  );
};

export default TeamMember;
