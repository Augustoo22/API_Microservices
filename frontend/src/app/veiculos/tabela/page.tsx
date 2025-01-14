import React from "react";
import TabelaComponente from "../../../components/TabelaComponente";
import Link from "next/link";
import Button from "@mui/material/Button"; // Importação do Button

const App: React.FC = () => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Veículo", key: "veiculo" },
    { label: "Placa", key: "placa" },
    { label: "Tipo", key: "tipo" },
    { label: "Status", key: "status" },
    { label: "Data de Entrada", key: "dataEntrada" },
  ];

  const data = [
    {
      id: 1,
      veiculo: "Toyota Corolla",
      placa: "ABC-1234",
      tipo: "Sedan",
      status: "Em manutenção",
      dataEntrada: "10/01/2025",
    },
    {
      id: 2,
      veiculo: "Honda Civic",
      placa: "DEF-5678",
      tipo: "Sedan",
      status: "Finalizado",
      dataEntrada: "08/01/2025",
    },
    {
      id: 3,
      veiculo: "Ford Ranger",
      placa: "GHI-9012",
      tipo: "Caminhonete",
      status: "Pendente",
      dataEntrada: "12/01/2025",
    },
    {
      id: 4,
      veiculo: "Volkswagen Golf",
      placa: "JKL-3456",
      tipo: "Hatch",
      status: "Em manutenção",
      dataEntrada: "11/01/2025",
    },
    {
      id: 5,
      veiculo: "Chevrolet Onix",
      placa: "MNO-7890",
      tipo: "Hatch",
      status: "Finalizado",
      dataEntrada: "09/01/2025",
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
        <h1 style={{ color: "#08005B" }}>Gerenciamento de Veículos</h1>
        <TabelaComponente headers={headers} data={data} rowsPerPage={5} />
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
