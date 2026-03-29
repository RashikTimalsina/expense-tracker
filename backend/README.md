# 💸 Expense Tracker — Backend API

A production-ready RESTful API built with **Spring Boot** and **PostgreSQL**, featuring JWT-based authentication and full expense management. This is the backend service for the Expense Tracker fullstack application.

> 🔗 Frontend (React): _coming soon_

---

## ✨ Features

- 🔐 JWT Authentication — register, login, token-based security
- 💰 Expense CRUD — create, read, update, delete expenses
- 🛡️ Ownership Security — users can only access their own expenses
- ✅ Input Validation — request validation with meaningful error messages
- 📦 Consistent API Responses — every endpoint returns a standard `ApiResponse<T>` wrapper
- ⚠️ Global Exception Handling — centralized error handling with clean JSON errors
- 🌐 CORS Configured — ready to connect with React frontend

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 3.2.x |
| Security | Spring Security + JWT (jjwt) |
| Database | PostgreSQL |
| ORM | Spring Data JPA / Hibernate |
| Build Tool | Maven |
| Boilerplate | Lombok |
| Validation | Jakarta Bean Validation |

---

## 📁 Project Structure

```
src/main/java/com/rashiktimalsina/expense_tracker/
├── config/
│   ├── SecurityConfig.java          # Spring Security configuration
│   └── CorsConfig.java              # CORS configuration for React frontend
├── controller/
│   ├── AuthController.java          # Register & login endpoints
│   └── ExpenseController.java       # Expense CRUD endpoints
├── dto/
│   ├── LoginRequest.java            # Login request body
│   ├── RegisterRequest.java         # Register request body
│   ├── request/
│   │   └── ExpenseRequest.java      # Expense create/update request body
│   └── response/
│       ├── ApiResponse.java         # Generic API response wrapper
│       └── ExpenseResponse.java     # Expense response body
├── exception/
│   ├── GlobalExceptionHandler.java  # Centralized exception handling
│   ├── ResourceNotFoundException.java
│   └── UnauthorizedException.java
├── model/
│   ├── User.java                    # User entity
│   └── Expense.java                 # Expense entity
├── repository/
│   ├── UserRepository.java
│   └── ExpenseRepository.java
├── security/
│   ├── JwtUtil.java                 # JWT generation & validation
│   └── JwtFilter.java               # JWT request filter
└── service/
    ├── AuthService.java             # Auth business logic
    ├── ExpenseService.java          # Expense business logic
    └── CustomUserDetailsService.java
```

---

## 🗄️ Database Schema

### `users` table
| Column | Type | Constraints |
|---|---|---|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR | NOT NULL |
| email | VARCHAR | NOT NULL, UNIQUE |
| password | VARCHAR | NOT NULL (bcrypt hashed) |
| created_at | TIMESTAMP | Auto-set on insert |

### `expenses` table
| Column | Type | Constraints |
|---|---|---|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| title | VARCHAR | NOT NULL |
| amount | DECIMAL | NOT NULL |
| category | VARCHAR | nullable |
| description | VARCHAR | nullable |
| expense_date | DATE | NOT NULL |
| user_id | BIGINT | FOREIGN KEY → users(id) |
| created_at | TIMESTAMP | Auto-set on insert |

---

## ⚙️ Local Setup & Running

### Prerequisites
- Java 17+
- Maven
- PostgreSQL

### 1. Clone the repository
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Create the PostgreSQL database
```sql
CREATE DATABASE expense_tracker;
```

### 3. Configure `application.properties`
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/expense_tracker
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=your_jwt_secret_key
jwt.expiration=86400000
```

### 4. Run the application
```bash
./mvnw spring-boot:run
```

The API will start at `http://localhost:8080`

---

## 📡 API Endpoints

All protected endpoints require the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

Every response follows this standard structure:
```json
{
  "success": true,
  "message": "Operation message",
  "data": { }
}
```

---

### 🔐 Auth Endpoints

#### Register
```
POST /api/auth/register
```
Request body:
```json
{
  "name": "Rashik Timalsina",
  "email": "rashik@gmail.com",
  "password": "password123"
}
```
Response:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9..."
  }
}
```

---

#### Login
```
POST /api/auth/login
```
Request body:
```json
{
  "email": "rashik@gmail.com",
  "password": "password123"
}
```
Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9..."
  }
}
```

---

### 💰 Expense Endpoints (Protected)

#### Get all expenses
```
GET /api/expenses
Authorization: Bearer <token>
```
Response:
```json
{
  "success": true,
  "message": "Expenses fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Lunch",
      "amount": 12.50,
      "category": "Food",
      "description": "Had lunch with friends",
      "expenseDate": "2026-03-24",
      "createdAt": "2026-03-24T10:00:00"
    }
  ]
}
```

---

#### Create an expense
```
POST /api/expenses
Authorization: Bearer <token>
```
Request body:
```json
{
  "title": "Lunch",
  "amount": 12.50,
  "category": "Food",
  "description": "Had lunch with friends",
  "expenseDate": "2026-03-24"
}
```

---

#### Update an expense
```
PUT /api/expenses/{id}
Authorization: Bearer <token>
```
Request body: same as create

---

#### Delete an expense
```
DELETE /api/expenses/{id}
Authorization: Bearer <token>
```
Response:
```json
{
  "success": true,
  "message": "Expense deleted successfully",
  "data": null
}
```

---

## 🔒 Security Notes

- Passwords are hashed using **BCrypt** — never stored in plain text
- JWT tokens expire after **24 hours**
- All `/api/expenses/**` routes are protected — a valid token is required
- Ownership is enforced — users can only modify their own expenses

---

## 👤 Author

**Rashik Timalsina**  
[GitHub](https://github.com/your-username) · [LinkedIn](https://linkedin.com/in/your-profile)

---

## 📌 Status

![Backend](https://img.shields.io/badge/Backend-Complete-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-In%20Progress-yellow)
