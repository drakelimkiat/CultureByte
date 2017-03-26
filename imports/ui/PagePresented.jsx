import React from 'react';
import NavBar from './LandingPage/NavBar.jsx';

const PagePresented = ({children}) => {
	const currentPath = children.props.route.path;
	if (!children) {
		return (
			<div>
				<NavBar />
				<div>Loading...</div>
			</div>
		);
	}
	return (
		<div>
			<NavBar />
			{children}
		</div>
	);
};

export default PagePresented;
