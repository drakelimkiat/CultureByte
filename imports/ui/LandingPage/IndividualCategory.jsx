import React from 'react';

const IndividualCategory = ({title, subtitle, imageClassName}) => {
   	return (
   		<div className="folio-item wow fadeInRightBig col-1-2">
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
							<div className="folio-link"><i className="fa fa-link"></i></div>
						</div>
					</div>
				</div>
			</div>
   		</div>
   	);
};

export default IndividualCategory;