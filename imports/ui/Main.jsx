import React from 'react';
import NavBar from './LandingPage/NavBar';

const Main = ({children}) => {
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

export default Main;