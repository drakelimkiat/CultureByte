import React, { Component } from 'react';
import TitleSection from './TitleSection.jsx';
import TeamSection from './TeamSection.jsx';
import CategorySection from './CategorySection.jsx';
import PromptSection from './PromptSection.jsx';
import FactoidSection from './FactoidSection.jsx';

const Index = () => {
	document.title = 'CultureByte';
	return (
		<div>
			<FactoidSection />
			<hr />
			<CategorySection />
			<PromptSection />
			<TeamSection />
		</div>
	);
};

export default Index;
