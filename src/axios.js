import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7075/api", // URL của API .NET Core
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
