import React from "react";

import Map from "../../components/Map/Map";

import Hotels from "./Hotels/Hotels";

import { useStyles } from "./styles";
import { useGeoLocation } from "./utils/geoLocationHook";

const Dashboard = () => {
	const classes = useStyles();
	const { geoLocation } = useGeoLocation();

	return (
		<div className={classes.container}>
			<div className={classes.hotels}>
				<Hotels currentLocation={geoLocation}></Hotels>
			</div>
			<div className={classes.map}>
				<Map currentLocation={geoLocation}></Map>
			</div>
		</div>
	);
};

export default Dashboard;
