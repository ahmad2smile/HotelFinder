import React, { useRef, useEffect } from "react";

import { initMap, handleResize } from "./utils/mapService";

import { useStyles } from "./styles";

const Map = () => {
	const classes = useStyles();
	const mapElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let map: any;

		if (mapElementRef.current) {
			map = initMap(mapElementRef.current);

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
