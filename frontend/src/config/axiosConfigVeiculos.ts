import axios from "axios";

const apiVeiculos = axios.create({
  baseURL: "http://localhost:7070",  
  headers: {
    "Content-Type": "application/json",
  },
});

apiVeiculos.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na resposta Axios:", error.response);
    return Promise.reject(error);
  }
);

export default apiVeiculos;
