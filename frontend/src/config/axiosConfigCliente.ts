import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",  // Base URL para a API
  headers: {
    "Content-Type": "application/json", // Definir o tipo de conteúdo
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na resposta Axios:", error.response);
    return Promise.reject(error);
  }
);

export default api;
