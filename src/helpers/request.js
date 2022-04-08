import axios from 'axios';

const request = axios.create({
   baseURL: process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      : 'https://regulus735-fake-people.herokuapp.com',
   //obsługiwanie samemu wyjątków
   validateStatus: false
});

request.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
         config.headers.authorization = token;
      }
      return config;
   },
   (error) => Promise.reject(error),
);

export default request;