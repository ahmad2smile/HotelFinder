import { MapLocation } from "shared";

const HOTEL_ICON_ZOOM = 18;

let map: any;

const HERE = (window as any).H;

const platform = new HERE.service.Platform({
	apikey: process.env.REACT_APP_API_KEY
});

const defaultLayers = platform.createDefaultLayers();

export const initMap = (mapElement: HTMLElement) => {
	map = new HERE.Map(mapElement, defaultLayers.vector.normal.map, {
		center: { lat: 50, lng: 5 },
		zoom: 4,
		pixelRatio: window.devicePixelRatio || 1
	});

	createBehavior();
	createUI();

	return map;
};

export const setZoom = (zoom: number) => map.setZoom(zoom, true);

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
		(l: MapLocation, index: number) =>
			new HERE.map.Marker(l, {
				icon: hereIcon,
				min: HOTEL_ICON_ZOOM,
				max: 30
			})
	);
	const markerGroup = new HERE.map.Group();

	markerGroup.addObjects(markers);
	map.addObject(markerGroup);

	startClustering(mapLocations);
};

const startClustering = (data: MapLocation[]) => {
	var dataPoints = data.map(item => {
		return new HERE.clustering.DataPoint(item.lat, item.lng);
	});

	var clusteredDataProvider = new HERE.clustering.Provider(dataPoints, {
		min: 0,
		max: HOTEL_ICON_ZOOM - 1,
		clusteringOptions: {
			eps: 32,
			minWeight: 2
		}
	});

	var clusteringLayer = new HERE.map.layer.ObjectLayer(clusteredDataProvider);

	map.addLayer(clusteringLayer);
};

let previousIconLocations: MapLocation[] = [];

export const updateIcon = async (mapLocation: MapLocation, icon: string) => {
	const activeIcon = new HERE.map.Icon(icon, { size: { w: 60, h: 60 } });
	const inActiveIcon = new HERE.map.Icon(icon, { size: { w: 30, h: 30 } });

	if (previousIconLocations.length) {
		await Promise.all(
			previousIconLocations.map(l => setIcon(l, inActiveIcon))
		);
		previousIconLocations = [];
	}

	await setIcon(mapLocation, activeIcon);

	previousIconLocations.push(mapLocation);
};

const setIcon = (mapLocation: MapLocation, icon: any): Promise<any> => {
	return new Promise((resolve, _reject) => {
		try {
			const cordsAt = map
				.setZoom(HOTEL_ICON_ZOOM, false)
				.setCenter(mapLocation, false)
				.geoToScreen(mapLocation);

			map.getObjectAt(cordsAt.x, cordsAt.y, (object: any) => {
				if (!object) {
					return console.log(
						`Object at lat: ${mapLocation.lat} and lng: ${mapLocation.lng} not found`
					);
				}

				object.setIcon(icon);

				resolve();
			});
		} catch (error) {
			console.log(
				`Object at lat: ${mapLocation.lat} and lng: ${mapLocation.lng} not found`,
				error
			);
		}
	});
};
