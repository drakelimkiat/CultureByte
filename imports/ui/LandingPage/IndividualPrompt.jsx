import React from 'react';
import { Link } from 'react-router';

const IndividualPrompt = ({title, subtitle, imageUrl, wrapperClass}) => {
   	return (
      <div className={wrapperClass}>
        <img src={imageUrl} />
        <div className="caption">
          <h1 className="animated fadeInLeftBig">{title}</h1>
          <p className="animated fadeInLeftBig">{subtitle}</p>
          <Link to="/contribution"><span data-scroll className="btn btn-start animated fadeInRightBig">SHARE</span></Link>
        </div>
      </div>
   	);
};

export default IndividualPrompt;
