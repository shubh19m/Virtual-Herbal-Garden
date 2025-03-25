const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/ask-bot', async (req, res) => {
    const userQuery = req.body.query;
    
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [{ role: 'system', content: "You are a herbal expert." }, { role: 'user', content: userQuery }]
    }, {
        headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
    });

    res.json({ answer: response.data.choices[0].message.content });
});

app.listen(3000, () => console.log('Server running on port 3000'));
