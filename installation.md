# Installation Guide

This guide explains the system requirements and steps needed to install, configure, and run the Study Room Application application on your local machine.

---

## 1. System Requirements

| **Requirement**  | **Details**                             |
| ---------------- | --------------------------------------- |
| Operating System | Windows, macOS, or Linux                |
| Node.js          | v18 or later                            |
| npm              | Included with Node.js                   |
| Git              | Required to clone repository            |
| Browser          | Any modern browser (Chrome recommended) |
| Internet         | Required for Microsoft SSO login        |

Check your versions:
```bash
node -v 
npm -v
```

## 2. Clone the Repository
```bash
git clone https://github.com/WSU-4110/Study-Room-Reservation.git
cd Study-Room-Reservation
```

## 3. Environment Variables
Create a file named .env.local in the project root and add:
```bash
BETTER_AUTH_SECRET=your_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

DATABASE_URL=your_database_connection_string_here

MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret_here
```
## 4. Install Dependencies
```bash
npm install
```
## 5. Run the Development Server
```bash
npm run dev
```

