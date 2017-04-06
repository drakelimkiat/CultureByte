import React from 'react';
import TeamMember from './TeamMember.jsx';

const TeamSection = () => {
  const MediaQuery = require('react-responsive');
  const body = (
    <div>
      <h2>The Team</h2>
      <p>Introducing our relatively young group of founders</p>
    </div>
  );
  const teamMembers = (
    <div className="cb-row">
      <TeamMember
        name="Ana"
        role="CPO"
        description="She decides the features!"
        imageClassName="img ana"
        key="Ana" />
      <TeamMember
        name="Si Kai"
        role="CTO"
        description="He decides all things tech!"
        imageClassName="img sikai"
        key="SiKai" />
      <TeamMember
        name="Celeste"
        role="CDO"
        description="She decides all things data related!"
        imageClassName="img celeste"
        key="Celeste" />
      <TeamMember
        name="Lim Kiat"
        role="CFO"
        description="He does our financial projections!"
        imageClassName="img limkiat"
        key="LimKiat" />
      <TeamMember
        name="Annabel"
        role="CEO"
        description="She sells CultureByte to investors!"
        imageClassName="img annabel"
        key="Annabel" />
    </div>
  );
  return (
    <div className="team">
      <div className="cb-row">
        <div className="team-page-header">
          <div>
            <MediaQuery minWidth={601} className="large-screen">{body}</MediaQuery>
            <MediaQuery maxWidth={600} className="small-screen">{body}</MediaQuery>
          </div>
        </div>
      </div>
      <MediaQuery minWidth={901} id="large-screen">{teamMembers}</MediaQuery>
      <MediaQuery minWidth={601} maxWidth={900} id="medium-screen">{teamMembers}</MediaQuery>
      <MediaQuery maxWidth={600} id="small-screen">{teamMembers}</MediaQuery>
    </div>
  );
};

export default TeamSection;
