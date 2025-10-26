// src/utils/axiosFlask.js
import axios from "axios";

const flaskInstance = axios.create({
  baseURL: process.env.REACT_APP_FLASK_URL, // Flask (yfinance)
});

export default flaskInstance;
