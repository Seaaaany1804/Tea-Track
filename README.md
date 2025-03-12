# Project Setup Guide

Follow these steps to set up and run Tea Track on your local machine.

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/Seaaaany1804/Tea-Track.git
cd Tea-Track
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory. Follow the file template below.

```env
PORT="8081"
DB_HOST="<database_host_url>"
DB_NAME="<database_name>"
DB_USER="<database_user>"
DB_PASSWORD="<database_password>"

EMAIL_USER="<email_address>"
EMAIL_PASSWORD="<email_password>"
EMAIL_NUMBER="<email_phone_number"
EMAIL_APP_PASSWORD="<email_app_password>"
```
### 3. Install Dependencies

Frontend

```bash
cd frontend
npm install
npm install react-scripts react-router-dom react-barcode --legacy-peer-deps
npm audit fix --force
```

Backend

```bash
cd backend
npm install dotenv express mysql cors nodemon nodemailer --legacy-peer-deps
```

### 4. Run the System

Run this code for both Frontend and Backend

```bash
npm start
```

## Access the Application

- **Frontend and Backend:** Open `http://localhost:8081` in your browser.
