"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import api from "../../../config/axiosFuncionario";

const theme = createTheme({
  palette: {
    primary: { main: "#08005B" },
    secondary: { main: "#08005B" },
  },
});

export default function EditarFuncionarios() {
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    cpf: "",
    cargo: "",
    dataNascimento: "",
    especialidade: "",
    anosExperiencia: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setId("");
    setFormData({
      nome: "",
      cpf: "",
      cargo: "",
      dataNascimento: "",
      especialidade: "",
      anosExperiencia: "",
    });
  };

  const handleFetchFuncionario = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get(`/api/funcionarios/${id}`);
      const funcionario = response.data;

      setFormData({
        nome: funcionario.nome,
        cpf: funcionario.cpf,
        cargo: funcionario.cargo,
        dataNascimento: funcionario.dataNascimento,
        especialidade: funcionario.especialidade,
        anosExperiencia: funcionario.anosExperiencia,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
      alert("Erro ao buscar funcionário. Verifique o ID e tente novamente.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido para editar o funcionário.");
      return;
    }

    try {
      const response = await api.put(`/api/funcionarios/${id}`, formData);
      setFormData({
        nome: "",
        cpf: "",
        cargo: "",
        dataNascimento: "",
        especialidade: "",
        anosExperiencia: "",
      });
        console.log(response.data);
    } catch (error) {
      console.error("Erro ao editar funcionário:", error);
      alert("Erro ao editar funcionário. Verifique os dados e tente novamente.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#E9E9E9",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "520px",
            marginLeft: "25px",
          }}
        >
          <h1 style={{ textAlign: "left", color: "#08005B" }}>
            Editar Funcionário
          </h1>

          <TextField
            label="ID Funcionário"
            name="id"
            variant="outlined"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
            sx={muiStyles}
          />

          <Button
            variant="outlined"
            sx={buttonStyles.outlined}
            onClick={handleFetchFuncionario}
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>

          <TextField
            label="Nome Completo"
            name="nome"
            variant="outlined"
            fullWidth
            value={formData.nome}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="CPF"
            name="cpf"
            variant="outlined"
            fullWidth
            value={formData.cpf}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Cargo"
            name="cargo"
            variant="outlined"
            fullWidth
            value={formData.cargo}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dataNascimento}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Especialidade"
            name="especialidade"
            variant="outlined"
            fullWidth
            value={formData.especialidade}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Anos de Experiência"
            name="anosExperiencia"
            variant="outlined"
            fullWidth
            value={formData.anosExperiencia}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <Button
              variant="outlined"
              sx={buttonStyles.outlined}
              onClick={handleClear}
            >
              Limpar
            </Button>

            <Button
              variant="contained"
              sx={buttonStyles.contained}
              onClick={handleSubmit}
            >
              Salvar
            </Button>
          </Box>
        </Box>
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            display: "flex",
            flexDirection: "row",
            gap: "16px",
          }}
        >
          <Link href="/funcionario" passHref>
            <Button
              variant="contained"
              sx={buttonStyles.contained}
            >
              Menu
            </Button>
          </Link>
          <Link href="/funcionario/tabela" passHref>
            <Button
              variant="contained"
              sx={buttonStyles.contained}
            >
              Tabela
            </Button>
          </Link>
          <Link href="/funcionario/cadastro" passHref>
            <Button
              variant="contained"
              sx={buttonStyles.contained}
            >
              Cadastro
            </Button>
          </Link>
        </div>
      </Box>
    </ThemeProvider>
  );
}

const muiStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#08005B",
    },
    "&:hover fieldset": {
      borderColor: "#08005B",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#08005B",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#08005B",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#08005B",
  },
};

const buttonStyles = {
  outlined: {
    borderColor: "#08005B",
    color: "#08005B",
    padding: "12px 24px",
    fontSize: "16px",
  },
  contained: {
    backgroundColor: "#08005B",
    color: "#FFF",
    padding: "12px 24px",
    fontSize: "16px",
  },
};
