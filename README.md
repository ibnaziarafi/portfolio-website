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
