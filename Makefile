start-app:
	cd hotel-app && PORT=3005 npm run start
start-api:
	cd hotel-api && npm run start
start-api-dev:
	cd hotel-api && npm run start:dev
build-shared:
	cd shared && npm i && npm run build
build-app:
	cd hotel-app && npm i && npm run build
clean-client:
	rm -rf hotel-api/client/*
move-app-contents: clean-client
	cp -r hotel-app/build/* hotel-api/client/
build: build-app move-app-contents
	cd hotel-api && npm i && npm run build