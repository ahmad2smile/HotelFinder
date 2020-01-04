import axios, { Canceler } from "axios";
import { MapLocation, Hotel } from "shared";

const baseURL =
	process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

const api = axios.create({
	baseURL
});

const CancelToken = axios.CancelToken;
let cancel: Canceler;

export const isRequestCanceled = (callBack: Function) => (error: Error) => {
	if (axios.isCancel(error)) {
		console.log("Request canceled", error.message);
	} else {
		callBack(error);
	}
};

export const getHotels = async (
	mapLocation: MapLocation,
	search: string
): Promise<Hotel[]> => {
	cancel && cancel(); // cancel previous requests

	const response = await api.get("/hotels", {
		cancelToken: new CancelToken(c => (cancel = c)),
		params: { ...mapLocation, search }
	});

	return response.data;
};

export const getHotelById = async (id: string): Promise<Hotel> => {
	const response = await api.get(`/hotels/hotel/?id=${id}`);

	return response.data;
};
