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
import Search from "./Search/Search";

interface IProps {
	currentLocation: MapLocation;
}

const Hotels = ({ currentLocation }: IProps) => {
	const classes = useStyles();
	const [search, setSearch] = useState("");
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
		getHotels(currentLocation, search)
			.then(setHotels)
			.catch(err => setError(err.message));
	}, [currentLocation, search]);

	return error ? (
		<div>{error}</div>
	) : (
		<div className={classes.container}>
			<Search onChange={setSearch} />
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
