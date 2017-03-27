import React, { Component } from 'react';
import TitlePage from './TitleSection.jsx';
import TeamPage from './TeamSection.jsx';
import CategoryPage from './CategorySection.jsx';
import PromptPage from './PromptSection.jsx';
import FactoidSection from './FactoidSection.jsx';

const LandingPage = () => {
	return (
		<div>
			<TitlePage />
			<FactoidSection />
			<hr />
			<CategoryPage />
			<PromptPage />
			<TeamPage />
		</div>
	);
};

export default LandingPage;
