import React from 'react';
import Control from 'react-leaflet-control';
import '../FeatureDetail/FeatureDetail.css';
import './InfoLegend.css';

const InfoLegend = (props) => {

  let legends = props.grades.map((g, i) => {
    return (
      <>
        <i style={{background: props.getColor(g + 1)}}></i>
        {g + props.grades[i + 1] ? (
          <>{g + '-' + props.grades[i + 1] }<br/></>
        ) : (<>{g + '+'}</>)} 
      </>
    );
  });

  return (
    <Control position="bottomright">
      <div className="info legend">
        {legends}
      </div>
    </Control>
  );
}

export default InfoLegend;