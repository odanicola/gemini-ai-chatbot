import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
});

const GEMINI_MODEL = 'gemini-2.5-flash';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function extractTextFromResponse(resp) {
  try {
    const text = 
        resp?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
        resp?.candidates?.[0]?.content?.parts?.[0]?.text ??
        resp?.response?.candidates?.[0]?.text;
    return text ?? JSON.stringify(resp, null, 2);
  } catch (error) {
    console.error('Error extracting text from response:', error);
    return JSON.stringify(resp, null, 2);
    
  }
}

// Endpoint to handle chat requests
// This endpoint expects an array of messages in the request body
// Each message should have a 'role' and 'content' field
// Example request body:
// {
//   "messages": [
//     { "role": "user", "content": "Hello, how are you?" },
//     { "role": "assistant", "content": "I'm fine, thank you!" }
//   ]
// }  
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  try {
    const contents = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const response = await genAI.models.generateContent({
        model: GEMINI_MODEL,
        contents: contents,
    });

    const textResponse = extractTextFromResponse(response);
    res.json({ response: textResponse });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});