import { Hotel } from "shared";

export const persistHotel = (hotel: Hotel) => {
	window.localStorage.setItem("currentHotel", JSON.stringify(hotel));
};

export const getHotel = (): Hotel => {
	const hotelStr = window.localStorage.getItem("currentHotel");

	const hotel: Hotel = hotelStr && JSON.parse(hotelStr);

	return hotel;
};
