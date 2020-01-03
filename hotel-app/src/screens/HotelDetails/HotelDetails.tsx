import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hotel } from "shared";

import Map from "../../components/Map/Map";
import HotelCard from "../../components/HotelCard/HotelCard";
import { HotelIconStr } from "../../components/Icons/HotelIcon";

import { getHotel } from "../../services/persistanceService";

import {
	addIconMarker,
	updateIcon
} from "../../components/Map/utils/mapService";
import { getHotelById } from "../../services/dataService";

import { useStyles } from "./styles/";
import Loader from "../../components/Loader/Loader";

const HotelDetails = () => {
	const classes = useStyles();
	const [hotel, setHotel] = useState<Hotel>();
	const [error, setError] = useState<Error>();

	const params = new URLSearchParams(useLocation().search);
	const id = params.get("id");

	useEffect(() => {
		const localHotel = getHotel();
		if (localHotel && localHotel.id === id) {
			setHotel(localHotel);
		} else {
			id &&
				getHotelById(id)
					.then(setHotel)
					.catch(setError);
		}
	}, []);

	useEffect(() => {
		hotel && addIconMarker(HotelIconStr, [hotel.location]);
		hotel && updateIcon(hotel?.location, HotelIconStr);
	}, [hotel]);

	return (
		<div className={classes.container}>
			{hotel ? (
				<>
					<div className={classes.details}>
						<HotelCard hotel={hotel} extended />
					</div>
					<div className={classes.map}>
						{hotel && <Map currentLocation={hotel.location} />}
					</div>
				</>
			) : error ? (
				<p>{error.message}</p>
			) : (
				<Loader />
			)}
		</div>
	);
};
export default HotelDetails;
