import React, { useEffect, useState } from "react";
import { Hotel, MapLocation } from "shared";

import { HotelIconStr } from "../../../components/Icons/HotelIcon";
import HotelCard from "../../../components/HotelCard/HotelCard";

import { getHotels, isRequestCanceled } from "../../../services/dataService";
import {
	addIconMarker,
	focusOnLocation,
	updateIcon,
	setZoom
} from "../../../components/Map/utils/mapService";

import Search from "./Search/Search";

import { useStyles } from "./styles";
import ResponsiveComponent from "../../../components/ResponsiveComponent/ResponsiveComponent";
import Loader from "../../../components/Loader/Loader";
import { useDebounce } from "./utils/debounceHook";

interface IProps {
	currentLocation: MapLocation;
}

const Hotels = ({ currentLocation }: IProps) => {
	const classes = useStyles();

	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 500);

	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [activeHotel, setActiveHotel] = useState<Hotel>();
	const [error, setError] = useState<Error>();

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
		getHotels(currentLocation, debouncedSearch)
			.then(setHotels)
			.catch(isRequestCanceled(setError));
	}, [currentLocation, debouncedSearch]);

	return (
		<div className={classes.container}>
			<Search onChange={setSearch} />
			<div className={classes.list}>
				{hotels.length ? (
					hotels.map(h => (
						<ResponsiveComponent
							key={h.id}
							mobile={<HotelCard hotel={h} />}
							desktop={
								<div className={classes.item}>
									<HotelCard
										hotel={h}
										isActive={h.id === activeHotel?.id}
										onClick={setActiveHotel}
									/>
								</div>
							}
						/>
					))
				) : error ? (
					<div>{error.message}</div>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default Hotels;
