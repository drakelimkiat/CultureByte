import React, { Component } from 'react';
import TitlePage from './TitlePage.jsx';
import TeamPage from './TeamPage.jsx';
import CategoryPage from './CategoryPage.jsx'

const LandingPage = () => {
	return (
		<div>
			<TitlePage />
			<TeamPage />
			<CategoryPage />
		</div>
	);
};

export default LandingPage;