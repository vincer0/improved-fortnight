import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

// TODO refactor...
export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/scrap-x`);

  return response;
};
