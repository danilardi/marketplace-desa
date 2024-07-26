import axios from "axios";
import { getAuthToken } from "./API/Auth";

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  authorization: `Bearer ${getAuthToken()}`,
});

export default client
