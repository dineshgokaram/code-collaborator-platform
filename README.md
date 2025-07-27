# 🚀 Code Collaborator Platform

<p align="center">
  <em>A feature-rich, real-time collaborative code editor built from the ground up.</em>
</p>

<p align="center">
  <!-- This is where your demo GIF will go. It makes a huge impact! -->
  <img src="./demo.gif" alt="Project Demo of Code Collaborator Platform in Action" width="800"/>
</p>

---

### 💡 The Vision: Solving a Modern Development Challenge

In an era where development teams are more distributed than ever, the friction of remote collaboration is a significant real-world problem. How can we replicate the seamless, high-bandwidth experience of pair-programming when developers are miles apart?

**Code Collaborator Platform** is my answer to this challenge. It's a full-stack, ground-up implementation of a real-time collaborative environment that provides a shared, interactive coding space. It's designed to break down the barriers of physical distance, enabling developers to write, edit, and execute code simultaneously as if they were in the same room. This project is a deep dive into the architecture of modern collaborative systems, demonstrating the ability to build complex, secure, and stateful applications from scratch.

---

### ✨ Core Features & Capabilities

*   ✅ **Live Multi-User Editing:** A shared Monaco editor where code synchronizes instantly across all connected clients using a high-performance WebSocket communication layer.
*   ✅ **Dynamic Presence & Awareness:** A live-updating sidebar shows a real-time list of all users currently active in the session, fostering a sense of a shared workspace.
*   ✅ **Secure Containerized Code Execution:** A sandboxed execution engine, powered by the Docker Engine API, runs user code in a completely isolated environment. It captures `stdout` and `stderr` and returns the output, preventing any risk to the host server.
*   ✅ **Robust Token-Based Authentication (JWT):** The entire platform is secured with a professional JWT authentication flow. Only authenticated users can join a session, ensuring that collaboration spaces are private and secure.
*   ✅ **Fully Containerized & Deployable:** The entire application stack is orchestrated by Docker Compose, allowing for a one-command setup and guaranteeing a consistent environment from a developer's machine to production.

---

### 🛠️ Tech Stack & Architecture

This project is built as a multi-container application orchestrated by **Docker Compose**, ensuring a consistent and reproducible environment.

| Category   | Technology & Tools                                                                                                                                                                                                                                                         |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend**  | <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/> <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi" alt="FastAPI"/> <img src="https://img.shields.io/badge/Uvicorn-05998b?style=for-the-badge&logo=python" alt="Uvicorn"/>                                                                                                                                                    |
| **Frontend** | <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/> |
| **Real-Time**| <img src="https://img.shields.io/badge/WebSockets-010101?style=for-the-badge" alt="WebSockets"/>                                                                                                                                                                                 |
| **Security** | <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT"/> <img src="https://img.shields.io/badge/Passlib-222222?style=for-the-badge" alt="Passlib"/>                                                                                                                                                         |
| **DevOps**   | <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/> <img src="https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose"/> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx" alt="Nginx"/>       |
| **Tools**    | <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github" alt="GitHub"/> <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VS Code"/>   |

The architecture consists of two main services:

1.  **`backend`**: A Docker container running the **FastAPI** backend, which handles all business logic, user authentication, WebSocket connections for real-time updates, and communication with the Docker daemon for the secure execution engine.
2.  **`frontend`**: A lightweight **Nginx** container that serves the static frontend, built with dependency-free **HTML, CSS, and Vanilla JavaScript**.

---

### ⚙️ Getting Started

Running this project is incredibly simple, thanks to its fully containerized architecture.

#### Prerequisites

*   You must have **Docker** and **Docker Compose** installed. Download from the [Docker official website](https://www.docker.com/products/docker-desktop/).

#### 🚀 To Run The Application:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dineshgokaram/code-collaborator-platform.git
    cd code-collaborator-platform
    ```

2.  **Launch with Docker Compose:**
    This single command builds, configures, and starts the entire application stack.
    ```bash
    docker compose up --build
    ```

3.  **You're Live!**
    *   👨‍💻 **Frontend Application:** Open your browser to **`http://localhost:8080`**
    *   📄 **Backend API Docs:** Explore the API at **`http://localhost:8000/docs`**

#### Test Credentials

Log in with these users in two different browser windows to experience the real-time collaboration.

| Username | Password |
| :------- | :------- |
| `user1`  | `pass1`  |
| `user2`  | `pass2`  |

---
