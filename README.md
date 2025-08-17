--------------------------------

## **Quick-Start Test Guide**

### **1. Root & Health Check**

**Landing Page**

```
GET https://task-manager-api-rk8t.onrender.com/
```

* Should display HTML with API info.

**Health Check**

```
GET https://task-manager-api-rk8t.onrender.com/health
```

* Should return JSON like:

```json
{
  "status": "API is running ✅",
  "uptime": 123.45
}
```

-----------------------------------

### **2. User Registration & Login**

**Register User**

```
POST https://task-manager-api-rk8t.onrender.com/api/users/signup
```

**Body (JSON)**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

* Response includes `token` and `user` object.

**Login User**

```
POST https://task-manager-api-rk8t.onrender.com/api/users/login
```

**Body (JSON)**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

* Response includes `token` and `user` object.

-----------------------------------

### **3. Tasks (Protected Endpoints)**

> All requests require **Authorization header**:

```
Authorization: Bearer <JWT_TOKEN>
```

**Create Task**

```
POST https://task-manager-api-rk8t.onrender.com/api/tasks
```

**Body (JSON)**

```json
{
  "title": "Finish homework",
  "completed": false
}
```

**Get All Tasks**

```
GET https://task-manager-api-rk8t.onrender.com/api/tasks
```

**Get Task by ID**

```
GET https://task-manager-api-rk8t.onrender.com/api/tasks/<TASK_ID>
```

**Update Task**

```
PATCH https://task-manager-api-rk8t.onrender.com/api/tasks/<TASK_ID>
```

**Body (JSON)**

```json
{
  "title": "Finish homework and study",
  "completed": true
}
```

**Delete Task**

```
DELETE https://task-manager-api-rk8t.onrender.com/api/tasks/<TASK_ID>
```

-----------------------------------

### **4. Notes for Reviewers**

* Use the **token** returned from login/signup for all `/api/tasks` requests.
* If you call `/api/tasks` without a token, you’ll get:

```json
{"success": false, "message": "No token provided"}
```

* The API is fully live and connected to MongoDB.

-----------------------------------

This guide ensures reviewers can **immediately see all features working** without setup.

-----------------------------------

# Task Manager API

A **Node.js + Express REST API** for managing tasks, with user authentication using JWT and MongoDB as the database. This project allows users to register, log in, create tasks, view tasks, update tasks, and delete tasks.

------------------------------------

## **Features**

* **User Authentication**

  * Register new users (`/api/users/signup`)
  * Log in and receive JWT token (`/api/users/login`)
* **Task Management**

  * Create, read, update, and delete tasks (`/api/tasks`)
  * Each task is associated with a logged-in user
* **Health Check**

  * `/health` route returns server uptime and status
* **Secure**

  * Passwords hashed with bcrypt
  * JWT authentication for protected routes
* **Live Deployment**

  * Ready for deployment on Render, Heroku, or any Node.js hosting

------------------------------------

## **Project Structure**

```
task-manager-api/
├── src/
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── task.js
│   │   └── user.js
│   ├── routes/
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── app.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

-----------------------------------

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/task-manager-api.git
cd task-manager-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

> **Note:** Do not commit `.env` — it contains sensitive information.

4. Start the server locally:

```bash
node src/index.js
```

5. The server will run on `http://localhost:5000` (or the port in your `.env`).

---

## **API Endpoints**

### **Root & Health**

| Method | Endpoint  | Description                   |
| ------ | --------- | ----------------------------- |
| GET    | `/`       | Landing page showing API info |
| GET    | `/health` | Check API status and uptime   |

### **User**

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/api/users/signup` | Register a new user   |
| POST   | `/api/users/login`  | Login and receive JWT |

### **Task (Protected)**

> All task routes require a **Bearer token** in `Authorization` header.

| Method | Endpoint         | Description                      |
| ------ | ---------------- | -------------------------------- |
| POST   | `/api/tasks`     | Create a new task                |
| GET    | `/api/tasks`     | Get all tasks for logged-in user |
| GET    | `/api/tasks/:id` | Get a single task by ID          |
| PATCH  | `/api/tasks/:id` | Update a task by ID              |
| DELETE | `/api/tasks/:id` | Delete a task by ID              |

-------------------------------

## **Authentication**

* **JWT Token** must be sent in the `Authorization` header:

```
Authorization: Bearer <your-token>
```

* Tokens are generated when logging in or signing up.

---------------------------------

## **Deployment**

* The API is **live on Render**:
Example:
```
https://task-manager-api-rk8t.onrender.com/
```

* Make sure environment variables are set on the hosting platform:

  * `MONGO_URI` → MongoDB connection string
  * `JWT_SECRET` → JWT secret key

----------------------------------

Technologies Used

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* bcrypt for password hashing
* CORS

-----------------------------------

Testing the API

1. Open Postman or Insomnia.
2. Use the live deployment link or local server.
3. Test endpoints:

*  Root: `GET /` → HTML landing page
*  Health: `GET /health` → JSON with uptime
*  User signup/login: `POST /api/users/signup` & `POST /api/users/login`
*  Tasks: use JWT in `Authorization` header

-----------------------------------

.gitignore

* `node_modules` → prevents committing dependencies
* `.env` → keeps secrets safe

------------------------------------

Author:

         Jayakanthan
