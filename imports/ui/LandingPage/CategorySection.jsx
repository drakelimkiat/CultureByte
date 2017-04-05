import React from 'react';
import IndividualCategory from './IndividualCategory.jsx';

const CategorySection = () => {
  const MediaQuery = require('react-responsive');
  const text = (
    <div>
      <h2>Categories of CultureByte</h2>
      <p>Please select a category to begin!</p>
    </div>
  );
  return (
    <div id="category">
      <div className="cb-row category-header wow fadeInUp">
        <MediaQuery minDeviceWidth={601} className="desktop-screen">{text}</MediaQuery>
        <MediaQuery maxDeviceWidth={600} className="mobile-screen">{text}</MediaQuery>
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
