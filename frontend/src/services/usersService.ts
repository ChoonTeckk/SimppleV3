import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

export const getUsers = () => axios.get(API_URL);

export const createUser = (data: { name: string; email: string; age: number }) =>
  axios.post(API_URL, data);
