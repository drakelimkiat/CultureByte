import React from 'react';

const IndividualFactoid = ({title, location, snippet, wrapperClass}) => {
   	return (
      <div className={wrapperClass}>
        <div className="factoid">
          <h1>{title}</h1>
          <p>{snippet}</p>
        </div>
      </div>
   	);
};

export default IndividualFactoid;
