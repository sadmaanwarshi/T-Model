# T-Model Multi-Industry Dashboard Platform

A scalable, **T-Model based application** designed to deliver a unique and tailored dashboard experience for users across different industries (**Tour, Travel, and Logistics**) while leveraging a shared, robust codebase.

---

## ✨ Key Features

- **Dynamic, Industry-Specific Dashboards**  
  Users see a dashboard with widgets and data relevant only to their selected industry.

- **Centralized User Profile**  
  A single profile page allows users to manage their data and select their industry, which dictates their entire experience.

- **Conditional Routing**  
  An intelligent routing system that directs users to the correct dashboard after login, or prompts them to complete their profile if they haven't selected an industry.

- **Secure Authentication**  
  End-to-end user authentication using JSON Web Tokens (JWT) with password hashing.

- **Innovative Feature: Gamified Business Health Score**  
  A dynamic widget on every dashboard that provides a single, easy-to-understand score (**0-100**) representing business performance, calculated using industry-specific metrics.

- **Innovative Feature: Proactive Notification System**  
  A central notification service that alerts users about important, industry-specific events (e.g., a new booking for a Tour operator, a delayed delivery for a Logistics coordinator).

---


#### Shared Components (Frontend):

- Navbar, Button, Input components.
- **HealthScoreWidget** component: A reusable UI element that displays a title and a score in a radial progress bar.

---

### The Vertical Layers (The Industry-Specific Bars)

These are the specialized modules that sit on top of the base layer. Each vertical contains the unique business logic and UI for a single industry.

#### Specialized Logic (Backend):

- **Industry-Specific Health Score Logic**  
  The `/api/health-score` endpoint checks the user's industry and calls a specific service (e.g., `LogisticsHealthService`) to gather relevant data (delivery stats, user growth).  
  This data is then fed into the shared ScoreEngine.

- **Industry-Specific Notification Triggers**  
  Logic within services like `TourService` or `LogisticsService` that decides when a critical business event has occurred and calls the central `NotificationService` with a specific message.

#### Specialized Components (Frontend):

- **Dashboard Pages**: `LogisticsDashboard.jsx`, `TourDashboard.jsx`, etc.
- **Placeholder Widgets**:  
  - Live Fleet Map  
  - Booking Calendar  
  - API Health Status  

---

## 💻 Tech Stack

| Category   | Technology |
|------------|------------|
| Frontend   | React (Vite), Shadcn/UI, Tailwind CSS |
| Backend    | Node.js, Express |
| Database   | PostgreSQL |

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (**v18.x or later**)
- PostgreSQL installed and running.

---

### 1. Database Setup

Open your PostgreSQL client (e.g., **psql** or **pgAdmin**).

1. Create a new database for the project.  
2. Execute the script in `database_setup.sql` to create the `industry_enum` type and the `users` table.

---

### 2. Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create the environment file
#    Rename .env.example to .env and fill in your database credentials
#    and a secure JWT_SECRET.
cp .env.example .env
nano .env # Or use your favorite editor

# 4. Start the backend server
npm run dev
```

---

The backend server will be running on:
👉 http://localhost:5001

---

# 1. In a new terminal, navigate to the frontend directory.
```bash
cd frontend

# 2. Install dependencies
npm install

# 3. Start the frontend development server
npm run dev
```
---

The frontend application will be available at:
👉 http://localhost:5173
 (or the port Vite assigns)

 ---

# How to Use the Application

- Register: Navigate to the Register page and create a new account.

- Login: Use your new credentials to log in.

- Initial Redirect: Upon your first login, the system will detect that you haven't selected an industry and will automatically redirect you to the /profile page.

- Set Your Industry: On the profile page, update your name and, most importantly, select an industry from the dropdown menu (e.g., "Logistics"). Click Save Profile.

- View Your Dashboard: After saving, you will be redirected to /, where the routing logic will detect your industry and send you to your specialized dashboard (e.g., /dashboard/logistics).

- Explore: You will see your industry-specific dashboard, complete with its unique title, placeholder widgets, and the Business Health Score calculated based on your industry's metrics.

- Logout: Use the logout button in the navbar to end your session.

# 📜 License

This project is licensed under the MIT License.