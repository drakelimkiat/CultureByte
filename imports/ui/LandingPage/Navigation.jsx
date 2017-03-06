import React from 'react';
import { IndexLink, Link } from 'react-router';

const Navigation = () => (
	<ul>
		<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
		<li><Link to="/post" activeClassName="active">Post</Link></li>
	</ul>
)

export default Navigation;