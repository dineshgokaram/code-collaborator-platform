# Real-Time Collaborative Code Editor

![Project Demo](./demo.gif)

## 🚀 Overview

This project is a feature-rich, real-time collaborative code editor built from the ground up. It allows multiple users to log in, join a coding session, write and edit code together, and execute it in a secure, sandboxed environment.

This is a full-stack application designed to showcase a deep understanding of modern web technologies, backend architecture, and DevOps practices.

## ✨ Features

*   **Real-Time Collaboration:** Code synchronizes instantly between all connected users using WebSockets.
*   **Live User Presence:** A dynamic sidebar shows a list of all users currently in the session.
*   **Secure Code Execution:** A sandboxed execution engine runs user code inside isolated Docker containers, capturing and returning the output.
*   **JWT Authentication:** The application is secured with a professional token-based authentication system. Users must log in to participate.
*   **Modern Tech Stack:** Built with a powerful and in-demand stack:
    *   **Backend:** Python, FastAPI
    *   **Frontend:** HTML, CSS, JavaScript (Vanilla)
    *   **Real-Time:** WebSockets
    *   **Editor:** Monaco Editor (the engine behind VS Code)
    *   **Containerization:** Docker & Docker Compose

## 🛠️ Tech Stack

| Category      | Technology                               |
|---------------|------------------------------------------|
| **Backend**   | FastAPI (Python), Uvicorn                |
| **Frontend**  | HTML5, CSS3, Vanilla JavaScript          |
| **Real-Time** | WebSockets                               |
| **Security**  | JWT (JSON Web Tokens), Passlib (hashing) |
| **Execution** | Docker Engine API (via Python `docker` SDK) |
| **Deployment**| Docker, Docker Compose                   |
| **Editor**    | Monaco Editor                            |


## ⚙️ Getting Started

### Prerequisites

*   **Docker:** You must have Docker and Docker Compose installed on your machine. You can download it from [Docker's official website](https://www.docker.com/products/docker-desktop/).

### Installation & Running the Application

This project is fully containerized, making it incredibly simple to run.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```

2.  **Run the application with Docker Compose:**
    This single command will build the necessary Docker images and start both the backend and frontend services.
    ```bash
    docker compose up --build
    ```

3.  **Access the application:**
    *   Open your web browser and navigate to **`http://localhost:8080`** to see the login screen.
    *   The backend API documentation (Swagger UI) is available at **`http://localhost:8000/docs`**.

### Test Users

You can use the following pre-configured users to test the application:

*   **User 1:**
    *   **Username:** `user1`
    *   **Password:** `pass1`

*   **User 2:**
    *   **Username:** `user2`
    *   **Password:** `pass2`

Log in with these users in two separate browser windows to see the collaboration features in action!

---