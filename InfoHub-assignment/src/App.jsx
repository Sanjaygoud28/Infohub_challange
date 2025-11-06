import { useState } from 'react';
import { Container, Tabs, Tab, Box, Typography } from '@mui/material';
import { WiDaySunny } from 'react-icons/wi';
import { MdCurrencyExchange } from 'react-icons/md';
import { FaQuoteRight } from 'react-icons/fa';
import Weather from './components/Weather';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="md" className="app-shell" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        InfoHub — Weather · Currency · Quotes
      </Typography>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        centered
        sx={{ mb: 3 }}
        variant="fullWidth"
      >
        <Tab 
          icon={<WiDaySunny size={24} />} 
          label="Weather" 
          iconPosition="start"
        />
        <Tab 
          icon={<MdCurrencyExchange size={20} />} 
          label="Currency" 
          iconPosition="start"
        />
        <Tab 
          icon={<FaQuoteRight size={18} />} 
          label="Quote" 
          iconPosition="start"
        />
      </Tabs>

      <Box hidden={currentTab !== 0}>
        <Weather />
      </Box>
      <Box hidden={currentTab !== 1}>
        <CurrencyConverter />
      </Box>
      <Box hidden={currentTab !== 2}>
        <QuoteGenerator />
      </Box>
    </Container>
  );
}

export default App;
