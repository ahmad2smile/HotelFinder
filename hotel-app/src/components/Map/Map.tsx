import React, { useRef, useEffect } from "react";
import { MapLocation } from "shared";

import { initMap, handleResize, setCenter } from "./utils/mapService";

import { useStyles } from "./styles";

interface IProps {
	currentLocation: MapLocation;
}

const Map = ({ currentLocation }: IProps) => {
	const classes = useStyles();
	const mapElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setCenter(currentLocation);
	}, [currentLocation]);

	useEffect(() => {
		let map: any;

		if (mapElementRef.current) {
			map = initMap(mapElementRef.current, currentLocation);

			window.addEventListener("resize", handleResize);
		}

		return () => {
			window.removeEventListener("resize", handleResize);
			map.dispose();
		};
	}, []);

	return (
		<div className={classes.container}>
			<div ref={mapElementRef} className={classes.map}></div>
		</div>
	);
};

export default Map;
