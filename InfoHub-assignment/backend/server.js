import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    // Using OpenWeather API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    const weather = {
      temperature: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      humidity: response.data.main.humidity
    };

    res.json(weather);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ message: 'City not found' });
    } else {
      res.status(500).json({ message: 'Failed to fetch weather data' });
    }
  }
});

// Currency conversion endpoint
app.get('/api/currency', async (req, res) => {
  try {
    const { amount, from, to } = req.query;
    if (!amount || !from || !to) {
      return res.status(400).json({ message: 'Amount, from, and to currencies are required' });
    }

    // Using Exchange Rate API
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/${from}/${to}/${amount}`
    );

    const result = {
      convertedAmount: response.data.conversion_result.toFixed(2),
      rate: response.data.conversion_rate.toFixed(4)
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to convert currency' });
  }
});

// Quote generator endpoint
app.get('/api/quote', async (req, res) => {
  try {
    // Fallback quotes in case the API is unavailable
    const fallbackQuotes = [
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
      },
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
      },
      {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
      },
      {
        text: "Everything you've ever wanted is sitting on the other side of fear.",
        author: "George Addair"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
      }
    ];

    try {
      // First try the online API
      const response = await axios.get('https://api.quotable.io/random?tags=inspirational');
      const quote = {
        text: response.data.content,
        author: response.data.author
      };
      res.json(quote);
    } catch (apiError) {
      // If API fails, use a random fallback quote
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      res.json(randomQuote);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quote' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});