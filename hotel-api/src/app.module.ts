import { Module } from "@nestjs/common";
import { HotelsModule } from "./hotels/hotels.module";

@Module({
	imports: [HotelsModule]
})
export class AppModule {}
