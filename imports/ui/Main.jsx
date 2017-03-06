import React from 'react';
import Navigation from './Navigation.jsx';

const Main = ({children}) => {
	if (!children) {
		return (
			<div>
				<Navigation />
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div>
			<Navigation />
			{children}
		</div>
	);
};

export default Main;