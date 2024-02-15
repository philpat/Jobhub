import axios from 'axios';

const BASE_URL = 'https://dull-bear-trench-coat.cyclic.app '

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    // Authorization: `Bearer ${loginUser.token}`,
    Accept: `application/json`,
    'Content-Type': 'application/json',
    // Authorization: `Bearer 'API_TOKEN'`,

    
  },
});