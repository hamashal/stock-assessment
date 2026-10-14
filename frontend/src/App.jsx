/**
 * React is a library for building user interfaces. 
 * 'useState' is a React Hook that lets you add variables to your component that can change over time.
 * 'axios' is the tool we use to make HTTP requests to our backend.
 */
import { useState } from 'react';
import axios from 'axios';

function App() {
  // --- STATE VARIABLES ---
  // symbol: Stores whatever the user types into the search box.
  // setSymbol: The function we call to update the 'symbol' variable.
  const [symbol, setSymbol] = useState('');
  
  // data: Stores the array of stock data we get back from our backend. Starts as an empty array.
  const [data, setData] = useState([]);
  
  // error: Stores any error messages (like if a user types a fake stock symbol). Starts empty.
  const [error, setError] = useState('');

  /**
   * fetchStockData
   * This function runs when the user clicks the "Search" button or hits Enter.
   * It talks to our Node.js backend to get the stock data.
   */
  const fetchStockData = async (e) => {
    // e.preventDefault() stops the web page from refreshing when the form is submitted
    e.preventDefault();
    
    // Clear any previous errors before making a new search
    setError('');
    
    try {
      // Ask backend running on port 3001 for the data for this specific symbol
      const response = await axios.get(`http://localhost:3001/api/stocks/${symbol}`);
      
      // If successful, save the data we got back into our 'data' state variable
      setData(response.data);
    } catch (err) {
      // If the backend sends back an error (like a 400 Bad Request), display this message
      setError('Failed to fetch data. Please check the stock symbol and try again.');
      
      // Clear any old data off the screen
      setData([]);
    }
  };

  // --- UI (What the user sees) ---
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Stock Market Dashboard</h1>
      
      {/* The search form */}
      <form onSubmit={fetchStockData} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={symbol} 
          // Whenever the user types, update the 'symbol' variable to match
          onChange={(e) => setSymbol(e.target.value)} 
          placeholder="Enter Symbol (e.g. TSLA)"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
      </form>

      {/* If the 'error' variable has text in it, display it in red */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* If 'data' array has items in it, display the table */}
      {data.length > 0 && (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Low Average</th>
              <th>High Average</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through each day of data and create a table row (tr) for it */}
            {data.map((row) => (
              <tr key={row.day}>
                <td>{row.day}</td>
                <td>${row.lowAverage}</td>
                <td>${row.highAverage}</td>
                <td>{row.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Exporting the component so Vite knows to render it on the screen
export default App;