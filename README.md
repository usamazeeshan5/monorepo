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
