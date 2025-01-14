import React from "react";
import TabelaComponente from "../../../components/TabelaComponente";
import Link from "next/link";
import Button from "@mui/material/Button";

const App: React.FC = () => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Serviço", key: "servico" },
    { label: "Data Início", key: "dataInicio" },
    { label: "Data Término", key: "dataTermino" },
    { label: "Status O.S.", key: "statusOs" },
  ];

  const data = [
    {
      id: 1,
      servico: "Troca de óleo",
      dataInicio: "10/01/2025",
      dataTermino: "12/01/2025",
      statusOs: "Finalizado",
    },
    {
      id: 2,
      servico: "Reparo de suspensão",
      dataInicio: "11/01/2025",
      dataTermino: "14/01/2025",
      statusOs: "Em andamento",
    },
    {
      id: 3,
      servico: "Troca de pneus",
      dataInicio: "15/01/2025",
      dataTermino: "15/01/2025",
      statusOs: "Finalizado",
    },
    {
      id: 4,
      servico: "Alinhamento e balanceamento",
      dataInicio: "16/01/2025",
      dataTermino: "16/01/2025",
      statusOs: "Pendente",
    },
    {
      id: 5,
      servico: "Troca de pastilhas de freio",
      dataInicio: "17/01/2025",
      dataTermino: "18/01/2025",
      statusOs: "Em andamento",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#E9E9E9",
      }}
    >
      <main
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "#08005B" }}>Gerenciamento de Ordens de Serviço</h1>
        <TabelaComponente headers={headers} data={data} rowsPerPage={5} />
        <Link href="/ordens-de-servico" passHref>
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
      </main>
    </div>
  );
};

export default App;
