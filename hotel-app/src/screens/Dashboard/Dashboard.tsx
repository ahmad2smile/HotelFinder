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
			<Hotels currentLocation={geoLocation}></Hotels>
			<Map currentLocation={geoLocation}></Map>
		</div>
	);
};

export default Dashboard;
