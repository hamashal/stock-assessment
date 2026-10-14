/**
 * Required modules:
 * - express: Web framework for Node.js used to create the API server.
 * - axios: Promise-based HTTP client for making requests to external APIs.
 * - cors: Middleware to enable Cross-Origin Resource Sharing.
 */
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Enable CORS to allow the frontend application to communicate with this backend API securely
app.use(cors()); 

/**
 * GET /api/stocks/:symbol
 * Endpoint to fetch and process intraday stock data for a given ticker symbol.
 * 
 * @param {string} req.params.symbol - The stock ticker symbol provided in the URL
 * @returns {Array} JSON array containing daily grouped stock data (day, lowAverage, highAverage, volume).
 */
app.get('/api/stocks/:symbol', async (req, res) => {
    // Extract the stock symbol from the URL parameters
    const symbol = req.params.symbol;
    
    try {
        // Construct Yahoo Finance API URL 
        // Requests 15-minute interval data spanning the last 1 month
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=15m&range=1mo`;
        
        // Execute the GET request to the Yahoo Finance API
        // A generic User-Agent header is included to prevent the request from being blocked by the API
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        // Extract the core data object from the deeply nested API response structure
        const result = response.data.chart.result[0];
        const timestamps = result.timestamp; // Array of Unix timestamps representing each 15m interval
        const quote = result.indicators.quote[0]; // Object containing parallel arrays of high, low, open, close, and volume data

        // Object to temporarily hold our data grouped by calendar date
        const dailyData = {};

        // Loop through all timestamps to group the raw parallel arrays by calendar date
        for (let i = 0; i < timestamps.length; i++) {
            // Convert the Unix timestamp (seconds) to milliseconds, then to an ISO string, 
            // and extract just the YYYY-MM-DD date portion
            const date = new Date(timestamps[i] * 1000).toISOString().split('T')[0];

            // If this is the first time encountering this date, initialize its structure
            if (!dailyData[date]) {
                dailyData[date] = { lows: [], highs: [], volume: 0 };
            }

            // Append the specific interval's data to the daily arrays/totals, 
            // checking for null values which occasionally occur in financial APIs during halted trading
            if (quote.low[i] !== null) dailyData[date].lows.push(quote.low[i]);
            if (quote.high[i] !== null) dailyData[date].highs.push(quote.high[i]);
            if (quote.volume[i] !== null) dailyData[date].volume += quote.volume[i];
        }

        // Transform the grouped dailyData object into the final requested array format
        const formattedData = Object.keys(dailyData).map(day => {
            const dayData = dailyData[day];

            // Sum all the low and high values for the day to prepare for average calculation
            const lowSum = dayData.lows.reduce((a, b) => a + b, 0);
            const highSum = dayData.highs.reduce((a, b) => a + b, 0);

            // Return the structured object for the current day
            return {
                day: day,
                // Calculate the average, round it to 4 decimal places, and convert it back to a Number type
                lowAverage: Number((lowSum / dayData.lows.length).toFixed(4)),
                highAverage: Number((highSum / dayData.highs.length).toFixed(4)),
                volume: dayData.volume // Total accumulated volume for the day
            };
        });

        // Send the formatted array back to the client as a successful JSON response
        res.json(formattedData);
        
    } catch (error) {
        // If the API request fails (like an invalid stock symbol is given or network issues), 
        // catch the error and return a 400 Bad Request status with an error message
        res.status(400).json({ error: 'Invalid symbol or failed request' });
    }
});

// Start the server and listen for incoming connections on port 3001
app.listen(3001, () => console.log('Backend running on http://localhost:3001'));