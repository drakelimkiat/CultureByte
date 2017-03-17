import React, { Component } from 'react';
import TitlePage from './TitleSection.jsx';
import TeamPage from './TeamSection.jsx';
import CategoryPage from './CategorySection.jsx';
import PromptPage from './PromptSection.jsx';

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
