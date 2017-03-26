import React from 'react';
import { IndexLink, Link } from 'react-router';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

const NavBar = ({currentPath}) => {
	const currentUser = Meteor.user();
	console.log(currentUser);
	return (
		<div className="header">
			<ul className="main-navigation">
				<li className={currentPath == "/" ? 'current' : ''}><IndexLink to="/">Home</IndexLink></li>
				<li className={currentPath == "/contribution" ? 'current' : ''}><Link to="/contribution">Contribution</Link></li>
				<li className={currentPath == "/post" ? 'current' : ''}><Link to="/post">Post</Link></li>
				<li id="login-button" className="highlight with-sep">
					<AccountsUIWrapper />
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
