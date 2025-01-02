import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import cors  from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" },
    {
        temperature: 0.1,  
    }
);

app.post('/generate', async (req,res) => 
{   
    const message = req.body.question;

    try 
    {
        const result = await model.generateContent(message);
        const response = result.response.text();
        return res.status(200).json({response})
    }
    catch 
    {
        res.status(500).json({
            message: "Some error occurred!"
        })
    }
})

const PORT = 3000;

app.listen(PORT, ()=> 
{
    console.log(`Server is running on port ${PORT}`);
});

// const chat = model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: [{ text: "Hello" }],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//       },
//     ],
//   });
  
//   let result = await chat.sendMessageStream("I have 2 dogs in my house.");
//   for await (const chunk of result.stream) {
//     const chunkText = chunk.text();
//     process.stdout.write(chunkText);
//   }
//   let result2 = await chat.sendMessageStream("How many paws are in my house?");
//   for await (const chunk of result2.stream) {
//     const chunkText = chunk.text();
//     process.stdout.write(chunkText);
//   }