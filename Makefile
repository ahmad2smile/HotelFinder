start-app:
	cd hotel-app && PORT=3005 npm run start
start-api:
	cd hotel-api && npm run start
start-api-dev:
	cd hotel-api && npm run start:dev
build-shared:
	cd shared && npm run build