import { useState, useEffect } from "react";
import { MapLocation } from "shared";

export const useGeoLocation = () => {
	const [geoLocation, setGeoLocation] = useState<MapLocation>({
		lat: 52.53075,
		lng: 13.3851
	});
	const [error, setError] = useState<PositionError>();

	const onSuccess = ({ coords }: Position) => {
		setGeoLocation({ lat: coords.latitude, lng: coords.longitude });
	};

	const onError = (error: PositionError) => {
		setError(error);
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess, onError, {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		});
	}, []);

	return { geoLocation, error };
};
