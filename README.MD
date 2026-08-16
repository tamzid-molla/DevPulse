# DevPulse

DevPulse is a modern issue tracking and bug management system backend built with **Express.js**, **TypeScript**, and **PostgreSQL**. It provides a robust API for managing software issues, enabling teams to collaborate and track feature requests and bugs efficiently.


## ✨ Features

### Authentication & Authorization
- **User Registration**: Sign up with name, email, password, and optional role
- **User Login**: Secure login with JWT token generation
- **Role-Based Access Control**: Two user roles - `contributor` and `maintainer`
- **Password Security**: Bcrypt password hashing with salt rounds
- **Token Expiration**: JWT tokens 

### Issue Management
- **Create Issues**: Submit new bug reports or feature requests
- **Retrieve Issues**: Get all issues with advanced filtering and sorting
- **View Issue Details**: Get detailed information about a specific issue
- **Update Issues**: Modify issue details and status
- **Delete Issues**: Remove issues (maintainer-only action)
- **Issue Tracking**: Track issue status (open, in_progress, resolved)
- **Issue Types**: Categorize issues as `bug` or `feature_request`
- **Reporter Information**: View reporter details with each issue

### Additional Features
- **CORS Support**: Configured for cross-origin requests
- **Global Error Handling**: Centralized error management
- **Input Validation**: Data validation at service layer
- **Database Transactions**: Reliable data operations with PostgreSQL

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js (ES Modules) |
| **Language** | TypeScript 7.0+ |
| **Framework** | Express.js 5.2+ |
| **Database** | PostgreSQL 8.x |
| **Authentication** | JWT (jsonwebtoken 9.0+) |
| **Encryption** | bcryptjs 3.0+ |
| **Build Tool** | tsup 8.5+ |
| **Dev Tools** | tsx, TypeScript |

---

## Project Structure

```
src/
├── app.ts                          # Express app configuration
├── server.ts                       # Server entry point
├── config/
│   ├── bd.ts                       # PostgreSQL connection pool
│   └── config.ts                   # Environment configuration
├── middleware/
│   ├── auth.ts                     # JWT authentication middleware
│   ├── globalErrorHandler.ts       # Global error handling
│   └── index.d.ts                  # TypeScript type definitions
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts     # Auth route handlers
│   │   ├── auth.service.ts        # Auth business logic
│   │   ├── auth.route.ts          # Auth endpoints
│   │   └── auth.interface.ts      # Auth TypeScript interfaces
│   └── issue/
│       ├── issue.controller.ts    # Issue route handlers
│       ├── issue.service.ts       # Issue business logic
│       ├── issue.route.ts         # Issue endpoints
│       └── issue.interface.ts     # Issue TypeScript interfaces
├── types/
│   └── index.ts                    # Global types and constants
└── utility/
    └── sendResponse.ts             # Standard response formatter
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 12+
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Assignment\ 2\ -\ DevPulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. **Build the project**
   ```bash
   npm run build
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
CONNECTION_STRING=postgresql://username:password@localhost:5432/devpulse

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
```

### Variable Descriptions
- **PORT**: Port number for the server (default: 5000)
- **CONNECTION_STRING**: PostgreSQL connection string
- **JWT_SECRET**: Secret key for signing JWT tokens (use a strong random string in production)

---

## 📦 Running the Application

### Development Mode
```bash
npm run dev
```
Runs the server with hot-reload using `tsx watch`

### Production Mode
```bash
npm run build    # Compile TypeScript to JavaScript
npm start        # Run the compiled application
```

### Testing
```bash
npm test
```

### Available Scripts
| Command | Description |
|---------|------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |

---

## 🔌 API Endpoints

### Authentication Routes

#### **POST** `/auth/signup`
Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "role": "contributor"
}
```

**Response (Success):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "contributor",
    "created_at": "2026-08-16T10:30:00Z"
  }
}
```

#### **POST** `/auth/login`
Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "contributor"
    }
  }
}
```

---

### Issue Routes

#### **POST** `/issues`
Create a new issue (requires authentication)

**Headers:**
```
Authorization: <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Login button not working",
  "description": "The login button on the home page does not respond to clicks. This needs to be fixed immediately.",
  "type": "bug"
}
```

**Response (Success):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Issue created successfully",
  "data": {
    "id": 1,
    "title": "Login button not working",
    "description": "The login button on the home page does not respond to clicks.",
    "type": "bug",
    "status": "open",
    "reporter_id": 1,
    "created_at": "2026-08-16T10:30:00Z",
    "updated_at": "2026-08-16T10:30:00Z"
  }
}
```

#### **GET** `/issues`
Get all issues with optional filtering and sorting

**Query Parameters:**
```
GET /issues?type=bug&status=open&sort=newest
```

| Parameter | Type | Description |
|-----------|------|------------|
| `type` | string | Filter by issue type: `bug` or `feature_request` |
| `status` | string | Filter by status: `open`, `in_progress`, or `resolved` |
| `sort` | string | Sort order: `newest` (default) or `oldest` |

**Response (Success):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Issues retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Login button not working",
      "description": "The login button on the home page does not respond to clicks.",
      "type": "bug",
      "status": "open",
      "reporter_id": 1,
      "reporter": {
        "id": 1,
        "name": "John Doe",
        "role": "contributor"
      },
      "created_at": "2026-08-16T10:30:00Z",
      "updated_at": "2026-08-16T10:30:00Z"
    }
  ]
}
```

#### **GET** `/issues/:id`
Get a specific issue by ID

**Response (Success):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Issue retrieved successfully",
  "data": {
    "id": 1,
    "title": "Login button not working",
    "description": "The login button on the home page does not respond to clicks.",
    "type": "bug",
    "status": "open",
    "reporter_id": 1,
    "created_at": "2026-08-16T10:30:00Z",
    "updated_at": "2026-08-16T10:30:00Z"
  }
}
```

#### **PUT** `/issues/:id`
Update an issue (requires authentication - contributor or maintainer)

**Headers:**
```
Authorization: <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "in_progress",
  "description": "Updated description..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Issue updated successfully",
  "data": {
    "id": 1,
    "title": "Login button not working",
    "description": "Updated description...",
    "type": "bug",
    "status": "in_progress",
    "reporter_id": 1,
    "created_at": "2026-08-16T10:30:00Z",
    "updated_at": "2026-08-16T11:00:00Z"
  }
}
```

#### **DELETE** `/issues/:id`
Delete an issue (maintainer-only)

**Headers:**
```
Authorization: <jwt-token>
```

**Response (Success):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Issue deleted successfully"
}
```

---

## 🔐 Authentication

### How It Works

1. **User Registration**: New users sign up with email and password
2. **Password Hashing**: Passwords are hashed with bcryptjs (10 salt rounds)
3. **User Login**: Users provide email and password to receive a JWT token
4. **Token Structure**: JWT contains user `id`, `name`, and `role`
5. **Token Validation**: Subsequent requests require the token in the `Authorization` header
6. **Token Expiration**: Tokens expire after 2 days
7. **Role-Based Access**: Different endpoints require specific roles

### User Roles

| Role | Permissions |
|------|------------|
| **contributor** | Create issues, update own issues, view all issues |
| **maintainer** | Create issues, update any issue, delete issues, view all issues |

### Protected Routes

- `POST /issues` - Contributors and Maintainers
- `PUT /issues/:id` - Contributors and Maintainers
- `DELETE /issues/:id` - Maintainers only

---

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(15) DEFAULT 'contributor' 
    CHECK (role IN ('contributor', 'maintainer')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Constraints:**
- Email must be unique
- Role must be either 'contributor' or 'maintainer'
- Password is hashed before storage

### Issues Table

```sql
CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL CHECK(LENGTH(description) >= 20),
  type VARCHAR(30) NOT NULL 
    CHECK (type IN ('feature_request', 'bug')),
  status VARCHAR(20) DEFAULT 'open' 
    CHECK (status IN ('open', 'in_progress', 'resolved')),
  reporter_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Constraints:**
- Title is mandatory
- Description must be at least 20 characters
- Type must be either 'feature_request' or 'bug'
- Status must be 'open', 'in_progress', or 'resolved'
- Reporter must exist in users table

---

## ⚠️ Error Handling

The application uses a global error handler middleware that returns consistent error responses.

### Error Response Format

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message description"
}
```

### Common HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

### Common Error Messages

- `"Unauthorize access!!"` - Missing JWT token
- `"Forbidden access!!"` - Insufficient role permissions
- `"Invalid credential"` - Wrong email or password
- `"Invalid role"` - Invalid role provided during signup
- `"Type are not allow , Write a valid type"` - Invalid issue type

---

## 🔧 Configuration

### CORS Settings

The application is configured to accept requests from:
- `https://devpluse.vercel.app`

To modify CORS settings, edit [src/app.ts](src/app.ts#L10-L15)

### Build Configuration

TypeScript and build settings are configured in:
- [tsconfig.json](tsconfig.json) - TypeScript compiler options
- [tsup.config.ts](tsup.config.ts) - Bundle and build configuration

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Created as Assignment 2 for L2 learning program

---

## 📞 Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Happy issue tracking! 🎯**
