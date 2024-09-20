# Task Management System

## Overview

Task Management APIs are built using Node.js, Express, SQLite, Prisma. It provides endpoints for user authentication and task management. Swagger is used for API documentation

## Features
- User authentication (signup and login)
- Task creation, retrieval, updating, and deletion
- User-specific task access (authorization)

## Prerequisites
- Node.js (version 18 or higher)
- Prisma

## Installation
- Clone the repository:

 ```sh
  git clone git@github.com:nada3zz/taskManagmentAPI.git
  cd taskManagmentAPI
```
- Install dependencies:

```sh
npm install
```
- Setup the database:

The database schema is defined using Prisma with SQLite. To visualize the DB run:

```sh
npx prisma studio
```
- Environment Variables
  - use env.example and add your environment variables then remove .example extension. ( only need to add access token secret)

- Start the development server:

```sh
npm run dev 
```
The server will be running on http://localhost:3000

## API Documentation
The API documentation is available through Swagger. After starting the server, navigate to:

```sh
http://localhost:3000/api-docs
```