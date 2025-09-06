# Blog API (MongoDB + Express)

## Quick start
1. `npm install`
2. Update `.env` with your MongoDB connection.
3. `npm run dev`

## Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/posts`
- `GET  /api/posts/:slug`
- `POST /api/posts` (auth)
- `PUT  /api/posts/:id` (auth)
- `DELETE /api/posts/:id` (auth)
- `GET  /api/categories`
- `POST /api/categories` (auth)
- `GET  /api/comments/post/:postId`
- `POST /api/comments` (auth)
