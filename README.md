# Blog Application - MERN Stack Web Application

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This Blog Application is a full-featured web application built using the MERN stack. It allows users to create, read, update, and delete (CRUD) blog posts, as well as interact with the content through comments and search functionality. The application features user authentication, ensuring that only registered users can contribute content. With a focus on responsive and intuitive design, this application provides an enhanced user experience. The project is fully deployed to a cloud platform, with automated CI/CD pipelines ensuring smooth deployment and updates.

## Features

- **RESTful API for Blog Management**: Perform CRUD operations on blog posts.
- **Responsive Design**: A modern, user-friendly interface optimized for both desktop and mobile devices.
- **List View and Detail View**: Display blog posts with title and excerpt in a list view, and full content in a detailed view.
- **Form Handling**: Create and edit blog posts with client-side validation to ensure proper data input.
- **User Authentication**: Secure user registration and login functionality, ensuring only authorized users can add or edit content.
- **Comment System**: Allow users to add comments on blog posts, fostering interaction and engagement.
- **Search Functionality**: Implement a search feature to easily find blog posts by title or content keywords.
- **Unit Testing**: Add unit tests for both frontend and backend components to ensure code reliability and maintainability.
- **CI/CD Pipeline**: Set up continuous integration and continuous deployment pipelines for automated testing and deployment.
- **Enhanced Design**: The application design follows modern UI/UX principles, based on a reference design available on Figma.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Postman
- **Deployment**: Render and Vercel
- **CI/CD**: GitHub Actions

## Installation

### Prerequisites

- Node.js (>=14.x.x)
- MongoDB (local or Atlas)
- GitHub account for CI/CD setup

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/thefarhanahmad/Blog-App-MERN.git
   cd blog-application
   ```

2. Install backend dependencies:

   ```sh
   cd server
   npm install
   ```

3. Install frontend dependencies:

   ```sh
   cd client
   npm install
   ```

4. Create a .env file in the server directory and add the following environment variable:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000

5. Create a .env file in the client directory and add the following environment variable:

VITE_API_BASE_URL=http://localhost:4000/api/v1

6. Run the development servers:

Backend :

```sh
cd server
npm run dev
```

client :

```sh
cd client
npm run dev
```

Open http://localhost:3000 with your browser to see the frontend, and the backend will be running on http://localhost:4000.

## Usage

### User Flow

- **Sign Up / Log In**: Users must register and log in to create or edit blog posts.
- **View Blog Posts**: Users can view a list of all available blog posts.
- **View Post Details**: Users can click on a post to view detailed content.
- **Create a New Post**: Authenticated users can fill out a form to add a new blog post.
- **Edit a Post**: Authenticated users can update an existing blog post.
- **Delete a Post**: Authenticated users can remove a blog post.
- **Sign Up / Log In**: Users can leave comments on blog posts, fostering community interaction.
- **Search for Posts**: Users can search for blog posts using keywords.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request if you would like to contribute to this project.

## License

This project is licensed under the MIT License.

## Contact

- **Github**: thefarhanahmad
- **Enail**: akhtarfarhan281@gmail.com
