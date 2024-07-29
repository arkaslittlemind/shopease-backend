# ShopEase Backend

ShopEase is an e-commerce application that includes features for promo codes and referrals. This repository contains the backend API for ShopEase.

## Project Structure
![Structure](https://github.com/arkaslittlemind/shopease-backend/blob/main/Project%20Structure.png)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0 or later)

## Installation & Setup

1. Clone the repository:
   `git clone` [https://github.com/arkaslittlemind/shopease-backend.git](https://github.com/arkaslittlemind/shopease-backend.git) 

2. Change the directory:
  `cd shopease-backend`

3. Install the dependencies:
	`npm install`

4. Create a `.env` file in the root directory and add the following environment variables:

PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_here
 
Replace `your_mongodb_uri ` and `your_jwt_secret_here` with necessary values.

## Running the Application

To run the application in development mode: 
`npm run dev`

To run the application in production mode:
`npm start`
