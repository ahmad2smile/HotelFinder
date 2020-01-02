import React, { useEffect, useState } from "react";
import { Hotel, MapLocation } from "shared";

import { HotelIconStr } from "../../../components/Icons/HotelIcon";

import { getHotels } from "../../../services/dataService";
import {
	addIconMarker,
	focusOnLocation,
	updateIcon,
	setZoom
} from "../../../components/Map/utils/mapService";

import HotelCard from "./HotelCard/HotelCard";

import { useStyles } from "./styles";

const Hotels = () => {
	const classes = useStyles();
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [activeHotel, setActiveHotel] = useState<Hotel>();
	const [error, setError] = useState<string>("");

	const addHotelsMarkers = (_hotels: Hotel[]) => {
		addIconMarker(
			HotelIconStr,
			_hotels.map(h => h.location)
		);
	};

	useEffect(() => {
		activeHotel && updateIcon(activeHotel.location, HotelIconStr);
	}, [activeHotel]);

	useEffect(() => {
		const firstHotelResult = hotels[0];

		if (firstHotelResult) {
			addHotelsMarkers(hotels);

			focusOnLocation(firstHotelResult.location);
			setZoom(18);
		}
	}, [hotels]);

	useEffect(() => {
		const mapCenter: MapLocation = { lat: 52.53075, lng: 13.3851 };

		getHotels(mapCenter)
			.then(setHotels)
			.catch(err => setError(err.message));
	}, []);

	return error ? (
		<div>{error}</div>
	) : (
		<div className={classes.container}>
			<div className={classes.list}>
				{hotels.map(h => (
					<HotelCard
						key={h.id}
						hotel={h}
						isActive={h.id === activeHotel?.id}
						onClick={setActiveHotel}
					></HotelCard>
				))}
			</div>
		</div>
	);
};

export default Hotels;
