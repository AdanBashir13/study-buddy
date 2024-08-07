# Study Buddy

## Overview

**Study Buddy** is a full-stack web application designed to help students manage their study schedules, track their progress, and collaborate with peers. This repository contains both the frontend code developed with React and Redux, as well as the backend code built with Flask, SQLAlchemy, and JWT for user authentication, providing a seamless user experience.

## Authors
- Adan Bashir
- **Collaborator**: Raymond Korir

## Features

- User registration and login with JWT authentication.
- Create, view, update, and delete study schedules.
- Track study session progress with the ability to mark sessions as completed.
- Join and manage study groups.
- Responsive design for optimal viewing on various devices.
- Initial data setup for testing purposes.
- Integration with Font Awesome for icons.

## Technologies Used

- **Frontend:**
  - **React**: A JavaScript library for building user interfaces.
  - **Redux**: State management for React applications.
  - **React Router**: For navigation between different pages.
  - **CORS**: Used for handling cross-origin requests between the frontend and backend.
  - **Font Awesome**: For scalable vector icons.
  - **CSS**: For styling the application.

- **Backend:**
  - **Flask**: A lightweight web framework for Python.
  - **SQLAlchemy**: An ORM for database interactions.
  - **Flask-JWT-Extended**: For implementing JWT authentication.
  - **Flask-CORS**: Used for handling cross-origin requests between the frontend and backend.
  - **SQLite**: A lightweight database for storing application data.
  - **Flask-Migrate**: For handling database migrations.

## Getting Started

### Prerequisites

- **Frontend:**
  - Node.js (version >= 14.x)
  - npm

- **Backend:**
  - Python (version >= 3.6)
  - Flask
  - Flask extensions (Flask-SQLAlchemy, Flask-Migrate, Flask-JWT-Extended, Flask-CORS)

### Installation

1. **Clone the repository:**

    `git clone https://github.com/yourusername/study-buddy.git`

2. **Navigate to the frontend project directory:**

    `cd study-buddy/client/src`

3. **Install frontend dependencies:**

    `npm install`

4. **Navigate to the backend project directory:**

    `cd study-buddy/server`

5. **Install backend dependencies:**

    `pipenv install`

### Running the Application

#### Frontend

1. **Start the development server:**

    `npm start`

2. Open your web browser and go to `http://localhost:3000`.

#### Backend

1. **Set up the database:**

    `flask db init`
    `flask db migrate`
    `flask db upgrade`


2. **Start the server:**

    `python app.py`

3. Open your web browser and go to `http://localhost:5555`.

### API Integration

The frontend connects to the Flask backend for data storage and retrieval. Ensure the backend server is running and accessible. The backend server should be configured to handle CORS (Cross-Origin Resource Sharing) for successful communication.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues regarding this code, please contact me at imdedsec1120@gmail.com.
