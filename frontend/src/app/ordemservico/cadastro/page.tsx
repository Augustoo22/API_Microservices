"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import api from "../../../config/axiosConfigOrdemServico"; // Configuração para Ordem de Serviço
import apiVeiculos from "../../../config/axiosConfigVeiculos"; // Configuração para Veículos

const theme = createTheme({
  palette: {
    primary: { main: "#08005B" },
    secondary: { main: "#08005B" },
  },
});

export default function CadastroOrdemServico() {
  const [formData, setFormData] = useState({
    veiculo: "", // ID do veículo
    servico: "",
    dataInicio: "",
    dataTermino: "",
    descricaoServico: "",
    statusOS: "",
  });
  const [veiculos, setVeiculos] = useState([]); // Lista de veículos para o Select

  useEffect(() => {
    // Função para buscar os veículos cadastrados
    const fetchVeiculos = async () => {
      try {
        const response = await apiVeiculos.get("/api/veiculos");
        setVeiculos(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };

    fetchVeiculos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      veiculo: "",
      servico: "",
      dataInicio: "",
      dataTermino: "",
      descricaoServico: "",
      statusOS: "",
    });
  };

  const handleSubmit = async () => {
    try {
      // Certifique-se de que `veiculo` está como ID
      const payload = {
        ...formData,
        veiculo: parseInt(formData.veiculo, 10), // Converte para número, se necessário
      };

      console.log("Enviando dados para o backend:", payload);

      const response = await api.post("/api/ordemServico", payload);
      console.log("Ordem de serviço cadastrada:", response.data);
      handleClear(); 
    } catch (error) {
      console.error("Erro ao cadastrar ordem de serviço:", error);
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
          <h1 style={{ textAlign: "left", color: "#08005B" }}>Cadastro Ordem de Serviço</h1>

          {/* Veículo */}
          <TextField
            label="Veículo"
            name="veiculo"
            select
            variant="outlined"
            fullWidth
            value={formData.veiculo}
            onChange={handleInputChange}
            sx={muiStyles}
          >
            {veiculos.map((veiculo) => (
              <MenuItem key={veiculo.id} value={veiculo.id}>
                {`${veiculo.nome} - ${veiculo.placa}`}
              </MenuItem>
            ))}
          </TextField>

          {/* Serviço */}
          <TextField
            label="Serviço"
            name="servico"
            variant="outlined"
            fullWidth
            value={formData.servico}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          {/* Data de Início */}
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

          {/* Data de Término */}
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

          {/* Descrição do Serviço */}
          <TextField
            label="Descrição do Serviço"
            name="descricaoServico"
            variant="outlined"
            fullWidth
            value={formData.descricaoServico}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          {/* Status */}
          <TextField
            label="Status O.S."
            name="statusOS"
            select
            variant="outlined"
            fullWidth
            value={formData.statusOS}
            onChange={handleInputChange}
            sx={muiStyles}
          >
            <MenuItem value="Pendente">Pendente</MenuItem>
            <MenuItem value="Em andamento">Em andamento</MenuItem>
            <MenuItem value="Concluído">Concluído</MenuItem>
          </TextField>

          {/* Botões */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <Button variant="outlined" sx={buttonStyles.outlined} onClick={handleClear}>
              Limpar
            </Button>
            <Button variant="contained" sx={buttonStyles.contained} onClick={handleSubmit}>
              Enviar
            </Button>
          </Box>
        </Box>
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
