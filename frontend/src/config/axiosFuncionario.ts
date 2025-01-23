import axios from "axios";

const apiFuncionario = axios.create({
  baseURL: "http://localhost:5050",  // Base URL para a API
  headers: {
    "Content-Type": "application/json", // Definir o tipo de conteúdo
  },
});

apiFuncionario.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na resposta Axios:", error.response);
    return Promise.reject(error);
  }
);

export default apiFuncionario;
