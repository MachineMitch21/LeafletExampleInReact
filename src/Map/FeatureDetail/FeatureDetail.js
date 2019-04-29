import React from 'react';
import Control from 'react-leaflet-control';
import './FeatureDetail.css';

const FeatureDetail = (props) => {
  return (
    <Control 
      position="topright"
    >
      <div className="info">
        { 
          props.detail.name !== undefined || props.detail.density !== undefined 
          ?
          <>
            <h4>US Population Density</h4>
            <p>{props.detail.name}</p>
            <p>{props.detail.density}</p> 
          </> 
          :
          <p>Select a state</p> 
        }
      </div>
    </Control>
  );
}

export default FeatureDetail;