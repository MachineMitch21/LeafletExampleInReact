import React from 'react';
import Control from 'react-leaflet-control';
import ViewButton from './ViewButton';
import './MapViewControl.css';
import '../FeatureDetail/FeatureDetail.css';

const MapViewControl = (props) => {
	
	function onViewButtonClicked(e, data) {
		props.onViewChanged(data);
		e.preventDefault();
	}

	let views = props.views.map((element, index) => {
		return (	
      <ViewButton 
        tooltipPlacement={index === 0 ? 'top' : 'right'}
				viewData={element}
				onViewButtonClicked={onViewButtonClicked}
			/>	
		);
	});

	return (
		<Control 
			position="bottomleft"
		>
			<div className="ViewControl info">
				{views}
			</div>
		</Control>
	);
}

export default MapViewControl;