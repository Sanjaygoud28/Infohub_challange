import { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, CircularProgress, Select, MenuItem } from '@mui/material';
import { convertCurrency } from '../services/api';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('USD');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await convertCurrency(amount, 'INR', to);
      setResult(data);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="app-card" sx={{ minWidth: 275, maxWidth: 500, margin: '0 auto', mt: 2 }}>
      <CardContent className="card-content-centered">
        <Typography variant="h5" component="div" gutterBottom>
          Currency Converter
        </Typography>
        
        <form onSubmit={handleConvert} style={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Amount (INR)"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            sx={{ mb: 2 }}
          />
          
          <Select
            fullWidth
            value={to}
            onChange={(e) => setTo(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>

          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            fullWidth
          >
            Convert
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

        {result && !loading && (
          <div className="card-content-centered" style={{ marginTop: 20 }}>
            <Typography variant="h6">
              {amount} INR = {result.convertedAmount} {to}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Exchange Rate: 1 INR = {result.rate} {to}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;