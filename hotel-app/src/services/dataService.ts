import axios from "axios";
import { MapLocation, Hotel } from "shared";

const baseURL = "http://localhost:3000";

const api = axios.create({
	baseURL,
});

export const getHotels = async (mapLocation: MapLocation): Promise<Hotel[]> => {
	const response = await api.get("/hotels", { params: mapLocation });

	return response.data;
};
