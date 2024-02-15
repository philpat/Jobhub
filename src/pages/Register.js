
import axios from "axios";

const BASE_URL = 'https://dull-bear-trench-coat.cyclic.app';
// const getSubscribers = "subscribers";
const $http = axios.create({
baseURL: BASE_URL,
headers : {
 'Content-Type': 'application/json; charset=UTF-8',
}
})

export const Register = async ( data) => {
    try {
        const res = await $http.post('/api/auth/signup', { data })
        return { success: true, data: res?.data, message: 'Waitlist joined successfully' };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'An error occurred' };  
  }
  }