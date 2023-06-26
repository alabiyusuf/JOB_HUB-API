An application API for Node.js that handles user registration, login, and job administration operations, including adding, obtaining, changing, and removing jobs. It leverages JWTs for authentication and authorization by generating tokens upon user registration or login, and then validating those tokens for protected routes (jobs routes) using the authenticateUser middleware.

TO RUN THIS PROGRAM:

- Run npm install && nodemon app
- Create .env at the root with your MONGO_URI, JWT_SECRET and JWT_LIFETIME variable and its value to start the project.

Please open an issue or send a pull request if you discover any problems or have ideas for enhancements.
