import React from 'react';
import { Link } from 'react-router';

const IndividualCategory = ({title, subtitle, imageClassName}) => {
  return (
    <div className="folio-item wow fadeInRightBig col-1-2" data-wow-duration="1000ms" data-wow-delay="400ms">
      <div className="folio-image">
        <div className={imageClassName} />
      </div>
      <div className="overlay">
        <div className="overlay-content">
          <div className="overlay-text">
            <div className="folio-info">
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
            <div className="folio-overview">
              <div className="folio-link">
                <Link to="/post"><i className="fa fa-link" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualCategory;
