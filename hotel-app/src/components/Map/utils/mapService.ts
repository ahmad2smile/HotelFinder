import { MapLocation } from "shared";

const HERE = (window as any).H;

const platform = new HERE.service.Platform({
	apikey: process.env.REACT_APP_API_KEY
});

const defaultLayers = platform.createDefaultLayers();

let map: any;

export const initMap = (mapElement: HTMLElement) => {
	map = new HERE.Map(mapElement, defaultLayers.vector.normal.map, {
		center: { lat: 50, lng: 5 },
		zoom: 4,
		pixelRatio: window.devicePixelRatio || 1
	});

	createBehavior();
	createUI();
};

export const setZoom = (zoom: number) => map.setZoom(zoom);

export const createBehavior = () =>
	new HERE.mapevents.Behavior(new HERE.mapevents.MapEvents(map));

export const createUI = () => HERE.ui.UI.createDefault(map, defaultLayers);

export const handleResize = () => map.getViewPort().resize();

export const focusOnLocation = (location: MapLocation) => {
	map.setCenter(location);
};

export const addIconMarker = (icon: string, mapLocations: MapLocation[]) => {
	const hereIcon = new HERE.map.Icon(icon);
	const markers = mapLocations.map(
		l => new HERE.map.Marker(l, { icon: hereIcon })
	);
	const markerGroup = new HERE.map.Group();

	markerGroup.addObjects(markers);
	map.addObject(markerGroup);
};
