import axios from "axios";
import { getAuthToken } from "./API/Auth";

const client = axios.create({
  baseURL: '/api',
  authorization: `Bearer ${getAuthToken()}`,
});

export default client
