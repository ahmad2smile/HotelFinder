import { MapLocation } from "./MapLocation";
import { Address } from "./Address";

export interface Hotel {
	id: string;
	title: string;
	ratings: number;
	icon: string;
	openingHours: string;
	location: MapLocation;
	distance: number;
	address: Address;
	phone: string;
	website: string;
	images: string[];
}
