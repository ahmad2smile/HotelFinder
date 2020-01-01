import { Hotel } from "shared";
import { Injectable } from "@nestjs/common";
import { MapLocation } from "shared";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class HotelsService {
	constructor() {
		this._httpService = axios.create({
			baseURL: "https://places.sit.ls.hereapi.com"
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

	findAll(location: MapLocation): Promise<Promise<Hotel[]>> {
		return this._httpService
			.get("/places/v1/browse", {
				params: {
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
			id: item.id,
			title: item.title,
			ratings: item.averageRating,
			icon: item.icon,
			openingHours: item.openingHours?.text,
			location: {
				lat: item.position[0],
				lng: item.position[1]
			},
			distance: item.distance,
			address: hotelDetails.address,
			phone: phoneNumbers && phoneNumbers[0]?.value,
			website: webSites && webSites[0]?.value,
			images: hotelDetails.media.images.items
		};

		return hotel;
	}
}
