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

### unit tests
- cd client/server
- npm run test

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

## Why Context?
- Lightweight auth state
- No over-engineering (Redux unnecessary here)

## Why mock API?
- Faster development
- Matches requirement scope

## Why Tailwind?
- Rapid UI building
- Keeps styling consistent

## Lightbox Implementation Decision

A custom lightbox was implemented instead of using a third-party carousel library.

### Reasons:
- The required functionality (next/prev navigation) is simple
- Avoided adding unnecessary bundle size
- Demonstrates understanding of UI state and interaction logic

### Tradeoffs:
- Lacks advanced features like touch gestures and accessibility enhancements

### Future Improvement:
- Replace with a library like Swiper if requirements grow