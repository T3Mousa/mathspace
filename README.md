# Welcome to Mathspace!

## About the Project
Mathspace is a blended learning web application inspired by [Desoms](https://www.desmos.com/) and [Google Classroom](https://classroom.google.com).

## Technologies Used
<div align="center">
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express" alt="Express" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/vitejs/vitejs-original.svg" title="Vite" alt="Vite" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original-wordmark.svg" title="Docker" alt="Docker" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="PostgreSQL" alt="PostgreSQL" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" title="AWS" alt="AWS" width="40" height="40"/>&nbsp;
</div>

## Screenshots
### Sign Up
<img width="1068" alt="Mathspace-SignUp-feature" src="https://github.com/user-attachments/assets/a825f384-e849-4a2d-820d-407499171e88">

### Homepage
<img width="1060" alt="mathspace-splashpage" src="https://github.com/user-attachments/assets/16cf560e-1b49-47ea-8094-ee7a0a8f36ba">

### Class Manager Page
<img width="1092" alt="mathspace-class-manager-page" src="https://github.com/user-attachments/assets/be3b31d4-12f9-456c-89bf-9c8392784380">

### Class Details Page
<img width="1060" alt="mathspace-class-details-page" src="https://github.com/user-attachments/assets/666d1300-a102-4c24-836a-05f2ccefb44d">

### Lessons
<img width="1092" alt="mathspace-lesson-manager-page" src="https://github.com/user-attachments/assets/3a8889cf-9581-4279-8b66-2edcf881c805">

### Lesson Details Page
<img width="1060" alt="mathspace-lesson-details-page" src="https://github.com/user-attachments/assets/486069df-d315-431b-b93e-a0c248d3015d">

### Assignments
<img width="762" alt="mathspace-assignment-manager-page" src="https://github.com/user-attachments/assets/e238dbb2-b451-4684-a029-221e97468a09">

### Create New Assignment Form
<img width="762" alt="mathspace-create-assignment-form" src="https://github.com/user-attachments/assets/2918a5b1-7281-425e-a1f8-7499abf98dca">


## Getting Started
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/T3Mousa/mathspace.git
   ```
2. **Install Dependencies (in root directory):**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables:**
   1. Create a `.env` file in the `backend` directory
   2. Open the `.env.example` file and copy its contents into your newly created `.env` file
   3. Replace placeholder values with actual values for your database configuration, S3-related values, and other environmental variables.

4. **Run Database Commands:**
   1. ##### Move into the backend directory:
       ```bash
        cd backend
       ```
   2. ##### Create the database:
       ```bash
       npm run db:create
       ```
   3. ##### Run database migrations:
       ```bash
       npm run db:migrate
       ```
   4. ##### Seed the database:
       ```bash
       npm run db:seed:all
       ```
5. **Start the Development Server:**
   1. ##### To run the backend server of the application starting from the root directory, run the following commands:
       ```bash
       cd backend
       npm start
       ```
   2. ##### To run the frontend server of the application starting from the root directory, run the following commands:
       ```bash
       cd frontend 
       npm start
       ```

## Features

### Sign-Up / Log-In
#### New account creation, log in, log out, and guest/demo login:
- Teacher users can sign up, log in, and log out.
- Teacehr users can use a demo log in to try the site.
- Teacher users can't use any features without signing up/logging in
- Logged out Teacher users are redirected to home page.

### Classes

#### Authenticated & Authorized Teacher Users:
- Should be able to view all of their Classes (along with all associated details).
- Should be able to create a new Class.
- Should be able to update their Class(es).
- Should be able to delete their Class(es).

### Lessons

#### Authenticated & Authorized Teacher Users:
- Should be able to view all Lessons created by all Teacher Users (whether or not the Lesson belongs to them).
- Should be able to create a Lesson for and assign it to none or any number of their Classes.
- Should be able to update their Lesson, assign to a new Class or unassign from any or all Classes.
- Should be able to delete their Lesson.

### Assignments

#### Authenticated & Authorized Teacher Users:
- Should be able to view all Assignments created by all Teacher Users (whether or not the Lesson belongs to them).
- Should be able to create an Assignment for and assign it to none or any number of their Classes.
- Should be able to update their Assignment, assign it to a new Class or unassign from any or all Classes.
- Should be able to delete their Assignment.

## Additional Documents
- [API Documentation](https://github.com/T3Mousa/mathspace/wiki/API-Documentation)
- [AWS S3 Setup Instruction](https://github.com/T3Mousa/mathspace/wiki/AWS-S3-Setup)
- [Database Schema](https://github.com/T3Mousa/mathspace/wiki/Database-Schema)

### Acknowledgments

- Inspired by [Desoms](https://www.desmos.com/) and [Google Classroom](https://classroom.google.com)


