import React from 'react';

const IndividualFactoid = ({title, subtitle, imageUrl, wrapperClass}) => {
   	return (
      <div className={wrapperClass}>
        <img src={imageUrl} />
        <div className="caption">
          <h1 className="animated fadeInLeftBig">{title}</h1>
          <p className="animated fadeInLeftBig">{subtitle}</p>
          <a data-scroll className="btn btn-start animated fadeInRightBig" href="">SHARE</a>
        </div>
      </div>
   	);
};

export default IndividualFactoid;
