require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 3000;

app.post('/process_image', async (req, res) => {
    const { imageBase64, prompt } = req.body; // Expect base64 encoded image and a text prompt from the client

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generate',
            {
                model: "vision-model-id", // Replace 'vision-model-id' with the specific model id from OpenAI
                input: imageBase64,
                prompt: prompt
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const description = response.data.choices[0].text; // Assume the model returns the description here
        res.status(200).json({ description });
    } catch (error) {
        console.error('Error connecting to OpenAI:', error.message);
        res.status(500).json({ message: "Failed to process image with OpenAI" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
