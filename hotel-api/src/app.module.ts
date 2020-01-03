import { Module } from "@nestjs/common";
import { HotelsModule } from "./hotels/hotels.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "client")
		}),
		HotelsModule
	]
})
export class AppModule {}
