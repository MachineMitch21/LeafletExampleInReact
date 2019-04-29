import React from 'react';
import uuid from 'uuid/v1';

const ViewButton = (props) => {
	
	let viewData = props.viewData;

	function onSelfClicked(e) {
		props.onViewButtonClicked(e, viewData);
	}

	return (
		<i 
			key={uuid()}
			className={this.viewData.iconClass}
			onClick={onSelfClicked}
		></i>
	);
}

export default ViewButton;