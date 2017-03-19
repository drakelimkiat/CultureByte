import React from 'react';
import { IndexLink, Link } from 'react-router';

const NavBar = () => (
	<div className="header">
		<ul className="main-navigation">
			<li><IndexLink to="/">Home</IndexLink></li>
			<li><Link to="/post">Post</Link></li>
		</ul>
	</div>
)

export default NavBar;