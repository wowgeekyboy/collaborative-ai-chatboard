const OpenAI = require("openai");
const Chat = require('../models/Chat');
const User = require('../models/User');

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Controller: Fetch all chat messages
const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find()
      .populate('sender', 'username email')
      .sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};

// Controller: Send a new chat message
const sendMessage = async (req, res) => {
  const { message } = req.body;
  try {
    const newMessage = await Chat.create({
      sender: req.user.id,
      message,
    });
    const populatedMessage = await newMessage.populate('sender', 'username email');
    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};

// Controller: Generate an AI response using OpenAI
const generateAIResponse = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt || "Hello! How can I assist you?" }],
      max_tokens: 150,
    });
    const message = response.choices[0].message.content;
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error generating AI response:", error.message);
    res.status(500).json({
      message: "Failed to generate AI response",
      error: error.message,
    });
  }
};

module.exports = {
  getMessages,
  sendMessage,
  generateAIResponse,
};