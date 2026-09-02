# Dawa ⚕️

A Bahrain-based medicine availability and reservation platform that connects users with pharmacies and helps them find medicines based on availability and location.

## Overview

**Dawa** is a full-stack web application designed to make finding medicines easier and more convenient.

Instead of calling multiple pharmacies to ask whether a medicine is available, users can search for medicines through the platform and view pharmacies that currently have the requested medicine in stock.

Users can:

* Create an account and sign in
* Search and browse medicines
* View medicine details, prices, dosage, and prescription requirements
* Check medicine availability across pharmacies
* View pharmacy locations
* See stock status, including low-stock medicines
* Submit medicine reservation requests
* Upload prescriptions when required
* View and manage their reservations

Pharmacies can:

* Create and manage their pharmacy profile
* Add and manage medicines
* Manage medicine inventory
* Update stock quantities
* View low-stock medicines
* View and manage reservation requests
* Review uploaded prescriptions when required

The backend provides the REST API that connects the frontend application with the MongoDB database.

---

## Related Repositories

* **Frontend:** https://github.com/NadiaAlgallaf/Project-4-frontend
* **Backend:** https://github.com/NadiaAlgallaf/Project-4-backend

---

## Tech Stack

### Backend

* **Node.js** — JavaScript runtime
* **Express.js** — REST API framework
* **MongoDB** — NoSQL database
* **Mongoose** — MongoDB object modeling
* **JWT** — Authentication
* **bcrypt** — Password hashing
* **Multer** — File and image uploads
* **CORS** — Cross-origin resource sharing
* **dotenv** — Environment variable management
* **Morgan** — HTTP request logging
* **express-rate-limit** — API rate limiting
* **Jest** — Testing framework
* **Supertest** — API endpoint testing

---

## Key Features

### Authentication & Authorization

* User and pharmacy account registration
* Secure sign-in
* Password hashing with bcrypt
* Token-based authentication
* Authentication middleware
* Role-based authorization
* Protected pharmacy and user routes

### Medicine Management

Pharmacies can create, update, and delete medicine records.

Medicine information includes:

* Generic name
* Brand name
* Dosage
* Dosage form
* Category
* Price
* Medicine image
* Prescription requirement

### Inventory Management

Pharmacies can manage the medicines available in their inventory.

The inventory system supports:

* Adding medicines to pharmacy inventory
* Updating stock quantities
* Removing medicines from inventory
* Viewing pharmacy inventory
* Checking medicine availability by pharmacy
* Low-stock status when stock is below 5 units

### Pharmacy Management

The API allows pharmacies to:

* Create a pharmacy profile
* Update pharmacy information
* Upload a pharmacy image
* View pharmacy details
* Delete a pharmacy profile

Users can also browse available pharmacies and view their information.

### Reservations

Users can:

* Create medicine reservations
* View their reservations
* Cancel reservations
* Upload prescriptions when required

Pharmacies can:

* View reservation requests
* Update reservation status
* Review prescription submissions

### File Uploads

The backend supports image and document uploads for:

* Pharmacy images
* Medicine images
* Prescription images

Uploaded files are served through the `/uploads` route.

---

## Project Structure

```text
Project-4-backend/
│
├── .github/
│   └── workflows/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── pharmacies.controller.js
│   ├── medicines.controller.js
│   ├── Inventory.controller.js
│   └── reservation.controller.js
│
├── middleware/
│   ├── authorizeRole.js
│   ├── verifyToken.js
│   └── uploadImage.js
│
├── models/
│   ├── User.js
│   ├── Pharmacy.js
│   ├── Medicine.js
│   ├── Inventory.js
│   ├── Reservation.js
│   └── Prescription.js
│
├── routes/
│   ├── auth.routes.js
│   ├── pharmacies.routes.js
│   ├── medicines.routes.js
│   ├── inventory.routes.js
│   └── reservation.routes.js
│
├── tests/
│
├── uploads/
│
├── app.js
├── server.js
├── package.json
└── README.md
```

### Folder Responsibilities

| Folder/File    | Responsibility                                          |
| -------------- | ------------------------------------------------------- |
| `config/`      | Database configuration                                  |
| `controllers/` | Application and API business logic                      |
| `middleware/`  | Authentication, authorization, and file upload handling |
| `models/`      | Mongoose database schemas and models                    |
| `routes/`      | Express API route definitions                           |
| `tests/`       | Automated backend tests                                 |
| `uploads/`     | Uploaded images and prescription files                  |
| `app.js`       | Express application configuration and route mounting    |
| `server.js`    | Database connection and server startup                  |

---

## Database Models

The backend uses MongoDB with Mongoose.

### User

Stores user authentication and account information.

### Pharmacy

Stores pharmacy information and connects pharmacy accounts with their inventory and reservations.

### Medicine

Stores medicine information such as name, dosage, category, price, image, and prescription requirements.

### Inventory

Connects pharmacies with medicines and stores the current stock quantity.

### Reservation

Stores medicine reservation requests made by users and their associated pharmacy and medicine information.

### Prescription

Stores prescription information associated with reservations when a prescription is required.

---

## API Structure

The Express application exposes the following main API resources: `/auth`, `/pharmacies`, `/medicines`, `/inventory`, and `/reservations`.

### Authentication

| Method | Endpoint        | Access        |
| ------ | --------------- | ------------- |
| `POST` | `/auth/sign-up` | Public        |
| `POST` | `/auth/sign-in` | Public        |
| `GET`  | `/auth/me`      | Authenticated |

### Pharmacies

| Method   | Endpoint          | Access   |
| -------- | ----------------- | -------- |
| `GET`    | `/pharmacies`     | Public   |
| `GET`    | `/pharmacies/:id` | Public   |
| `POST`   | `/pharmacies`     | Pharmacy |
| `PATCH`  | `/pharmacies/:id` | Pharmacy |
| `DELETE` | `/pharmacies/:id` | Pharmacy |

### Medicines

| Method   | Endpoint         | Access   |
| -------- | ---------------- | -------- |
| `GET`    | `/medicines`     | Public   |
| `GET`    | `/medicines/:id` | Public   |
| `POST`   | `/medicines`     | Pharmacy |
| `PATCH`  | `/medicines/:id` | Pharmacy |
| `DELETE` | `/medicines/:id` | Pharmacy |

### Inventory

| Method   | Endpoint                          | Access   |
| -------- | --------------------------------- | -------- |
| `POST`   | `/inventory`                      | Pharmacy |
| `GET`    | `/inventory/my-inventory`         | Pharmacy |
| `GET`    | `/inventory/medicine/:medicineId` | Public   |
| `GET`    | `/inventory/pharmacy/:pharmacyId` | Public   |
| `PATCH`  | `/inventory/:id`                  | Pharmacy |
| `DELETE` | `/inventory/:id`                  | Pharmacy |

### Reservations

| Method   | Endpoint                         | Access   |
| -------- | -------------------------------- | -------- |
| `POST`   | `/reservations`                  | User     |
| `GET`    | `/reservations/my-reservations`  | User     |
| `GET`    | `/reservations/pharmacy`         | Pharmacy |
| `PATCH`  | `/reservations/:id/status`       | Pharmacy |
| `DELETE` | `/reservations/:id`              | User     |
| `POST`   | `/reservations/:id/prescription` | User     |

The routes use authentication and role-based middleware to restrict protected operations.

---

## Authentication

Protected endpoints require a valid authentication token.

The backend uses middleware to:

1. Verify the user's authentication token.
2. Identify the authenticated user.
3. Check the user's role when necessary.
4. Allow or reject access to protected resources.

The main roles used by Dawa are:

* **User** — Can search medicines, make reservations, upload prescriptions, and manage personal reservations.
* **Pharmacy** — Can manage pharmacy information, medicines, inventory, and reservation requests.

---

## Low Stock System

Dawa provides a low-stock indicator to improve inventory awareness.

When the available stock for a medicine is **less than 5 units**, the medicine is marked as:

**Low Stock**

This status is used by the pharmacy inventory interface and is also displayed to users when viewing medicine availability.

---

## Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key
```

### Environment Variables

| Variable      | Description                           |
| ------------- | ------------------------------------- |
| `PORT`        | Port used by the Express server       |
| `MONGODB_URI` | MongoDB connection string             |
| `CLIENT_URL`  | Frontend URL allowed by CORS          |
| `JWT_SECRET`  | Secret used for authentication tokens |

**Never commit the `.env` file or expose secret values publicly.**

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB or a MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/NadiaAlgallaf/Project-4-backend.git
```

### 2. Navigate to the project

```bash
cd Project-4-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create your `.env` file

Add the required environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key
```

### 5. Start the development server

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

---

## Available Scripts

| Command       | Description                     |
| ------------- | ------------------------------- |
| `npm run dev` | Starts the server using Nodemon |
| `npm start`   | Starts the production server    |
| `npm test`    | Runs the Jest test suite        |

---

## Testing

The backend uses **Jest** and **Supertest** for automated API testing.

Run the test suite with:

```bash
npm test
```

Tests are located in the `tests/` directory.

---

## Security Considerations

Dawa implements several security practices, including:

* Password hashing using bcrypt
* Token-based authentication
* Role-based authorization
* Protected API routes
* Input validation
* CORS configuration
* API rate limiting
* Environment variables for sensitive configuration
* Controlled file uploads

---

## Frontend

The Dawa backend is consumed by the React frontend application.

**Frontend Repository:**
https://github.com/NadiaAlgallaf/Project-4-frontend

---

## Project Purpose

Dawa was developed as a full-stack software engineering project with the goal of solving a practical problem in the local healthcare and pharmacy experience.

The project demonstrates the development of a complete REST API with:

* Authentication
* Authorization
* CRUD operations
* Database relationships
* File uploads
* Inventory management
* Reservation workflows
* API testing
* Role-based access control

---

## Team

### Dawa Development Team

* **Nadia Algallaf**
* **Shaikha Subah**

---

## License

This project was developed as part of a software engineering bootcamp project.
