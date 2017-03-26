import React from 'react';
import NavBar from './LandingPage/NavBar.jsx';

const PagePresented = ({children}) => {
	const currentPath = children.props.location.pathname;
	if (!children) {
		return (
			<div>
				<NavBar currentPath=''/>
				<div>Loading...</div>
			</div>
		);
	}
	return (
		<div>
			<NavBar currentPath={currentPath}/>
			{children}
		</div>
	);
};

export default PagePresented;
