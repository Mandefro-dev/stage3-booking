# stage3-booking

Advanced API with Authentication and Role-Based Access Control (RBAC)
Welcome to the Stage Three Task! This project introduces JWT-based authentication and role-based access control to enhance the security and functionality of the API. The documentation below will guide you on how to set up, interact with, and test the API.

🚀 Project Overview
This API supports user management and secures routes based on user roles (admin and user). It includes:

Authentication: Secure signup and login with hashed passwords and JWT tokens.
Role-Based Access Control (RBAC): Limits access to specific routes based on user roles.
CRUD Operations: Protected endpoints for managing resources (e.g., books).
Custom Features: A /books/recommendations route that uses user data.
📂 Features

1. Authentication
   JWT-Based Authentication
   Tokens are generated on login and required for all protected routes.
   Routes:
   POST /auth/signup: Register a new user.
   POST /auth/login: Authenticate and retrieve a JWT token.
2. Role-Based Access Control
   Admin-only:

   GET /books/all: View all books (admin access only).

   User-accessible:

   GET /books: View books based on user criteria.
   POST /books: Add new books (users can only create).

3. Custom Feature

   GET /books/recommendations: Suggest books based on user preferences (requires authentication).
   🔧 Setup Instructions
   Prerequisites
   Ensure you have the following installed:

Node.js
npm or yarn
MongoDB (if using a database)
Postman (for API testing)

++++Use this live demo to checkout https://stage3-booking-web.onrender.com endpoints

🛠️ Endpoints
Authentication

Signup
URL: POST /auth/signup
Body:
{
"username": "example",
"email:"example@gmail.com",
"password": "password",
"role": "admin" or "Student"
}

Login

URL: POST /auth/login
Body:

{
"email": "example@gmail.com",
"password": "password"
}
Response:

{

"token": "<jwt-token>"
}

Admin-Only Routes

Get All Books
URL: GET api/books/all
Headers:
{
"Authorization": "Bearer <jwt-token>"
}

User-Accessible Routes
Get api/Books
URL: GET api/books
Headers:
{
"Authorization": "Bearer <jwt-token>"
}

Add a Book:

URL: POST api/books
Headers:
{
"Authorization": "Bearer <jwt-token>"
}
Body:

{
"title": "Book Title",
"author": "Author Name",
"isbn":"12345",
"publishedYear":"1997",
"genre":"fantasy"

}

Custom Feature
Recommendations
URL: GET /books/recommendations
Headers:
{
"Authorization": "Bearer <jwt-token>"
}

📖 API Documentation
Swagger: Visit /api-docs after starting the server.
Postman Collection: Download here.
🌐 Deployment
The API is live and can be accessed at: https://stage3-booking-web.onrender.com

🛡️ Security
Passwords are hashed using bcrypt.
Tokens are verified for all protected routes.
Role checks are implemented for admin-specific endpoints.
📝 Testing
Use Postman or any API testing tool to interact with the API. Ensure you:

Register a user via /auth/signup.
Login to retrieve a JWT token via /auth/login.
Use the token in the Authorization header for accessing protected routes.
For questions or feedback, feel free to contact mandefroendalk00@gmail.com. Happy coding! 🎉
