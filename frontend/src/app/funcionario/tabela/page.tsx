import React from "react";
import TabelaComponente from "../../../components/TabelaComponente";
import Link from "next/link";
import Button from "@mui/material/Button"; // Importação do Button

const App: React.FC = () => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Nome", key: "nome" },
    { label: "CPF", key: "cpf" },
    { label: "Cargo", key: "cargo" },
    { label: "Especialidade", key: "especialidade" },
    { label: "Anos de Experiência", key: "anosExperiencia" },
  ];

  const data = [
    {
      id: 1,
      nome: "José Silva",
      cpf: "111.111.111-11",
      cargo: "Mecânico",
      especialidade: "Motor",
      anosExperiencia: 10,
    },
    {
      id: 2,
      nome: "Ana Souza",
      cpf: "222.222.222-22",
      cargo: "Eletricista",
      especialidade: "Sistemas Elétricos",
      anosExperiencia: 8,
    },
    {
      id: 3,
      nome: "Pedro Santos",
      cpf: "333.333.333-33",
      cargo: "Mecânico",
      especialidade: "Suspensão",
      anosExperiencia: 12,
    },
    {
      id: 4,
      nome: "Maria Oliveira",
      cpf: "444.444.444-44",
      cargo: "Atendente",
      especialidade: "Atendimento ao Cliente",
      anosExperiencia: 6,
    },
    {
      id: 5,
      nome: "Carlos Lima",
      cpf: "555.555.555-55",
      cargo: "Gerente",
      especialidade: "Gestão de Equipe",
      anosExperiencia: 15,
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
        <h1 style={{ color: "#08005B" }}>Gerenciamento de Funcionários</h1>
        <TabelaComponente headers={headers} data={data} rowsPerPage={5} />
        <Link href="/funcionario" passHref>
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
        <Link href="/funcionario/cadastro" passHref>
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
