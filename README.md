# 🤖 Collaborative AI Chatboard

<div align="center">
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtY29kYnk4Y3kyOXF1NWtrN3BxcnhyZm9lZW13NHd6dzFyYmx6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif" width="400" />

<h3>A real-time chat application with AI integration built using MERN Stack</h3>

[![GitHub license](https://img.shields.io/github/license/wowgeekyboy/collaborative-ai-chatboard)](https://github.com/wowgeekyboy/collaborative-ai-chatboard/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/wowgeekyboy/collaborative-ai-chatboard)](https://github.com/wowgeekyboy/collaborative-ai-chatboard/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/wowgeekyboy/collaborative-ai-chatboard)](https://github.com/wowgeekyboy/collaborative-ai-chatboard/issues)
</div>

## ✨ Features

- 🔐 **User Authentication**
  - JWT-based authentication
  - Secure password hashing
  - Protected routes

- 💬 **Real-time Chat**
  - Instant messaging using Socket.IO
  - Message history
  - User presence indicators

- 🤖 **AI Integration**
  - OpenAI GPT-4 powered responses
  - Smart conversation assistance
  - Context-aware interactions

- 🎨 **Modern UI/UX**
  - Responsive design
  - Clean and intuitive interface
  - Real-time updates

## 🛠️ Tech Stack

### Frontend
- React.js (v18.2.0)
- Socket.IO Client (v4.8.1)
- Axios for HTTP requests
- React Router DOM (v6.22.0)
- Framer Motion for animations

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- OpenAI API for AI integration

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- OpenAI API key
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/wowgeekyboy/collaborative-ai-chatboard.git
cd collaborative-ai-chatboard
```

### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to your `.env` file:
```env
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Step 3: Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend Development Server
```bash
cd ../frontend
npm start
```

The application will be running at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5001`

## 📡 API Documentation

### Authentication Endpoints
```javascript
POST /api/auth/register
// Register new user
Body: { username, email, password }

POST /api/auth/login
// User login
Body: { email, password }

GET /api/auth/profile
// Get user profile (Protected)
Headers: { Authorization: "Bearer {token}" }
```

### Chat Endpoints
```javascript
GET /api/chat
// Get all messages (Protected)
Headers: { Authorization: "Bearer {token}" }

POST /api/chat
// Send new message (Protected)
Body: { message }
Headers: { Authorization: "Bearer {token}" }

POST /api/chat/ai-response
// Get AI response (Protected)
Body: { prompt }
Headers: { Authorization: "Bearer {token}" }
```

## 🔌 WebSocket Events
```javascript
// Client-side events
socket.on('connect')
socket.on('receive_message')
socket.emit('send_message')

// Server-side events
io.on('connection')
socket.on('disconnect')
socket.on('send_message')
```

## 📤 Deployment

### 1. Prepare for Production
```bash
# Build frontend
cd frontend
npm run build

# Prepare backend
cd ../backend
npm install --production
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/YourFeature
```
3. Commit your changes:
```bash
git commit -m 'Add YourFeature'
```
4. Push to the branch:
```bash
git push origin feature/YourFeature
```
5. Open a Pull Request

## 🐛 Bug Report

If you find a bug, kindly open an issue [here](https://github.com/wowgeekyboy/collaborative-ai-chatboard/issues/new)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- OpenAI team for GPT-4 API
- MongoDB team
- Socket.IO team
- React team

<div align="center">
<img src="https://media.giphy.com/media/3oKIPc9VZj4ylzjcys/giphy.gif" width="300" />
<br>
<br>
  Made with ❤️ by <a href="https://github.com/wowgeekyboy">wowgeekyboy</a>
</div>

