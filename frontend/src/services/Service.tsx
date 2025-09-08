  import axios from "axios";

  const API_URL = "http://127.0.0.1:8000/api"; 
  // const API_URL = "http://localhost:8000/api";
  // const API_URL = "http://127.0.0.1:8000/api";



  export const getUsers = () => axios.get(`${API_URL}/users`);
  export const getClients = () => axios.get(`${API_URL}/clients`);
  export const getTasks = () => axios.get(`${API_URL}/tasks`);
  // export const getUsers = () => axios.get(`${API_URL}`);

  export const createUser = (data: { name: string; email: string; age: number }) =>
    axios.post(`${API_URL}/users`, data);

  export const createClient = (data: { name: string; email: string; phone: number; role_name: string; role_id: number; 
    city: string; state: string; postal_code: number; country: string; image: string  }) =>
    axios.post(`${API_URL}/clients`, data);

  export const createTask = (data: { name: string; priority: string; status: string; due_date: Date }) =>
    axios.post(`${API_URL}/tasks`, data);
