# InfoHub - Weather, Currency & Quotes Application

A full-stack web application that provides weather information, currency conversion, and motivational quotes.

## Features

- **Weather Information**: Get current weather data for any city
- **Currency Converter**: Convert INR to USD/EUR with real-time exchange rates
- **Quote Generator**: Get random motivational quotes

## Tech Stack

### Frontend
- React (Vite)
- Material-UI
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- Axios

## Setup Instructions

### Frontend Setup

1. Navigate to the project root directory:
   ```bash
   cd InfoHub-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your API keys:
   - Get OpenWeather API key from: https://openweathermap.org/api
   - Get Exchange Rate API key from: https://www.exchangerate-api.com/

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Weather
- `GET /api/weather?city={city}`
- Returns temperature, condition, and humidity

### Currency
- `GET /api/currency?amount={amount}&from=INR&to={USD/EUR}`
- Returns converted amount and exchange rate

### Quotes
- `GET /api/quote`
- Returns a random motivational quote with author

## Environment Variables

### Backend (.env)
```
OPENWEATHER_API_KEY=your_openweather_api_key
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## Deployment

### Frontend
The frontend can be deployed to Vercel:

1. Build the project:
   ```bash
   npm run build
   ```

2. Follow Vercel's deployment instructions for the dist folder.

### Backend
The backend can be deployed to platforms like Heroku or Railway:

1. Make sure to set the environment variables in your deployment platform
2. Update the frontend API base URL to point to your deployed backend

## License

MIT
