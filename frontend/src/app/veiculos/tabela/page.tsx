"use client"; // Ativa o comportamento de cliente

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import api from "../../../config/axiosConfigVeiculos"; // Conexão com a API de veículos
import TabelaVeiculos from "../../../components/TabelaVeiculos"; // Importando o componente de tabela

const App: React.FC = () => {
  const [veiculos, setVeiculos] = useState<any[]>([]); // Use any[] ou um tipo adequado
  const [loading, setLoading] = useState(true);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Veículo", key: "nome" },
    { label: "Placa", key: "placa" },
    { label: "Tipo", key: "tipo" },
    { label: "Status", key: "status" },
    { label: "Data de Entrada", key: "dataEntrada" },
  ];

  // Função para buscar veículos da API
  const fetchVeiculos = async () => {
    try {
      const response = await api.get("/api/veiculos"); // Ajuste conforme o endpoint da API
      console.log("Veículos recebidos:", response.data);
      setVeiculos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      setLoading(false);
    }
  };

  // Função para deletar um veículo
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/veiculos/${id}`); // Ajuste conforme o endpoint da API
      console.log(`Veículo com ID ${id} apagado com sucesso.`);
      setVeiculos(veiculos.filter((veiculo) => veiculo.id !== id)); // Atualiza a lista de veículos
    } catch (error) {
      console.error(`Erro ao apagar veículo com ID ${id}:`, error);
    }
  };

  // Usando useEffect para buscar os dados ao montar o componente
  useEffect(() => {
    fetchVeiculos();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Mensagem enquanto os dados estão sendo carregados
  }

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#E9E9E9" }}>
      <main style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" }}>
        <h1 style={{ color: "#08005B" }}>Gerenciamento de Veículos</h1>
        
        {/* Usando o componente TabelaVeiculos com os dados dinâmicos */}
        <TabelaVeiculos 
          headers={headers} 
          data={veiculos} 
          rowsPerPage={5} 
          onDelete={handleDelete} // Passa a função de deleção
        />
        
        <Link href="/veiculos" passHref>
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
        <Link href="/veiculos/cadastro" passHref>
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
