import React from "react";

import Map from "../../components/Map/Map";

import Hotels from "./Hotels/Hotels";

import { useStyles } from "./styles";

const Dashboard = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Hotels></Hotels>
			<Map></Map>
		</div>
	);
};

export default Dashboard;
