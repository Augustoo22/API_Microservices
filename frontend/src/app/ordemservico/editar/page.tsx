"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import apiOrdemServico from "../../../config/axiosConfigOrdemServico";

const theme = createTheme({
  palette: {
    primary: { main: "#08005B" },
    secondary: { main: "#08005B" },
  },
});

export default function EditarOrdemServico() {
  const [id, setId] = useState("");
  const [quantidadeFuncionarios, setQuantidadeFuncionarios] = useState(1);
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState({});
  const [formData, setFormData] = useState({
    veiculo: "",
    servico: "",
    dataInicio: "",
    dataTermino: "",
    descricaoServico: "",
    statusOS: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFuncionarioChange = (index, value) => {
    setFuncionariosSelecionados((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const handleClear = () => {
    setId("");
    setFormData({
      veiculo: "",
      servico: "",
      dataInicio: "",
      dataTermino: "",
      descricaoServico: "",
      statusOS: "",
    });
    setFuncionariosSelecionados({});
    setQuantidadeFuncionarios(1);
  };

  const handleFetchOrdemServico = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiOrdemServico.get(`/api/ordemservico/${id}`);
      const ordemServico = response.data;

      setFormData({
        veiculo: ordemServico.veiculo,
        servico: ordemServico.servico,
        dataInicio: ordemServico.dataInicio,
        dataTermino: ordemServico.dataTermino,
        descricaoServico: ordemServico.descricaoServico,
        statusOS: ordemServico.statusOS,
      });

      setFuncionariosSelecionados(
        ordemServico.funcionarios.reduce((acc, funcionario, index) => {
          acc[index] = funcionario;
          return acc;
        }, {})
      );
      setQuantidadeFuncionarios(ordemServico.funcionarios.length || 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar Ordem de Serviço:", error);
      alert("Erro ao buscar Ordem de Serviço. Verifique o ID e tente novamente.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido para editar a Ordem de Serviço.");
      return;
    }

    const payload = {
      ...formData,
      funcionarios: Object.values(funcionariosSelecionados),
      quantidadeFuncionarios: quantidadeFuncionarios,
    };

    console.log("Payload sendo enviado:", payload);

    try {
      const response = await apiOrdemServico.put(`/api/ordemservico/${id}`, payload);
      console.log(response.data);
      alert("Ordem de Serviço editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar Ordem de Serviço:", error);
      alert("Erro ao editar Ordem de Serviço. Tente novamente.");
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
            Editar Ordem de Serviço
          </h1>

          <TextField
            label="ID Ordem de Serviço"
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
            onClick={handleFetchOrdemServico}
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>

          <TextField
            label="Veículo"
            name="veiculo"
            variant="outlined"
            fullWidth
            value={formData.veiculo}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Serviço"
            name="servico"
            variant="outlined"
            fullWidth
            value={formData.servico}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Data de Início"
            name="dataInicio"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dataInicio}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Data de Término"
            name="dataTermino"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dataTermino}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Descrição Serviço"
            name="descricaoServico"
            variant="outlined"
            fullWidth
            value={formData.descricaoServico}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Status O.S"
            name="statusOS"
            variant="outlined"
            fullWidth
            value={formData.statusOS}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Quantidade Funcionários"
            select
            variant="outlined"
            fullWidth
            value={quantidadeFuncionarios}
            onChange={(e) => setQuantidadeFuncionarios(parseInt(e.target.value, 10))}
            sx={muiStyles}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>

          {Array.from({ length: quantidadeFuncionarios }).map((_, index) => (
            <TextField
              key={index}
              label={`Funcionário ${index + 1}`}
              variant="outlined"
              fullWidth
              value={funcionariosSelecionados[index] || ""}
              onChange={(e) => handleFuncionarioChange(index, e.target.value)}
              sx={muiStyles}
            />
          ))}

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
          <Link href="/ordemservico" passHref>
            <Button variant="contained" sx={buttonStyles.contained}>
              Menu
            </Button>
          </Link>
          <Link href="/ordemservico/tabela" passHref>
            <Button variant="contained" sx={buttonStyles.contained}>
              Tabela
            </Button>
          </Link>
          <Link href="/ordemservico/cadastro" passHref>
            <Button variant="contained" sx={buttonStyles.contained}>
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
    "& fieldset": { borderColor: "#08005B" },
    "&:hover fieldset": { borderColor: "#08005B" },
    "&.Mui-focused fieldset": { borderColor: "#08005B" },
  },
  "& .MuiInputLabel-root": { color: "#08005B" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#08005B" },
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
