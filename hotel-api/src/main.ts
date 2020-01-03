import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

require("dotenv").config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 3000;
	app.enableCors({
		origin: "http://localhost:3005"
	});
	await app.listen(port);
}
bootstrap();
