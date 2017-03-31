import React from 'react';
import IndividualCategory from './IndividualCategory.jsx';

const CategorySection = () => {
   	return (
		<div id="category">
			<div className="cb-row category-header wow fadeInUp">
				<h2>Categories of CultureByte</h2>
				<p>Please select a category to begin!</p>
			</div>
			<div className="container-fluid">
				<IndividualCategory
					title="Hot"
					subtitle="Read the most popular culture bytes"
					imageClassName="category-image trending-category" />
				<IndividualCategory
					title="New"
					subtitle="Read culture bytes that were recently added"
					imageClassName="category-image recent-additions-category" />
			</div>
		</div>
   	);
};

export default CategorySection;
