import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
});

export default api;
