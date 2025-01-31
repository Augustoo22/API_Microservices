"use client"; // Adicione esta linha no início do arquivo

import React, { useEffect, useState } from "react";
import TabelaComponente from "../../../components/TabelaComponente";
import Link from "next/link";
import Button from "@mui/material/Button";
import apiFuncionario from "../../../config/axiosFuncionario"; // Importa o Axios configurado

const App: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const headers = [
    { label: "ID", key: "id" },
    { label: "Nome", key: "nome" },
    { label: "CPF", key: "cpf" },
    { label: "Cargo", key: "cargo" },
    { label: "Especialidade", key: "especialidade" },
    { label: "Anos de Experiência", key: "anosExperiencia" },
  ];

  const handleDelete = async (id: number) => {
    try {
      await apiFuncionario.delete(`/api/funcionarios/${id}`);
      setFuncionarios(funcionarios.filter((funcionario) => funcionario.id !== id));
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFuncionario.get("/api/funcionarios");
        setFuncionarios(response.data); // Armazena os dados da API no estado
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

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
        <TabelaComponente
          headers={headers}
          data={funcionarios}
          rowsPerPage={5}
          onDelete={handleDelete}
        />
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            display: "flex",
            gap: "24px",
          }}
        >
          <Link href="/funcionario" passHref>
            <Button
              variant="contained"
              sx={{
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

          <Link href="/funcionario/editar" passHref>
            <Button
              variant="contained"
              sx={{
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
        </div>
      </main>
    </div>
  );
};

export default App;
