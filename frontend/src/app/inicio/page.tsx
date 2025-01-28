"use client";
import React, { useEffect, useState } from "react";
import TabelaSimples from "../../components/TabelaSimples";
import apiOrdemServico from "../../config/axiosConfigOrdemServico";
import apiFuncionarios from "../../config/axiosFuncionario";
import apiVeiculos from "../../config/axiosConfigVeiculos";
import api from "../../config/axiosConfigCliente";

const DashboardLayout: React.FC = () => {
  const [cards, setCards] = useState([
    { label: "O.S", value: 0, icon: "Notepad.png" },
    { label: "Clientes", value: 0, icon: "customerlistsfill.png" },
    { label: "Veículos", value: 0, icon: "Car.png" },
    { label: "Funcionários", value: 0, icon: "PeopleTeam.png" },
  ]);

  const [veiculos, setVeiculos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Realiza as chamadas para as APIs
        const [osResponse, clientesResponse, veiculosResponse, funcionariosResponse] = await Promise.all([
          apiOrdemServico.get("/api/ordensServico"),
          api.get("/api/clientes"),
          apiVeiculos.get("/api/veiculos"),
          apiFuncionarios.get("/api/funcionarios"),
        ]);

        // Atualiza os valores nos cards com base no comprimento dos arrays
        setCards([
          { label: "O.S", value: osResponse.data.length, icon: "Notepad.png" },
          { label: "Clientes", value: clientesResponse.data.length, icon: "customerlistsfill.png" },
          { label: "Veículos", value: veiculosResponse.data.length, icon: "Car.png" },
          { label: "Funcionários", value: funcionariosResponse.data.length, icon: "PeopleTeam.png" },
        ]);

        setVeiculos(veiculosResponse.data);
        setClientes(clientesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchCounts();
  }, []);

  // Headers das tabelas
  const headers1 = [
    { label: "Veículos", key: "nome" },
    { label: "Tipo", key: "tipo" },
    { label: "Status", key: "status" },
  ];

  const headers2 = [
    { label: "Clientes", key: "clientes" },
    { label: "Quantidade Veículos", key: "quantidadeVeiculos" },
  ];

  // Dados das tabelas usando as informações das APIs
  const tableVeiculosData = veiculos.map((item: any) => ({
    id: item.id,
    nome: item.nome || item.modelo, // Ajuste conforme a estrutura da API
    tipo: item.tipo,
    status: item.status,
  }));

  const tableClientesData = clientes.map((item: any) => ({
    clientes: item.nome,
    quantidadeVeiculos: item.veiculos?.length || 0, // Supondo que a API retorna uma lista de veículos
  }));

  const osSummary = [
    { label: "O.S Atrasadas", value: 3, color: "#F44336" },
    { label: "O.S em Andamento", value: 15, color: "#FF9800" },
    { label: "O.S Concluídas Hoje", value: 10, color: "#4CAF50" },
  ];

  const lastActivities = [
    { label: "Última O.S Criada", value: "O.S #1023 - Toyota Corolla", color: "#FF9800" },
    { label: "Último Cliente Cadastrado", value: "Carlos Silva", color: "#4CAF50" },
    { label: "Último Veículo Cadastrado", value: "Yamaha MT-07", color: "#2196F3" },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#E9E9E9",
      }}
    >
      {/* Cards Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "35px",
              backgroundColor: "#08005B",
              color: "white",
              boxShadow: "0px 4px 0px #1500FF",
              padding: "20px",
              height: "120px",
            }}
          >
            <img
              src={card.icon}
              alt={card.label}
              style={{
                marginRight: "100px",
                width: "90px",
                height: "90px",
              }}
            />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: "bold",
                  lineHeight: "1",
                }}
              >
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "150px",
        }}
      >
        <TabelaSimples headers={headers1} data={tableVeiculosData} rowsPerPage={5} />
        <TabelaSimples headers={headers2} data={tableClientesData} rowsPerPage={5} />
      </div>

      {/* O.S Summary Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {osSummary.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "35px",
              backgroundColor: "#08005B",
              color: "white",
              padding: "20px",
              boxShadow: "0px 4px 0px #1500FF",
              height: "120px",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
              {item.label}
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: item.color,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Últimas Atividades */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {lastActivities.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "35px",
              backgroundColor: "#08005B",
              color: "white",
              padding: "20px",
              boxShadow: "0px 4px 0px #1500FF",
              height: "120px",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
              {item.label}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: item.color,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
