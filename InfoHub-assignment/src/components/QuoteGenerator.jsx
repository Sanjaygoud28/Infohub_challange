import { useState } from 'react';
import { Card, CardContent, Button, Typography, CircularProgress } from '@mui/material';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { getQuote } from '../services/api';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQuote = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getQuote();
      setQuote(data);
    } catch (err) {
      setError(err.message);
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="app-card" sx={{ minWidth: 275, maxWidth: 500, margin: '0 auto', mt: 2 }}>
      <CardContent className="card-content-centered">
        <Typography variant="h5" component="div" gutterBottom>
          Motivational Quote
        </Typography>
        
        <Button
          variant="contained"
          onClick={handleGenerateQuote}
          disabled={loading}
          fullWidth
          sx={{ mb: 3 }}
        >
          Generate New Quote
        </Button>

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

        {quote && !loading && (
          <div className="card-content-centered" style={{ marginTop: 20, padding: '0 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <FaQuoteLeft style={{ opacity: 0.5 }} />
              <Typography variant="h6" component="span" style={{ maxWidth: 520 }}>
                {quote.text}
              </Typography>
              <FaQuoteRight style={{ opacity: 0.5 }} />
            </div>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
              - {quote.author || 'Unknown'}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuoteGenerator;