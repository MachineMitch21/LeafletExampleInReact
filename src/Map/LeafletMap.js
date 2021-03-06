import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import FeatureDetail from './FeatureDetail/FeatureDetail';
import InfoLegend from './InfoLegend/InfoLegend';
import MapViewControl from './MapViewControl/MapViewControl';
import './LeafletMap.css';

import _ from 'lodash';

import statesData from './StatesData';

const mapTilerSatelliteTiles = 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=M7BoHsl88rAP36sk5bDL';
const openStreetMapTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const openStreetMapAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [36, -85];
const zoomLevel = 10;

class LeafletMap extends Component {
  constructor() {
    super();
    this.state = {
			selectedFeature: {
				name: undefined,
				density: undefined
			},
			grades: [0, 10, 20, 50, 100, 200, 500, 1000],
			mapViews: [
				{
					iconClass: 'fas fa-satellite',
          tilesUrl: mapTilerSatelliteTiles,
          tooltip: 'Satellite View'
				},
				{
					iconClass: 'fas fa-globe',
          tilesUrl: openStreetMapTiles,
          tooltip: 'Basic View'
				}
			],
			currentView: {
				iconClass: 'fas fa-globe',
        tilesUrl: openStreetMapTiles,
        tooltip: 'Basic View'
			}
		};
  }

  getColor = (d) => {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
  }
  
  style = (feature) => {
    return {
        fillColor: this.getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }
  
  highlightFeature = (e) => {
    let layer = e.target;
  
    this.setState({
      selectedFeature: {
        name: layer.feature.properties.name,
        density: layer.feature.properties.density
      }
    });

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
  
    layer.bringToFront();
  }
  
  resetHighlight = (e) => {
    this.refs.geojson.leafletElement.resetStyle(e.target);
  }

  zoomToFeature = (e) => {
    this.refs.map.leafletElement.fitBounds(e.target.getBounds());
  }

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature
    });
  }

  onMapViewChanged = (mv) => {
    let cv = this.state.currentView;

    if (!_.isEqual(cv, mv)) {
      this.setState({
        currentView: mv
      });
    }
  }

  render() {
    return (
			<>
				<Map ref="map" center={mapCenter} zoom={zoomLevel} style={{ width: '100%', height: '100%' }}>
					<TileLayer attribution={openStreetMapAttr} url={this.state.currentView.tilesUrl} />
					<GeoJSON ref="geojson" data={statesData} style={this.style} onEachFeature={this.onEachFeature} />
					<FeatureDetail detail={this.state.selectedFeature} />
					<InfoLegend getColor={this.getColor} grades={this.state.grades} />
          <MapViewControl views={this.state.mapViews} onViewChanged={this.onMapViewChanged} />
				</Map>
			</>
		);
  }
}

export default LeafletMap;