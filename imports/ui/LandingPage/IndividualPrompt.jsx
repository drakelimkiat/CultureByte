import React from 'react';

const IndividualPrompt = ({title, subtitle, imageClassName, wrapperClass}) => {
   	return (
      <div className={wrapperClass}>
        <div className="caption">
          <h1 className="animated fadeInDownBig">{title}</h1>
          <p className="animated fadeInDownBig">{subtitle}</p>
          <a data-scroll className="btn btn-start animated fadeInUpBig" href="">Write Now</a>
        </div>
      </div>
   	);
};

export default IndividualPrompt;
