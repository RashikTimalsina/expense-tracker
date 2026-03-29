# Expense Tracker

A full-stack expense tracking web application built with **React + Vite** (frontend) and **Spring Boot** (backend), backed by **PostgreSQL**.

## Project Structure

```
expense-tracker/
├── backend/                        # Spring Boot REST API
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/example/backend/
│   │       │       ├── controller/
│   │       │       ├── model/
│   │       │       ├── repository/
│   │       │       ├── service/
│   │       │       └── BackendApplication.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/                       # React + Vite SPA
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── ExpenseChart.jsx
    │   │   ├── ExpenseForm.jsx
    │   │   ├── ExpenseList.jsx
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── routes/
    │   │   └── ProtectedRoute.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js

```

## Database Schema

**Database:** `expense_tracker` (PostgreSQL)

### `users` table

| Column       | Type      | Description                |
| ------------ | --------- | -------------------------- |
| `id`         | SERIAL PK | Auto-incremented user ID   |
| `name`       | VARCHAR   | Full name of the user      |
| `email`      | VARCHAR   | Unique email address       |
| `password`   | VARCHAR   | BCrypt-hashed password     |
| `created_at` | TIMESTAMP | Account creation timestamp |

### `expenses` table

| Column         | Type       | Description                      |
| -------------- | ---------- | -------------------------------- |
| `id`           | SERIAL PK  | Auto-incremented expense ID      |
| `title`        | VARCHAR    | Short title of the expense       |
| `amount`       | DECIMAL    | Expense amount                   |
| `category`     | VARCHAR    | Category (Food, Transport, etc.) |
| `description`  | VARCHAR    | Optional description             |
| `expense_date` | DATE       | Date when the expense occurred   |
| `created_at`   | TIMESTAMP  | Record creation timestamp        |
| `user_id`      | INTEGER FK | References `users(id)`           |

### Relationships

```
users (1) ──────< expenses (many)
  id                 user_id
```

## Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Frontend   | React 18, Vite, Axios        |
| Charts     | Recharts / D3.js             |
| Backend    | Spring Boot, Spring Security |
| ORM        | Spring Data JPA / Hibernate  |
| Auth       | JWT (JSON Web Tokens)        |
| Database   | PostgreSQL                   |
| Validation | Zod (frontend)               |

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven

### 1. Database Setup

```sql
CREATE DATABASE expense_tracker;
```

Tables are auto-created by Hibernate on first run via `ddl-auto=update`.

### 2. Backend Setup

```bash
cd backend
mvn spring-boot:run
```

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/expense_tracker
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_own_jwt_secret_key
jwt.expiration=86400000
```

Backend runs on **http://localhost:8080**

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

## Authentication Flow

1. User registers → `POST /api/auth/register`
2. User logs in → `POST /api/auth/login` → receives **JWT token**
3. Token stored in `AuthContext` and sent via Axios interceptor on every request
4. `ProtectedRoute.jsx` blocks unauthenticated access

## API Endpoints

### Auth

| Method | Endpoint             | Description        | Auth Required |
| ------ | -------------------- | ------------------ | ------------- |
| POST   | `/api/auth/register` | Register new user  | ❌            |
| POST   | `/api/auth/login`    | Login, returns JWT | ❌            |

### Expenses

| Method | Endpoint             | Description         | Auth Required |
| ------ | -------------------- | ------------------- | ------------- |
| GET    | `/api/expenses`      | Get user's expenses | ✅            |
| POST   | `/api/expenses`      | Create new expense  | ✅            |
| PUT    | `/api/expenses/{id}` | Update an expense   | ✅            |
| DELETE | `/api/expenses/{id}` | Delete an expense   | ✅            |

## Features

- User registration & login with JWT
- Add, view, edit, delete expenses
- Expense categorization
- Chart visualization by category / over time
- Per-user data isolation
- Protected dashboard

## Expense Categories

`Food` · `Transport` · `Education` · `Shopping` · `Health` · `Entertainment` · `Other`

## Production Build

### Backend

```bash
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
npm run build
# output → frontend/dist/
```

## Author

**Rashik Timalsina**  
Project: Expense Tracker — Full Stack Web Application

```

```
