import axios from 'axios';
const { BASE_URL } = process.env;

export default axios.create({
  baseURL: BASE_URL,
});
