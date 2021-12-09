import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import "./font/webfonts/all.css"



axios.defaults.headers= 
{'Authorization': 'Bearer bmV4dGNhcCAzZDIyYzNlY2JmZWM4OTVlZGY2MGM2ZmM5MGJhOTc0OA==',
withCredentials: true,}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// "apexcharts": "^3.29.0",
// "react-google-charts": "^3.0.15",
