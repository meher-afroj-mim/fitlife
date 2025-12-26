# FitLife Backend

Backend server for FitLife application built with Node.js, Express.js, and MongoDB.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fitlife
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in your `.env` file.

4. **Run the Server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/auth/signup** - Register a new user
  - Body: `{ name, email, password }`
  - Returns: User object with JWT token

- **POST /api/auth/login** - Login user
  - Body: `{ email, password }`
  - Returns: User object with JWT token

- **GET /api/health** - Health check endpoint

## Project Structure

```
backend/
├── config/
│   └── db.js          # MongoDB connection
├── models/
│   └── User.js        # User model/schema
├── routes/
│   └── authRoutes.js  # Authentication routes
├── middleware/
│   └── auth.js        # Authentication middleware
├── utils/
│   └── generateToken.js # JWT token generation
└── server.js          # Express server setup
```

