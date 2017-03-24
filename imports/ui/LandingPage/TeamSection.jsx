import React from 'react';
import TeamMember from './TeamMember.jsx';

const TeamSection = () => {
   	return (
   		<div className="team">
   			<div className="cb-row">
   			    <div className="team-page-header">
          			<h2>The Team</h2>
          			<p>Introducing our relatively young group of founders</p>
        		</div>
   			</div>
   			<div className="cb-row">
   				<TeamMember
   					name="Ana"
   					role="CPO"
   					description="She decides which features make the cut!"
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
   		</div>
   	);
};

export default TeamSection;