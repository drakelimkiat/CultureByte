import React from 'react';

const IndividualFactoid = ({title, location, snippet, wrapperClass}) => {
   	return (
      <div className={wrapperClass}>
        <div id="individual-factoid">
          <h3>{title}</h3>
          <h4>{location}</h4>
          <p>{snippet}</p>
        </div>
      </div>
   	);
};

export default IndividualFactoid;
