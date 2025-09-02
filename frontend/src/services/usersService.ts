  import axios from "axios";

  const API_URL = "http://127.0.0.1:8000/api"; 
  // const API_URL = "http://localhost:8000/api";
  // const API_URL = "http://127.0.0.1:8000/api";



  export const getUsers = () => axios.get(`${API_URL}/users`);
  // export const getUsers = () => axios.get(`${API_URL}`);

  export const createUser = (data: { name: string; email: string; age: number }) =>
    // axios.post(API_URL, data);
    axios.post(`${API_URL}/users`, data);

