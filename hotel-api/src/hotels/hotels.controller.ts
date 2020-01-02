import { HotelsService } from "./hotels.service";
import { Controller, Get, Query } from "@nestjs/common";
import { MapLocation } from "shared";
import { HotelsDto } from "./models/HotelsDto";

@Controller("hotels")
export class HotelsController {
	constructor(private readonly _hotelsService: HotelsService) {}

	@Get()
	getAll(@Query() query: HotelsDto) {
		const location: MapLocation = { lat: query.lat, lng: query.lng };

		return this._hotelsService.findAll(location, query.search);
	}
}
