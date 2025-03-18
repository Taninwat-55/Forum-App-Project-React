
# Forum Application

A web application for a forum where users can share ideas and discuss various topics.

## Installation

1. Create project structure

```

// Create root project folder
mkdir forum-app
cd forum-app

// Create separate folders for backend and frontend
mkdir backend
mkdir frontend

```

2. Set up Frontend (React with Vite)

```

// Navigate to frontend folder
cd frontend

// Create a new Vite project
npm create vite@latest . --template react

// Install React Router
npm install react-router-dom

```

3. Set up Backend (Express)

```
// Navigate to backend folder
cd ../backend

// Initialize the package.json
npm init -y

// Install backend dependencies
npm install express cors better-sqlite3 dotenv
npm install nodemon --save-dev

// Create a basic server file
echo "const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});" > server.js

```
4. Set up root project for running both servers

```
// Navigate back to root folder
cd ..

// Initialize the package.json
npm init -y

// Install concurrently for running multiple commands
npm install concurrently --save-dev

```

## Running the Application

### Start both backend and frontend:

```

npm start

```

### Install all dependencies at once:

```

npm run install-deps

```

### Start only the backend:

```
cd backend
npm run server

```

### Start only the frontend:

```
cd frontend
npm run dev

```

## Project Structure

- Backend: Express.js with SQLite using better-sqlite3

- Frontend: React with Vite, React Router, and Context API

## Features

- View discussion threads

- Create new discussion threads

- Reply to existing threads

- Sort threads by latest activity or number of replies

- Filter threads by categories and keywords

- Edit and delete threads and replies

## Technical Requirements

- Frontend: React, React Router, Context API

- Backend: Express.js

- Database: SQLite

- Integration: Better-sqlite3

