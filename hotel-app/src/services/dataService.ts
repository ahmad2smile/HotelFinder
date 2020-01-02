import axios from "axios";
import { MapLocation, Hotel } from "shared";

const baseURL = "http://localhost:3000";

const api = axios.create({
	baseURL
});

export const getHotels = async (
	mapLocation: MapLocation,
	search: string
): Promise<Hotel[]> => {
	const response = await api.get("/hotels", {
		params: { ...mapLocation, search }
	});

	return response.data;
};
