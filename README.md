Aiensured Note App 📓
Aiensured Note App is a MERN stack-based application designed for efficient note-taking. It features a simple, user-friendly interface and backend functionality that includes email notifications after signing in.


🌐 **Deployed App**: [Visit Aiensured Note App](https://aiensured-assignment-git-main-crickets-projects-e98095f4.vercel.app)


📂 **Source Code**: [GitHub Repository](https://github.com/utkarsh-choudhary/aiensured-assignment)


🚀 Features
Create, update, and delete notes.
User authentication with email integration.
Intuitive design for seamless navigation.
Backend email service for notifications.



🛠️ Tech Stack
Frontend: React.js (Vite)
Backend: Node.js, Express.js
Database: MongoDB
Styling: Tailwind CSS



📋 Prerequisites
Make sure you have the following installed:

Node.js (v16 or later)
npm (v7 or later)
MongoDB (running locally or in the cloud)


🖥️ Installation & Setup
1. Clone the Repository


git clone https://github.com/utkarsh-choudhary/aiensured-assignment.git
cd aiensured-assignment



2. Set Up Environment Variables
Create a .env file in the root of the server directory with the following variables:


MONGO_URI=<your-mongodb-connection-string>
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password>


3. Install Dependencies
Install dependencies for both the client and server:

# From the root directory
cd client
npm install
cd ../server
npm install


4. Start the Application
Run both client and server concurrently:
npm run dev


The client will start at http://localhost:5173.
The server will start at http://localhost:9000.



📧 Email Functionality
To enable email notifications after signing in:

Make sure the SMTP service is enabled for your email account.
openssl s_client -connect smtp.gmail.com:465



📂 Folder Structure
plaintext
Copy code
aiensured-assignment/
├── client/            # Frontend code (React.js)
├── server/            # Backend code (Node.js + Express)
├── .env               # Environment variables
├── README.md          # Project documentation
└── package.json       # Project dependencies and scripts


🚨 Troubleshooting
Email Sending Issues: Verify the SMTP connection using the openssl command and check if Gmail's "Allow Less Secure Apps" is enabled or use an app password.
Database Connection: Ensure your MongoDB URI in .env is correct and the database is running.



🛡️ License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it.