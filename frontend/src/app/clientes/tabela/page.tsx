"use client"; // Adicione esta linha no início do arquivo

import React, { useEffect, useState } from "react";
import TabelaComponente from "../../../components/TabelaComponente";
import Link from "next/link";
import Button from "@mui/material/Button";
import api from "../../../config/axiosConfigCliente";

const App: React.FC = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Nome", key: "nome" },
    { label: "CPF", key: "cpf" },
    { label: "Data Nascimento", key: "dataNascimento" },
    { label: "Veículos", key: "quantidadeVeiculos" },
  ];

  const fetchClientes = async () => {
    try {
      const response = await api.get("/api/clientes");
      console.log("Clientes recebidos:", response.data); // Verifique os dados aqui
      setClientes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes(); 
  }, []);

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#E9E9E9" }}>
      <main style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" }}>
        <h1 style={{ color: "#08005B" }}>Gerenciamento de Clientes</h1>
        <TabelaComponente headers={headers} data={clientes} rowsPerPage={5} />
        <Link href="/clientes" passHref>
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              backgroundColor: "#08005B",
              color: "#FFF",
              padding: "12px 24px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#08005B",
              },
            }}
          >
            Menu
          </Button>
        </Link>
        <Link href="/clientes/cadastro" passHref>
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              bottom: "16px",
              right: "150px",
              backgroundColor: "#08005B",
              color: "#FFF",
              padding: "12px 24px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#08005B",
              },
            }}
          >
            Cadastro
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default App;
