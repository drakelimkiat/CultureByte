import React from 'react';
import { IndexLink, Link } from 'react-router';

const NavBar = ({currentPath}) => {
	return (
		<div className="header">
			<ul className="main-navigation">
				<li className={currentPath == "/" ? 'current' : ''}><IndexLink to="/">Home</IndexLink></li>
				<li className={currentPath == "/contribution" ? 'current' : ''}><Link to="/contribution">Contribution</Link></li>
				<li className={currentPath == "/post" ? 'current' : ''}><Link to="/post">Post</Link></li>
			</ul>
		</div>
	);
};

export default NavBar;
