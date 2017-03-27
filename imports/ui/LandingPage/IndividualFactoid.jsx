import React from 'react';
import { Link } from 'react-router';

const IndividualFactoid = ({title, location, snippet, wrapperClass}) => {
   	return (
      <div className={wrapperClass}>
        <div id="individual-factoid">
          <Link to="/post">
            <h3>{title}</h3>
            <h4>{location}</h4>
            <p>{snippet}</p>
          </Link>
        </div>
      </div>
   	);
};

export default IndividualFactoid;
