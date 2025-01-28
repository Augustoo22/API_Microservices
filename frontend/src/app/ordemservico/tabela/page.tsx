"use client"; // Adicione esta linha no início do arquivo

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import apiOrdemServico from "../../../config/axiosConfigOrdemServico"; // Ajuste para o axiosConfigCliente
import TabelaComponente from "../../../components/TabelaComponente"; // Importando o componente de tabela

const App: React.FC = () => {
  const [ordensServico, setOrdensServico] = useState<any[]>([]); // Lista de ordens de serviço
  const [loading, setLoading] = useState(true);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Serviço", key: "servico" },
    { label: "Data Início", key: "dataInicio" },
    { label: "Data Término", key: "dataTermino" },
    { label: "Status O.S.", key: "status" },
  ];

  // Função para buscar as ordens de serviço da API
  const fetchOrdensServico = async () => {
    try {
      const response = await apiOrdemServico.get("/api/ordensServico"); // Endpoint para ordens de serviço
      console.log("Ordens de Serviço recebidas:", response.data);
      
      // Mapear as ordens de serviço para adicionar a tradução do status
      const ordensComStatusTraduzido = response.data.map((ordem: any) => ({
        ...ordem,
        status: ordem.status ? "Aberta" : "Fechada", // Tradução do status booleano para "Aberta" ou "Fechada"
      }));
      
      setOrdensServico(ordensComStatusTraduzido); // Atualiza o estado com ordens mapeadas
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar ordens de serviço:", error);
      setLoading(false);
    }
  };

  // Função para deletar uma ordem de serviço
  const handleDelete = async (id: number) => {
    try {
      // Chama a API para excluir a ordem de serviço
      await apiOrdemServico.delete(`/api/ordensServico/${id}`);
      // Atualiza o estado para remover a ordem de serviço da lista
      setOrdensServico(ordensServico.filter((ordem) => ordem.id !== id));
    } catch (error) {
      console.error("Erro ao deletar ordem de serviço:", error);
    }
  };

  useEffect(() => {
    fetchOrdensServico();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#E9E9E9" }}>
      <main style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" }}>
        <h1 style={{ color: "#08005B" }}>Gerenciamento de Ordens de Serviço</h1>

        {/* Usando o componente TabelaComponente para exibir as ordens de serviço */}
        <TabelaComponente
          headers={headers}
          data={ordensServico} // Passando os dados com o status já traduzido
          onDelete={handleDelete} // Passando a função de deletar
        />

        {/* Botões de navegação */}
        <Link href="/ordemservico" passHref>
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
        
        <Link href="/ordemservico/cadastro" passHref>
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
        
        <Link href="/ordemservico/editar" passHref>
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              bottom: "16px",
              right: "330px",
              backgroundColor: "#08005B",
              color: "#FFF",
              padding: "12px 24px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#08005B",
              },
            }}
          >
            Editar
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default App;
