# Portfolio Website

An interactive portfolio website with a village-inspired map, project journals, and guestbook experience.

## Local Development

**Prerequisites:** Node.js and Python 3.10+

1. Install frontend dependencies:
   `cd frontend && npm install`
2. Install the FastAPI dependencies:
   `pip install -r backend/requirements.txt`
3. Start the frontend development server:
   `cd frontend && npm run dev`
4. In a second terminal, start the API:
   `cd frontend && npm run api`

## Production Build

Create a production build with:

`cd frontend && npm run build`

Start the production API and serve the built frontend with:

`cd frontend && npm start`

## Deployment Configuration

For the deployed frontend, set this Vercel environment variable:

`VITE_API_URL=https://portfolio-website-backend-beige-pi.vercel.app`

Redeploy the frontend after changing environment variables. Local development can leave `VITE_API_URL` unset because Vite proxies `/api` requests to the local FastAPI server.

## Backend Container

Build the FastAPI image from the repository root:

`docker build -f backend/Dockerfile -t village-portfolio-api .`

Run it locally:

`docker run --rm -p 8000:8000 village-portfolio-api`

The container uses the hosting platform's `PORT` environment variable when provided, defaulting to `8000`.
