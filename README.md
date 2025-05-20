NestJS Microservices Monorepo
This project is a NestJS monorepo that demonstrates a microservice architecture using TCP communication, MongoDB, Swagger API docs, and clean separation of concerns.

Project Structure


monorepo-nestjs/
├── apps/
│   ├── gateway/              # Public HTTP API (REST + Swagger)
│   │   ├── src/
│   │   │   ├── auth/         # AuthController, AuthService (communicates with microservice)
│   │   │   └── main.ts       # Boots up REST gateway
│   ├── authentication/       # TCP microservice for user management
│   │   ├── src/
│   │   │   ├── users/        # User service, repository, schema
│   │   │   ├── authentication.controller.ts
│   │   │   └── main.ts       # Boots up microservice on TCP
├── package.json
├── tsconfig.json
├── docker-compose.yml        # (Optional) for containerized environments
Architecture
Microservices via TCP
The Gateway App (REST) sends messages over TCP to the Authentication Microservice, which handles:

Registering users

Listing users

Communication Flow
Gateway receives HTTP request (POST /auth/register)

AuthService uses ClientProxy to send { cmd: 'register' } with payload via TCP

Authentication Microservice listens using @MessagePattern, then:

Validates via DTO

Checks MongoDB for duplicates

Returns created user

Gateway responds to the HTTP client with the result

Swagger API Docs
The Gateway App exposes Swagger docs at:

http://localhost:3000/api
Includes endpoints:

POST /auth/register – Register a user

GET /auth/users – List users

Installation & Running
1. Install Dependencies

npm install
2. Start MongoDB
Make sure MongoDB is running locally, or use Docker:

docker run -d -p 27017:27017 --name mongo mongo
3. Start Microservice (Authentication)

npm run start:dev authentication
This starts the TCP server on port 8877.

4. Start Gateway App (REST + Swagger)

npm run start:dev gateway
Runs on http://localhost:3000.

Dockerized Setup (Optional)
Run everything with Docker:

docker-compose up --build
This starts:

MongoDB

TCP microservice (authentication)

REST gateway (with Swagger UI)

✅ Features
✅ NestJS Microservices (TCP)

✅ User Registration & Listing

✅ MongoDB + Mongoose

✅ DTO Validation (class-validator)

✅ Swagger Integration

✅ Modular Architecture

✅ Scalable for additional microservices

API's
Register User

POST /auth/register
Content-Type: application/json

{
  "email": "usamaconversions@gmail.com",
  "password": "StrongPassword123",
}
List Users
http

GET /auth/users

Postman Collection:

{
	"info": {
		"_postman_id": "2c5d388d-9154-4139-92f9-7907759cf24c",
		"name": "NestJS Monorepo Auth API",
		"description": "Basic requests for Gateway Auth API",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "37739866"
	},
	"item": [
		{
			"name": "Register User",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n  \"email\": \"usamazeeshan@gmail.com\",\n  \"password\": \"StrongPassword123\"\n}"
				},
				"url": "http://localhost:3000/auth/register",
				"description": "### Register User\n\nThis endpoint allows the user to register with the application.\n\n#### Request Body\n\n- email (string, required): The email of the user.\n    \n- password (string, required): The password for the user account.\n    \n\n#### Response\n\nThe response will be a JSON object with the following properties:\n\n- email (string): The email of the registered user.\n    \n- password (string): The password of the registered user.\n    \n- _id (string): The unique identifier for the user.\n    \n- createdAt (string): The timestamp of when the user account was created.\n    \n- updatedAt (string): The timestamp of when the user account was last updated.\n    \n- __v (number): Version number of the user account.\n    \n\n#### Example Response\n\n``` json\n{\n    \"email\": \"\",\n    \"password\": \"\",\n    \"_id\": \"\",\n    \"createdAt\": \"\",\n    \"updatedAt\": \"\",\n    \"__v\": 0\n}\n\n ```"
			},
			"response": [
				{
					"name": "response",
					"originalRequest": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"email\": \"usamazeeshan@gmail.com\",\n  \"password\": \"StrongPassword123\"\n}"
						},
						"url": "http://localhost:3000/auth/register"
					},
					"status": "Created",
					"code": 201,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "184"
						},
						{
							"key": "ETag",
							"value": "W/\"b8-DDm0m6jkMvkq+JD/LuK2e7sMLPY\""
						},
						{
							"key": "Date",
							"value": "Tue, 20 May 2025 06:40:39 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"email\": \"usamazeeshan@gmail.com\",\n    \"password\": \"StrongPassword123\",\n    \"_id\": \"682c23e7903078aaf2ade44a\",\n    \"createdAt\": \"2025-05-20T06:40:39.528Z\",\n    \"updatedAt\": \"2025-05-20T06:40:39.528Z\",\n    \"__v\": 0\n}"
				}
			]
		},
		{
			"name": "Get Users",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Accept",
						"value": "application/json"
					}
				],
				"url": "http://localhost:3000/auth/users"
			},
			"response": [
				{
					"name": "response",
					"originalRequest": {
						"method": "GET",
						"header": [
							{
								"key": "Accept",
								"value": "application/json"
							}
						],
						"url": "http://localhost:3000/auth/users"
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "480"
						},
						{
							"key": "ETag",
							"value": "W/\"1e0-HKrZLn+TpzA3kDjyKaATMxd7fn8\""
						},
						{
							"key": "Date",
							"value": "Tue, 20 May 2025 06:41:00 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "[\n    {\n        \"_id\": \"682b62172c194dff0026ed79\",\n        \"name\": \"John Doe\",\n        \"email\": \"john.doe@example.com\",\n        \"password\": \"secure123\",\n        \"__v\": 0\n    },\n    {\n        \"_id\": \"682c2359903078aaf2ade446\",\n        \"email\": \"user@example.com\",\n        \"password\": \"StrongPassword123\",\n        \"createdAt\": \"2025-05-20T06:38:17.520Z\",\n        \"updatedAt\": \"2025-05-20T06:38:17.520Z\",\n        \"__v\": 0\n    },\n    {\n        \"_id\": \"682c23e7903078aaf2ade44a\",\n        \"email\": \"usamazeeshan@gmail.com\",\n        \"password\": \"StrongPassword123\",\n        \"createdAt\": \"2025-05-20T06:40:39.528Z\",\n        \"updatedAt\": \"2025-05-20T06:40:39.528Z\",\n        \"__v\": 0\n    }\n]"
				}
			]
		}
	]
}
Loom Video Url:
https://www.loom.com/share/1a771ec95056440aa3cb9036757da685?sid=78874792-04ac-44cb-8db2-7d10da794ffa
