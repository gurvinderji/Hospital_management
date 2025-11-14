# API Project

A full-featured Node.js REST API for managing users, messages, and appointments with authentication, file uploads, and database integration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- **User Management**: Register, login, and manage user profiles
- **Authentication**: JWT-based authentication with secure password hashing
- **Messages**: Send and receive messages between users
- **Appointments**: Schedule and manage appointments
- **File Uploads**: Support for image uploads to Cloudinary
- **Security**: CORS protection, password encryption with bcrypt
- **Database**: MongoDB integration with Mongoose ORM
- **Error Handling**: Comprehensive error handling middleware
- **Development**: Hot reload support with Nodemon

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **File Storage**: Cloudinary
- **Validation**: Validator.js
- **Development**: Nodemon for hot reload

## Project Structure

```
api/
├── controller/           # Business logic controllers
│   ├── user.controller.js
│   ├── message.controller.js
│   └── appointment.controller.js
├── models/              # Database schemas
│   ├── user.model.js
│   ├── message.model.js
│   └── appointment.model.js
├── routes/              # API route definitions
│   ├── user.route.js
│   └── message.route.js
├── middlewares/         # Custom middlewares
│   ├── auth.js          # Authentication middleware
│   ├── error.js         # Error handling middleware
│   └── catchAsyncError.js
├── utils/               # Utility functions
│   └── jwtToken.js      # JWT token generation
├── db/                  # Database configuration
│   └── db.js            # MongoDB connection
├── index.js             # Application entry point
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables (not committed)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account (for file uploads)

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   copy .env.example .env
   ```

4. **Configure environment variables** (see [Environment Variables](#environment-variables) section)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8080

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Frontend URLs
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001

# Cloudinary Configuration
CLOUDINERY_CLOUD_NAME=your_cloud_name
CLOUDINERY_API_KEY=your_api_key
CLOUDINERY_API_SECRET=your_api_secret

# JWT Configuration
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# SMTP Configuration (if needed for emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

**Important**: Never commit the `.env` file. It contains sensitive information.

## Running the Project

### Development Mode

```bash
npm run dev
```

The server will start on the configured PORT (default: 8080) and automatically reload on file changes.

### Production Mode

```bash
node index.js
```

## API Endpoints

### User Routes

- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/users` - Get all users
- `GET /api/user/:id` - Get user by ID
- `PUT /api/user/:id` - Update user profile
- `DELETE /api/user/:id` - Delete user account
- `POST /api/upload-avatar` - Upload user avatar

### Message Routes

- `POST /api/message/send` - Send a message
- `GET /api/message/:userId` - Get messages for a user
- `DELETE /api/message/:messageId` - Delete a message

### Appointment Routes

- `POST /api/appointment/book` - Book an appointment
- `GET /api/appointments/:userId` - Get user's appointments
- `PUT /api/appointment/:appointmentId` - Update appointment
- `DELETE /api/appointment/:appointmentId` - Cancel appointment

## Dependencies

| Package            | Version   | Purpose               |
| ------------------ | --------- | --------------------- |
| express            | ^5.1.0    | Web framework         |
| mongoose           | ^8.19.3   | MongoDB ORM           |
| jsonwebtoken       | ^9.0.2    | JWT authentication    |
| bcrypt             | ^6.0.0    | Password hashing      |
| cloudinary         | ^2.8.0    | File upload service   |
| cors               | ^2.8.5    | Cross-origin requests |
| dotenv             | ^17.2.3   | Environment variables |
| cookie-parser      | ^1.4.7    | Cookie parsing        |
| express-fileupload | ^1.5.2    | File upload handling  |
| validator          | ^13.15.23 | Data validation       |

## Development Dependencies

- **nodemon** - For automatic server restart during development

Install with:

```bash
npm install --save-dev nodemon
```

## Error Handling

The API includes comprehensive error handling:

- **Async Error Wrapper**: `catchAsyncError.js` middleware wraps async route handlers
- **Global Error Handler**: `error.js` middleware catches all errors
- **Custom Error Messages**: Meaningful error responses for different scenarios
- **Status Codes**: Proper HTTP status codes for different error types

## Security Considerations

1. **Environment Variables**: Store sensitive data in `.env` file
2. **CORS**: Configured to allow specific frontend origins
3. **Password Hashing**: All passwords hashed with bcrypt
4. **JWT**: Tokens for secure authentication
5. **File Uploads**: Validated and stored on Cloudinary
6. **Input Validation**: Using validator.js for data validation

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## Detailed Component Documentation

### Controllers

Controllers contain the business logic for handling API requests. They interact with models and send responses to the client.

#### **User Controller** (`controller/user.controller.js`)

Handles all user-related operations:

- **patientRegister**: Register new patient users

  - Validates all required fields
  - Checks for duplicate email
  - Creates user with role "Patient"
  - Returns JWT token

- **login**: Authenticate users (Patient/Admin/Doctor)

  - Validates email and password
  - Verifies password using bcrypt
  - Generates JWT token
  - Sets secure httpOnly cookie

- **addNewAdmin**: Add new admin users (admin-only)

  - Requires admin authentication
  - Creates user with role "Admin"

- **addNewDoctor**: Add new doctor users (admin-only)

  - Creates user with role "Doctor"
  - Assigns doctor to department
  - Sets up doctor avatar

- **getUserDetails**: Get current user profile

  - Returns authenticated user information
  - Works for both Patient and Admin roles

- **logoutPatient/logoutAdmin**: Clear authentication tokens
  - Removes JWT tokens from cookies

#### **Message Controller** (`controller/message.controller.js`)

Manages contact/message submissions from users:

- **sendMessage**: Send a message
  - Validates sender information
  - Stores message in database
  - Returns success response

#### **Appointment Controller** (`controller/appointment.controller.js`)

Handles appointment scheduling:

- **postAppointment**: Book new appointment

  - Validates patient and doctor information
  - Checks appointment availability
  - Creates appointment record

- **getAppointments**: Retrieve appointments

  - Get all appointments (admin)
  - Get user-specific appointments

- **updateAppointmentStatus**: Modify appointment status

  - Update appointment details
  - Change appointment status

- **deleteAppointment**: Cancel appointment

---

### Middlewares

Middlewares process requests before they reach controllers and handle cross-cutting concerns.

#### **Authentication Middleware** (`middlewares/auth.js`)

Protects routes and verifies user identity:

- **isAdminAuthenticated**: Verify admin user

  - Extracts JWT token from cookies
  - Validates token signature
  - Checks user role is "Admin"
  - Throws 403 error if not admin

- **isPatientAuthenticated**: Verify patient user
  - Extracts JWT token from cookies
  - Validates token signature
  - Checks user role is "Patient"
  - Throws 401 if not authenticated

**Usage**:

```javascript
// Protect a route
userRouter.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
```

#### **Error Handling Middleware** (`middlewares/error.js`)

Handles all errors across the application:

- **ErrorHandler Class**: Custom error class

  - Extends JavaScript Error class
  - Stores error message and status code
  - Example: `new ErrorHandler("User not found", 404)`

- **errorMiddleware**: Global error handler
  - Catches all thrown errors
  - Handles MongoDB validation errors (code 11000)
  - Handles JWT errors (expired, invalid tokens)
  - Handles MongoDB cast errors
  - Returns consistent error response format

**Error Response Format**:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

#### **Async Error Wrapper** (`middlewares/catchAsyncError.js`)

Wraps async functions to catch unhandled promise rejections:

```javascript
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
```

**Usage**:

```javascript
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  // Async logic here - errors automatically passed to error middleware
});
```

---

### Database Schemas/Models

Models define the structure of data stored in MongoDB.

#### **User Model** (`models/user.model.js`)

Stores user information for patients, doctors, and admins.

**Fields**:
| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| firstName | String | Min 3 chars | ✓ |
| lastName | String | Min 3 chars | ✓ |
| email | String | Valid email format | ✓ |
| phone | String | Exact 10 digits | ✓ |
| nic | String | Exact 12 digits | ✓ |
| dob | Date | - | ✓ |
| gender | String | "Male" or "Female" | ✓ |
| password | String | Min 8 chars, hashed | ✓ |
| role | String | "Patient", "Doctor", "Admin" | ✓ |
| doctorDepartment | String | Department name | Optional |
| docAvatar | Object | { public_id, url } | Optional |

**Methods**:

- **generateJsonWebToken()**: Creates JWT token for authentication
- **comparePassword()**: Validates password during login

**Pre-hooks**:

- Hash password before saving using bcrypt (salt rounds: 10)

#### **Message Model** (`models/message.model.js`)

Stores contact/inquiry messages from users.

**Fields**:
| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| firstName | String | Min 3 chars | ✓ |
| lastName | String | Min 3 chars | ✓ |
| email | String | Valid email | ✓ |
| phone | String | Exact 10 digits | ✓ |
| message | String | Min 10 chars | ✓ |
| createdAt | Date | Auto timestamp | ✓ |

#### **Appointment Model** (`models/appointment.model.js`)

Stores appointment booking information.

**Fields**:
| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| firstName | String | Min 3 chars | ✓ |
| lastName | String | Min 3 chars | ✓ |
| email | String | Valid email | ✓ |
| phone | String | Exact 10 digits | ✓ |
| nic | String | Exact 12 digits | ✓ |
| dob | Date | - | ✓ |
| gender | String | "Male" or "Female" | ✓ |
| appointment_date | String | Date string | ✓ |
| department | String | Department name | ✓ |
| doctor | Object | Doctor reference | ✓ |
| hasVisited | Boolean | Default: false | - |
| status | String | "Pending", "Accepted", "Rejected" | - |

---

### Utility Functions

Helper functions used across the application.

#### **JWT Token Utility** (`utils/jwtToken.js`)

**generateToken(user, message, statusCode, res)**

Generates JWT token and sets secure cookie.

**Parameters**:

- `user`: User object from database
- `message`: Success message to return
- `statusCode`: HTTP status code
- `res`: Express response object

**Features**:

- Creates JWT token using user's generateJsonWebToken() method
- Sets different cookie names based on user role:
  - "adminToken" for admins
  - "patientToken" for patients
- Uses httpOnly flag for security (prevents XSS attacks)
- Sets cookie expiration based on environment variable

**Response Format**:

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    /* user object */
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Routes

Define API endpoints and connect them to controllers.

#### **User Routes** (`routes/user.route.js`)

```javascript
POST / patient / register; // Register new patient
POST / login; // Login user
POST / admin / addnew; // Add admin (protected)
POST / doctor / addnew; // Add doctor (protected)
GET / doctors; // Get all doctors
GET / patient / me; // Get patient profile (protected)
GET / admin / me; // Get admin profile (protected)
GET / patient / logout; // Logout patient (protected)
GET / admin / logout; // Logout admin (protected)
```

#### **Message Routes** (`routes/message.route.js`)

```javascript
POST   /send                     // Send message
GET    /getall                   // Get all messages (admin)
DELETE /:id                      // Delete message
```

**Protection Rules**:

- Public routes: Registration, login, view doctors, send messages
- Protected routes: Admin/patient profile, logout, add users
- Admin-only: Add admin, add doctor, delete messages
- Patient-only: Patient profile, patient logout

---

### Request Flow Example

**User Registration Flow**:

```
1. Client sends POST /api/patient/register with user data
   ↓
2. Express middleware processes request (body parser, CORS, etc)
   ↓
3. Route handler receives request and calls patientRegister controller
   ↓
4. catchAsyncErrors wrapper catches any errors
   ↓
5. Controller validates input data
   ↓
6. Check if user already exists using User.findOne()
   ↓
7. Create new user with User.create() - password auto-hashed by pre-hook
   ↓
8. Generate JWT token using generateToken() utility
   ↓
9. Set secure httpOnly cookie
   ↓
10. Return success response with user data and token
    (OR)
11. If error occurs at any step:
    - Throw ErrorHandler with message and status code
    - catchAsyncErrors passes to next(error)
    - errorMiddleware catches and formats response
    ↓
12. Client receives response
```

---

## License

This project is licensed under the ISC License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.

## Future Enhancements

- [ ] Email notifications
- [ ] Real-time chat with WebSockets
- [ ] Advanced appointment scheduling
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Analytics and reporting
