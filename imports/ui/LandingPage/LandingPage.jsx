import React, { Component } from 'react';
import TitlePage from './TitlePage.jsx';
import TeamPage from './TeamPage.jsx';
import CategoryPage from './CategoryPage.jsx';
import PromptPage from './PromptPage.jsx';

const LandingPage = () => {
	return (
		<div>
			<TitlePage />
			<CategoryPage />
			<PromptPage />
			<TeamPage />
		</div>
	);
};

export default LandingPage;
