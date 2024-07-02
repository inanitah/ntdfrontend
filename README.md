
# Arithmetic Calculator Frontend

This project is a React application that serves as the frontend for the Arithmetic Calculator REST API. It provides a user interface for authentication, performing arithmetic operations, and viewing operation records.

## Tech Stack
- Frontend: React.js, Ant Design
- Deployment: Heroku

## Features
- User login and logout
- Perform arithmetic operations
- View and manage operation records

## Prerequisites
- Node.js
- npm

## Setup Instructions

### 1. Clone the Repository
git clone https://github.com/inanitah/ntdfrontend.git
cd <repository-directory>/ntdfrontend

### 2. Install Dependences
npm install

### 3. Run the Development Server
npm start

### 4. Deployment
heroku login
heroku git:remote -a ntdfrontend
git push heroku main

### Usage:
1. Login
Enter your username and password to log in.

2. Perform Operations
Select an operation type, enter the cost, and click "Create Operation". Then, select the operation ID to perform the calculation.

3. View Records
Search and view your operation records. You can also delete records.



### TODO for next version: Implement sorting and filter in the record table