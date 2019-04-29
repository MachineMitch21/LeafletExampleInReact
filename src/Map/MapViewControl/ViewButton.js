import React from 'react';
import uuid from 'uuid/v1';
import Tippy from '@tippy.js/react';

const ViewButton = (props) => {
	
  let viewData = props.viewData;
  let id = uuid();

	function onSelfClicked(e) {
		props.onViewButtonClicked(e, viewData);
	}

	return (
    <Tippy content={viewData.tooltip} placement={props.tooltipPlacement}>
      <button>
        <i 
          id={id}
          key={id}
          className={viewData.iconClass}
          onClick={onSelfClicked}
        ></i>
      </button>
    </Tippy>
	);
}

export default ViewButton;