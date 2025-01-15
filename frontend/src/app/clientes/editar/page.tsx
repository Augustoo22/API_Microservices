"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import api from "../../../config/axiosConfigCliente"; // Arquivo de configuração da API

const theme = createTheme({
  palette: {
    primary: { main: "#08005B" },
    secondary: { main: "#08005B" },
  },
});

type FormData = {
  nome: string;
  cpf: string;
  dataNascimento: string;
  veiculos: string[]; // Array para armazenar veículos
};

const EditarCliente: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Captura o ID da URL

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpf: "",
    dataNascimento: "",
    veiculos: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Carregar dados do cliente quando o ID estiver disponível
      const fetchCliente = async () => {
        try {
          const response = await api.get(`/api/clientes/${id}`);
          const cliente = response.data;
          setFormData({
            nome: cliente.nome,
            cpf: cliente.cpf,
            dataNascimento: cliente.dataNascimento,
            veiculos: cliente.veiculos || [],
          });
          setIsLoading(false);
        } catch (error) {
          console.error("Erro ao carregar dados do cliente:", error);
        }
      };

      fetchCliente();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.put(`/api/clientes/${id}`, formData);
      console.log("Cliente atualizado:", response.data);
      router.push("/clientes");
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E9E9E9",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "500px",
          }}
        >
          <h1 style={{ textAlign: "center", color: "#08005B" }}>Editar Cliente</h1>
          <TextField
            label="Nome"
            name="nome"
            variant="outlined"
            fullWidth
            value={formData.nome}
            onChange={handleInputChange}
          />
          <TextField
            label="CPF"
            name="cpf"
            variant="outlined"
            fullWidth
            value={formData.cpf}
            onChange={handleInputChange}
          />
          <TextField
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dataNascimento}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditarCliente;
