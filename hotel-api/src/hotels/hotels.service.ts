import { Hotel } from "shared";
import { Injectable } from "@nestjs/common";
import { MapLocation } from "shared";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class HotelsService {
	constructor() {
		const devBaseURL = "https://places.sit.ls.hereapi.com";
		const prodBaseURL = " 	https://places.ls.hereapi.com";

		this._httpService = axios.create({
			baseURL:
				process.env.NODE_ENV === "development"
					? devBaseURL
					: prodBaseURL
		});

		this._httpService.interceptors.request.use(config => ({
			...config,
			params: {
				apiKey: process.env.API_KEY,
				...config.params
			}
		}));
	}

	_httpService: AxiosInstance;

	findAll(location: MapLocation, search: string): Promise<Promise<Hotel[]>> {
		return this._httpService
			.get("/places/v1/browse", {
				params: {
					q: search,
					at: `${location.lat},${location.lng}`
				}
			})
			.then<Promise<Hotel[]>>(res => {
				const items: Array<any> = res.data.results.items;

				return Promise.all(items.map(i => this.getHotel(i)));
			});
	}

	async getHotel(item: any): Promise<Hotel> {
		const response = await this._httpService.get(item.href);

		const hotelDetails = response.data;
		const phoneNumbers = hotelDetails.contacts?.phone;
		const webSites = hotelDetails.contacts?.website;

		const hotel: Hotel = {
			id: item.href,
			title: hotelDetails.name,
			ratings: item.averageRating,
			icon: hotelDetails.icon,
			openingHours: hotelDetails.extended?.openingHours?.text,
			location: {
				lat: hotelDetails.location?.position[0],
				lng: hotelDetails.location?.position[1]
			},
			distance: item.distance,
			address: hotelDetails.location?.address,
			phone: phoneNumbers && phoneNumbers[0]?.value,
			website: webSites && webSites[0]?.value,
			images: hotelDetails.media.images.items
		};

		return hotel;
	}
}
