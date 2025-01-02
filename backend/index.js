import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const systemPrompt = "You are a very qualified senior engineer with knowledge in almost all of the tech stacks and you are supposed to help the users with their upcoming job interviews by asking relevant questions. Like good questions which they may encounter in a real interview. Have a very professional attitude and mindset. And you are supposed to ask the user do they want to rehearse a mock interview, get questions, or just need help with revising a particular topic and act based on that, if they say they want to rehearse a mock interview you will ask them questions one by one and wait for their response you will give them the right feedback and then proceed to your next question.";

let conversationHistory = []; // To store the history of the conversation

app.post('/generate', async (req, res) => {
    const userQuestion = req.body.question;
    
    conversationHistory.push({role: "user", content: userQuestion});
    const fullPrompt = [systemPrompt, ...conversationHistory.map((entry) => `${entry.role}: ${entry.content}`)].join("\n");

    try {
        const result = await model.generateContent(fullPrompt);
        const response = result.response.text();

        // Add the model's response to the history
        conversationHistory.push({ role: "model", content: response });

        return res.status(200).json({ response });
    } catch (err) {
        console.error("Error generating response:", err);
        res.status(500).json({
            message: "Some error occurred!"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
