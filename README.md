# Blog Application

## Overview
This is a blog application built with Node.js. It allows users to create, edit, and delete blog posts. The application uses Express.js for the backend and MongoDB for the database.

## Features
- User authentication and authorization
- Create, read, update, and delete blog posts
- Responsive design

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/Amit1405/blog-application.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=8001
    MONGODB_URI=your-mongodb-uri
    SECRET_KEY=your-secret-key
    ```
4. Start the application:
    ```bash
    npm run dev
    ```

## Usage
- Open your browser and go to `http://localhost:3000`
- Register or log in to start creating blog posts

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
