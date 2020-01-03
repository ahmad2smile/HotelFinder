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
clean-public:
	rm -rf hotel-api/public/ && mkdir hotel-api/public/
move-app-contents: clean-public
	cp -r hotel-app/build/* hotel-api/public/
build: build-app move-app-contents
	cd hotel-api && npm i && npm run build