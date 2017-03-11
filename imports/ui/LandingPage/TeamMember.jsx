import React from 'react';

const TeamMember = ({name, role, description, imageClassName}) => {
   	return (
		<div className="team-member">
			<div className={imageClassName}></div>
			<div className="member-info">
				<h3>{name}</h3>
				<h4>{role}</h4>
				<p>{description}</p>
			</div>
		</div>
   	);
};

export default TeamMember;