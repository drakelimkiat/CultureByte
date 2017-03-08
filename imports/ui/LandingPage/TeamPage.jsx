import React from 'react';
import TeamMember from './TeamMember.jsx';

const TeamPage = () => {
   	return (
   		<div className="team">
   			<div className="row">
   			    <div className="team-page-header">
          			<h2>The Team</h2>
          			<p>Introducing our relatively young group of founders</p>
        		</div>
   			</div>
   			<div className="row">
   				<TeamMember
   					name="Ana"
   					role="CPO"
   					description="She decides which features make the cut!"
   					src="img ana"
   					key="Ana" />
   				<TeamMember
   					name="Si Kai"
   					role="CTO"
   					description="He decides all things tech!"
   					src="img sikai"
   					key="SiKai" />
   				<TeamMember
   					name="Celeste"
   					role="CDO"
   					description="She decides all things data related!"
   					src="img celeste"
   					key="Celeste" />
   				<TeamMember
   					name="Lim Kiat"
   					role="CFO"
   					description="He does our financial projections!"
   					src="img limkiat"
   					key="LimKiat" />
   				<TeamMember
   					name="Annabel"
   					role="CEO"
   					description="She sells CultureByte to investors!"
   					src="img annabel"
   					key="Annabel" />
   			</div>
   		</div>
   	);
};

export default TeamPage;