# TradeAura 📈

TradeAura is a comprehensive, multi-part web application for stock trading and portfolio management. It features a public-facing landing page, a detailed user dashboard for managing investments, and a robust backend service.

## 📸 Screenshots

Here's a glimpse of the TradeAura application:

| Page | Screenshot |
| :--- | :--- |
| **Landing Page** | ![Landing Page](<./screenshots/landing.png>) |
| **Login Page** | ![Login Page](<./screenshots/login.png>) |
| **Signup Page** | ![Signup Page](<./screenshots/signup.png>) |
| **Dashboard (Holdings)** | ![Dashboard](<./screenshots/dashboard.png>) |
| **Dashboard (Holdings)** | ![Holdings](<./screenshots/holdings.png>) |
| **Dashboard (Watchlist)** | ![Watchlist](<./screenshots/orders.png>) |
| **Dashboard (Buy Modal)** | ![Buy Modal](<./screenshots/buy.png>) |
| **Dashboard (Positions)** | ![Positions](<./screenshots/positions.png>) |


---

## 🚀 Getting Started

This project is divided into three main parts that need to be run concurrently: `frontend`, `backend`, and `dashboard`.

### Prerequisites

* [Node.js](https://nodejs.org/) (which includes npm)
* [MongoDB](https://www.mongodb.com/) (a running instance, either local or cloud-based like MongoDB Atlas)

---

### 1. Backend Setup

The backend server handles API requests, user authentication, and database interactions.

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in the `backend` directory and add the following variables.

    ```env
    MONGO_URL=<your_mongodb_connection_string>
    PORT=8000
    JWT_SECRET=<your_strong_jwt_secret_key>
    ```
    * `MONGO_URL`: Your connection string for your MongoDB database.
    * `PORT`: The port the backend server will run on (e.g., 8000).
    * `JWT_SECRET`: A long, random string used for signing authentication tokens.

4.  **Run the backend server:**
    ```sh
    npm start
    ```
    The server should now be running (e.g., at `http://localhost:8000`).

---

### 2. Frontend Setup

The frontend application serves the public landing page, about page, login, and signup pages.

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the frontend server:**
    ```sh
    npm start
    ```
    The frontend app will typically run on `http://localhost:3000`.

---

### 3. Dashboard Setup

The dashboard is the main application users interact with after logging in. It shows holdings, positions, watchlists, etc.

1.  **Navigate to the dashboard directory:**
    ```sh
    cd dashboard
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the dashboard server:**
    ```sh
    npm start
    ```
    The dashboard app will typically run on another port, (e.g., `http://localhost:3001`).

---

## 🖥️ Running the Application

To use the full application:
1.  Start the **Backend** (`cd backend` -> `npm start`).
2.  Start the **Frontend** (`cd frontend` -> `npm start`).
3.  Start the **Dashboard** (`cd dashboard` -> `npm start`).

* Access the landing/login page (e.g., `http://localhost:3000`).
* After logging in, you will be redirected to the dashboard (e.g., `http://localhost:3001`).

---

## 📁 Project Structure

The repository is organized into several key parts:

* `/backend`: The Node.js & Express.js server.
    * `/controllers`: Handles business logic for API routes.
    * `/model`: Mongoose schemas for database models (User, Watchlist, Holdings, etc.).
    * `/routes`: Defines the API endpoints.
    * `/middleware`: Contains authentication middleware (e.g., `authMiddleware.js`).
* `/frontend`: The React application for the public-facing website (landing page, login, signup).
    * `/src/landing_page`: Contains components for different public pages.
* `/dashboard`: The main React application for authenticated users.
    * `/src/components`: Contains all dashboard components (WatchList, Holdings, Positions, etc.).
* `/market_service`: A service (likely Python/Flask) for fetching live market data. *(Setup instructions not included in this README)*.