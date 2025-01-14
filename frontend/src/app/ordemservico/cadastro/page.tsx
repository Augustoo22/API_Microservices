'use client';

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from 'next/link';

const theme = createTheme({
  palette: {
    primary: {
      main: "#08005B",
    },
    secondary: {
      main: "#08005B",
    },
  },
});

export default function CadastroOrdemServico() {
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

  // Função para manipular mudanças de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para atualizar os funcionários selecionados
  const handleFuncionarioChange = (index, value) => {
    setFuncionariosSelecionados((prevState) => ({
      ...prevState,
      [index]: value,
    }));
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
            Cadastro Ordem de Serviço
          </h1>

          {/* Veículo */}
          <TextField
            label="Veículo"
            name="veiculo"
            value={formData.veiculo}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            sx={textFieldStyles}
          />

          {/* Serviço */}
          <TextField
            label="Serviço"
            name="servico"
            value={formData.servico}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            sx={textFieldStyles}
          />

          {/* Data de Início */}
          <TextField
            label="Data de Início"
            name="dataInicio"
            type="date"
            value={formData.dataInicio}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />

          {/* Data de Término */}
          <TextField
            label="Data de Término"
            name="dataTermino"
            type="date"
            value={formData.dataTermino}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />

          {/* Descrição Serviço */}
          <TextField
            label="Descrição Serviço"
            name="descricaoServico"
            value={formData.descricaoServico}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            sx={textFieldStyles}
          />

          {/* Status O.S */}
          <TextField
            label="Status O.S"
            name="statusOS"
            value={formData.statusOS}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            sx={textFieldStyles}
          />

          {/* Quantidade de Funcionários */}
          <TextField
            label="Quantidade Funcionário"
            select
            value={quantidadeFuncionarios}
            onChange={(e) => setQuantidadeFuncionarios(parseInt(e.target.value))}
            variant="outlined"
            fullWidth
            sx={textFieldStyles}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>

          {/* Campos Dinâmicos para Funcionários */}
          {Array.from({ length: quantidadeFuncionarios }).map((_, index) => (
            <TextField
              key={index}
              label={`Funcionário ${index + 1}`}
              select
              value={funcionariosSelecionados[index] || ""}
              onChange={(e) => handleFuncionarioChange(index, e.target.value)}
              variant="outlined"
              fullWidth
              sx={textFieldStyles}
            >
              {/* Adicione as opções reais aqui */}
              <MenuItem value="Funcionario A">Funcionário A</MenuItem>
              <MenuItem value="Funcionario B">Funcionário B</MenuItem>
              <MenuItem value="Funcionario C">Funcionário C</MenuItem>
            </TextField>
          ))}

          {/* Botões */}
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
              sx={{
                borderColor: "#08005B",
                color: "#08005B",
                padding: "12px 24px",
                fontSize: "16px",
              }}
              onClick={() => {
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
              }}
            >
              Limpar
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#08005B",
                color: "#FFF",
                padding: "12px 24px",
                fontSize: "16px",
              }}
              onClick={() => console.log("Formulário enviado:", formData)}
            >
              Enviar
            </Button>
          </Box>
        </Box>
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
      </Box>
    </ThemeProvider>
  );
}

// Estilos reutilizáveis para TextFields
const textFieldStyles = {
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
