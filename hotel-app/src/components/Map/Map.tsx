import React, { useRef, useEffect } from "react";
import { getMap, createUI, behavior, handleResize, focusOnLocation } from "./utils/mapService";
import { MapLocation } from "../../models/MapLocation";

const Map = () => {
	const mapElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let map: any;

		if (mapElementRef.current) {
			map = getMap(mapElementRef.current);
			behavior(map);
			createUI(map);

			const location: MapLocation = { lat: 52.5159, lng: 13.3777 };
			focusOnLocation(map, location);

			window.addEventListener("resize", handleResize(map));
		}

		return () => window.removeEventListener("resize", handleResize(map));
	}, []);

	return (
		<div>
			Map
			<div style={{ height: "70vh" }} ref={mapElementRef}></div>
		</div>
	);
};

export default Map;
