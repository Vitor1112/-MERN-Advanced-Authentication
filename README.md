# 📌 How to Set Up and Run the Project  

## ⚙️ Configure the `.env` file  

Create a `.env` file in the root directory and add the following variables:  

```bash
MONGO_URI=your_mongo_uri
PORT=3000
JWT_SECRET=your_secret_key
NODE_ENV=development

MAILTRAP_TOKEN=your_mailtrap_token

CLIENT_URL=http://localhost:5173

### Run this app locally

# Install dependencies
npm install

# Build the project
npm run build

 # Start the application
 npm run start

 # Run the application in development mode
 npm run dev