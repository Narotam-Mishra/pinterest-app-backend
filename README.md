# SnapApp Backend API

A robust backend implementation for a Pinterest-like photo sharing application built with the MERN stack (MongoDB, Express, React, Node.js).

## 📁 Project Structure

```
backend/
├── controllers/       # Request handlers for different resources
│   ├── board.controller.js
│   ├── comment.controller.js
│   ├── pin.controller.js
│   └── user.controller.js
├── middlewares/       # Custom middleware functions
│   └── verifyToken.js
├── models/            # MongoDB schema definitions
│   ├── board.model.js
│   ├── comment.model.js
│   ├── follow.model.js
│   ├── like.model.js
│   ├── pin.model.js
│   ├── save.model.js
│   └── user.model.js
├── routes/            # API route definitions
│   ├── board.route.js
│   ├── comment.route.js
│   ├── pin.route.js
│   └── user.route.js
├── utilities/         # Helper functions and utilities
├── .env               # Environment variables
├── .gitignore         # Git ignore rules
├── index.js           # Main application entry point
├── package-lock.json  # Dependency lock file
└── package.json       # Project configuration and dependencies
```

## 🚀 Features

- **User Management**: Registration, authentication, profiles, following system
- **Pin Management**: Create, read, update, and delete image pins
- **Board Management**: Create collections to organize pins
- **Social Features**: Comments, likes, and saves
- **JWT Authentication**: Secure endpoints with token verification

## 💾 Data Models

### User Model
Manages user accounts and profiles.

### Pin Model
Represents image pins with their metadata and relationships.

### Board Model
Collections of pins created by users.

### Comment Model
User comments on pins.

### Like Model
Records users' likes on pins.

### Save Model
Tracks pins saved by users.

### Follow Model
Manages user follow relationships.

## 🔒 Authentication

Authentication is implemented using JSON Web Tokens (JWT):

- The `verifyToken.js` middleware validates token authenticity
- Protected routes require valid tokens
- Tokens are issued during login and must be included in request headers

## 🌐 API Endpoints

### User Routes

```
POST   /api/users/register     # Register a new user
POST   /api/users/login        # Authenticate user and return token
GET    /api/users/:id          # Get user profile
PUT    /api/users/:id          # Update user profile
DELETE /api/users/:id          # Delete user account
GET    /api/users/:id/pins     # Get pins created by a user
GET    /api/users/:id/boards   # Get boards created by a user
GET    /api/users/:id/followers # Get user followers
GET    /api/users/:id/following # Get users being followed
```

### Pin Routes

```
POST   /api/pins               # Create a new pin
GET    /api/pins               # Get all pins (with pagination)
GET    /api/pins/:id           # Get a specific pin
PUT    /api/pins/:id           # Update a pin
DELETE /api/pins/:id           # Delete a pin
GET    /api/pins/:id/comments  # Get comments on a pin
POST   /api/pins/:id/comments  # Add a comment to a pin
POST   /api/pins/:id/like      # Like a pin
DELETE /api/pins/:id/like      # Unlike a pin
POST   /api/pins/:id/save      # Save a pin
DELETE /api/pins/:id/save      # Unsave a pin
```

### Board Routes

```
POST   /api/boards             # Create a new board
GET    /api/boards             # Get all boards
GET    /api/boards/:id         # Get a specific board
PUT    /api/boards/:id         # Update a board
DELETE /api/boards/:id         # Delete a board
POST   /api/boards/:id/pins    # Add a pin to a board
DELETE /api/boards/:id/pins/:pinId # Remove a pin from a board
```

### Comment Routes

```
GET    /api/comments/:id       # Get a specific comment
PUT    /api/comments/:id       # Update a comment
DELETE /api/comments/:id       # Delete a comment
```

## ⚙️ Environment Variables

The application uses the following environment variables (defined in `.env`):

```
PORT=5000                                           # Port number for the server
Client_URL=your_app_url                             # Your frontend app url
mongoURL=mongodb://...                              # MongoDB connection string
JWT_SECRET=your_jwt_secret                          # Secret key for JWT signing
IK_PUBLIC_KEY=your_image_kit_public_key             # Your Imagekit.io public key
IK_PRIVATE_KEY=your_image_kit_private_key           # Your Imagekit.io private key
IK_URL_ENDPOINT=your_image_kit_endpoint             # Your Imagekit.io API Endpoint URL
```

## 📋 Prerequisites

- Node.js (v18+)
- MongoDB (v4+)
- npm or yarn

## 🛠️ Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/photopin.git
   cd photopin/backend
   ```

2. Install dependencies
   ```
   npm install
   ```
   
3. Configure environment variables
   - Create a `.env` file based on the variables described above

4. Start the server
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

## 🔧 Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing

## 📚 API Documentation

For detailed API documentation, please refer to our [API Docs](link-to-your-api-docs) or run the server and visit `/api-docs`.

## 🧪 Testing

Run the test suite:

```
npm test
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Narotam Mishra - [GitHub](https://github.com/Narotam-Mishra)