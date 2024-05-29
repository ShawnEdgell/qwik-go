# Qwik-Go

A full-stack web application that manages user authentication and data. The backend is built with Go and the Gin web framework, while the frontend is developed using Qwik, Tailwind CSS, and Daisy UI.

## Technologies

### Backend
- **Go**: The programming language used for building the backend.
- **Gin**: A high-performance HTTP web framework for Go.
- **SQL**: For database interactions.
- **bcrypt**: For hashing passwords.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **CORS Middleware**: Middleware for handling Cross-Origin Resource Sharing.
- **godotenv**: For managing environment variables.

### Frontend
- **Qwik**: A fast, resumable JavaScript framework.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Daisy UI**: A component library built on top of Tailwind CSS for beautiful UI components.

## Features

- User registration and login with hashed passwords
- JWT-based authentication and authorization
- Protected routes requiring JWT tokens
- Basic CRUD operations for user data
- Middleware for logging, recovery, and CORS handling
- Responsive and modern frontend using Qwik, Tailwind CSS, and Daisy UI
- User list display and management on the frontend
