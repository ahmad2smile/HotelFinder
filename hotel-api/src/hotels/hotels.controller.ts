import { HotelsService } from "./hotels.service";
import { Controller, Get, Query } from "@nestjs/common";
import { MapLocation } from "shared";

@Controller("hotels")
export class HotelsController {
	constructor(private readonly _hotelsService: HotelsService) {}

	@Get()
	getAll(@Query() mapLocation: MapLocation) {
		return this._hotelsService.findAll(mapLocation);
	}
}
