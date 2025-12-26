# FitLife MERN Project Setup Guide

This guide will help you set up and run the FitLife application with authentication system.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the `backend` directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fitlife
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ```

   **Note:** If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

4. **Start MongoDB**
   - If using local MongoDB, make sure the MongoDB service is running
   - If using MongoDB Atlas, ensure your IP is whitelisted

5. **Run the backend server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

## Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Create environment file** (optional)
   Create a `.env` file in the `frontend` directory if you want to customize the API URL:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the frontend development server**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

## Testing the Authentication

1. **Sign Up**
   - Navigate to `http://localhost:5173/signup`
   - Fill in the form with:
     - Full Name
     - Email Address
     - Password (minimum 6 characters)
     - Confirm Password
   - Click "Sign Up"
   - You should be redirected to the home page and see your name in the navbar

2. **Login**
   - Navigate to `http://localhost:5173/login`
   - Enter your email and password
   - Click "Sign In"
   - You should be logged in and redirected to the home page

3. **Logout**
   - Click the "Logout" button in the navbar
   - You should be logged out and see Login/Sign Up buttons again

## API Endpoints

### Authentication Endpoints

- **POST** `/api/auth/signup`
  - Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "jwt_token_here",
      "message": "User registered successfully"
    }
    ```

- **POST** `/api/auth/login`
  - Request Body:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "jwt_token_here",
      "message": "Login successful"
    }
    ```

## Project Structure

```
fitlife/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── User.js            # User schema
│   ├── routes/
│   │   └── authRoutes.js      # Auth endpoints
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── utils/
│   │   └── generateToken.js   # JWT token generator
│   ├── server.js              # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── InputField.jsx  # Reusable input component
    │   │   ├── Button.jsx
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Login.jsx       # Login page
    │   │   ├── Signup.jsx      # Signup page
    │   │   └── Home.jsx
    │   ├── services/
    │   │   └── api.js          # API service
    │   └── App.jsx
    └── package.json
```

## Features Implemented

✅ **Backend Architecture**
- MongoDB connection with Mongoose
- User model with password hashing (bcrypt)
- JWT token generation and authentication
- Express.js server with CORS enabled

✅ **Frontend Design**
- Beautiful, modern Login page with Tailwind CSS
- Beautiful, modern Signup page with Tailwind CSS
- Responsive design

✅ **Auth APIs**
- Signup endpoint with validation
- Login endpoint with password verification
- Token-based authentication

✅ **Reusable Components**
- InputField component with error handling
- Form validation
- Loading states

## Troubleshooting

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` in `.env`
   - For Atlas, verify your connection string and IP whitelist

2. **CORS Errors**
   - Backend has CORS enabled, but ensure frontend URL matches
   - Check that backend is running on port 5000

3. **Token Issues**
   - Ensure `JWT_SECRET` is set in backend `.env`
   - Tokens expire after 7 days by default

4. **Port Already in Use**
   - Change `PORT` in backend `.env`
   - Update `VITE_API_BASE_URL` in frontend `.env` accordingly

