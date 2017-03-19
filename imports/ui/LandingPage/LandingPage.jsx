import React, { Component } from 'react';
import TitlePage from './TitlePage.jsx';
import TeamPage from './TeamPage.jsx';
import CategoryPage from './CategoryPage.jsx'

const LandingPage = () => {
	document.title = 'LandingPage';
	return (
		<div>
			<TitlePage />
			<CategoryPage />
			<TeamPage />
		</div>
	);
};

export default LandingPage;
