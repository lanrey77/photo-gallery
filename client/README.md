# Photo Gallery App

## Setup

### Server
cd server
npm install
npm run dev

### Client
cd client
npm install
npm run dev

## Features
- Filter users by location
- Profile page with image grid
- Visitor vs logged-in access control
- Lightbox-ready image display

## Architecture
- React + TypeScript frontend
- Node + Express backend
- Mock authentication via headers

## Tradeoffs
- No database (in-memory data)
- Simplified authentication

## Improvements
- Add pagination
- Add real authentication (JWT)
- Add image upload
- Add tests