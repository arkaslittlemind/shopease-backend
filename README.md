# ShopEase Backend

ShopEase is an e-commerce application that includes features for promo codes and referrals. This repository contains the backend API for ShopEase.

## Project Structure
shopease-backend/ 
├── config/ 
│ └── database.js 
├── models/ 
│  ├── user.model.js  
│  ├── promo-code.model.js  
│  └── referral.model.js 
├── controllers/ 
│   ├── user.controller.js 
│   ├── promo-code.controller.js 
│   └── referral.controller.js 
├── routes/ 
│   └── api.routes.js 
├── middlewares/ 
│   └── auth.middleware.js 
├── .env 
├── .gitignore 
├── package.json 
├── server.js 
└── README.md

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0 or later)

## Installation & Setup

1. Clone the repository:
   git clone [https://github.com/arkaslittlemind/shopease-backend.git](https://github.com/arkaslittlemind/shopease-backend.git) 
   `cd shopease-backend`

2. Install the dependencies:
	`npm install`

3. Create a `.env` file in the root directory and add the following environment variables:

PORT=3000 
MONGO_URI=your_mongodb_uri_here
 JWT_SECRET=your_jwt_secret_here
 
Replace `your_mongodb_uri ` and `your_jwt_secret_here` with necessary values.

## Running the Application

To run the application in development mode: 
`npm run dev`
To run the application in production mode:
`npm start`
