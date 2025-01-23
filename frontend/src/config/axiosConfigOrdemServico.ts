import axios from "axios";

const apiOrdemServico = axios.create({
  baseURL: "http://localhost:6060",  
  headers: {
    "Content-Type": "application/json",
  },
});

apiOrdemServico.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na resposta Axios:", error.response);
    return Promise.reject(error);
  }
);

export default apiOrdemServico;
