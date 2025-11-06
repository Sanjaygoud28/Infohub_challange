import { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { WiDaySunny, WiRain, WiCloudy } from 'react-icons/wi';
import { getWeather } from '../services/api';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <WiDaySunny size={50} />;
      case 'rain':
      case 'rainy':
        return <WiRain size={50} />;
      default:
        return <WiCloudy size={50} />;
    }
  };

  return (
    <Card className="app-card" sx={{ minWidth: 275, maxWidth: 500, margin: '0 auto', mt: 2 }}>
      <CardContent className="card-content-centered">
        <Typography variant="h5" component="div" gutterBottom>
          Weather Information
        </Typography>
        
        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Enter City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            fullWidth
          >
            Search
          </Button>
        </form>

        {loading && (
          <div className="loading-wrap">
            <CircularProgress />
          </div>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {weather && !loading && (
          <div className="card-content-centered" style={{ marginTop: 20 }}>
            {getWeatherIcon(weather.condition)}
            <Typography variant="h6" sx={{ mt: 1 }}>
              {weather.temperature}°C
            </Typography>
            <Typography color="text.secondary">
              {weather.condition}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Humidity: {weather.humidity}%
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Weather;