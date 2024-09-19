const express = require('express');
const axios = require('axios');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

const PORT = '8888';

const LINE_BOT_API = 'https://api.line.me/v2/bot';
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
}

app.post('/send-message', async (req, res) => {
    try{
        const {userId, message} = req.body
        const body = {
            'to': userId,
            'messages':[{
                'type': 'text',
                'text': message
            }]
        }

        console.log('Request headers:', headers);

        const response = await axios.post(`${LINE_BOT_API}/message/push`, body, {headers})

        console.log('Request headers:', headers);
        console.log('response', response.data)

        res.json({
            message: 'Send msg success',
            responseData: response.data
        })
    } catch (error) {
        if (error.response) {
            console.log('Response error:', error.response.data);
        } else if (error.request) {
            console.log('Request error:', error.request);
        } else {
            console.log('Error', error.message);
        }
    }
})

app.listen(PORT, (req, res) => {
    console.log(`run at http://localhost:${PORT}`)
})