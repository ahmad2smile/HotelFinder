import { MapLocation } from "shared";

const HERE = (window as any).H;
console.log("TCL: process.env.HERE_API_KEY", process.env.REACT_APP_API_KEY);

const platform = new HERE.service.Platform({
	apikey: process.env.REACT_APP_API_KEY,
});

const defaultLayers = platform.createDefaultLayers();

export const getMap = (mapElement: HTMLElement) => {
	return new HERE.Map(mapElement, defaultLayers.vector.normal.map, {
		center: { lat: 50, lng: 5 },
		zoom: 4,
		pixelRatio: window.devicePixelRatio || 1,
	});
};

export const behavior = (map: any) => new HERE.mapevents.Behavior(new HERE.mapevents.MapEvents(map));

export const createUI = (map: any) => () => HERE.ui.UI.createDefault(map, defaultLayers);

export const handleResize = (map: any) => map.getViewPort().resize();

export const focusOnLocation = (map: any, location: MapLocation) => {
	map.setCenter(location);
};
