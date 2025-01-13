import React from "react";
import TabelaComponente from "../../../components/TabelaComponente";
import Link from "next/link";
import Button from "@mui/material/Button"; // Importação do Button

const App: React.FC = () => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Clientes", key: "clientes" },
    { label: "CPF", key: "cpf" },
    { label: "Data Nascimento", key: "dataNascimento" },
    { label: "Veículos", key: "veiculos" },
  ];

  const data = [
    {
      id: 1,
      clientes: "João Silva",
      cpf: "111.111.111-11",
      dataNascimento: "01/01/1980",
      veiculos: 2,
    },
    {
      id: 2,
      clientes: "Maria Oliveira",
      cpf: "222.222.222-22",
      dataNascimento: "02/02/1990",
      veiculos: 1,
    },
    {
      id: 3,
      clientes: "Pedro Santos",
      cpf: "333.333.333-33",
      dataNascimento: "03/03/1985",
      veiculos: 3,
    },
    {
      id: 4,
      clientes: "Ana Souza",
      cpf: "444.444.444-44",
      dataNascimento: "04/04/1995",
      veiculos: 0,
    },
    {
      id: 5,
      clientes: "Carlos Lima",
      cpf: "555.555.555-55",
      dataNascimento: "05/05/1975",
      veiculos: 2,
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
        <h1 style={{ color: "#08005B" }}>Gerenciamento de Clientes</h1>
        <TabelaComponente headers={headers} data={data} rowsPerPage={5} />
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
      </main>
    </div>
  );
};

export default App;
