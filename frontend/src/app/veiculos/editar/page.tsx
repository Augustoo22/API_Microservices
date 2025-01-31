"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import api from "../../../config/axiosConfigCliente";
import apiVeiculos from "../../../config/axiosConfigVeiculos";

const theme = createTheme({
  palette: {
    primary: { main: "#08005B" },
    secondary: { main: "#08005B" },
  },
});

export default function EditarVeiculos() {
  const [id, setId] = useState("");
  const [veiculos, setVeiculos] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    marca: "",
    placa: "",
    tipo: "",
    status: "",
    anoFabricacao: "",
    dataEntrada: "",
    previsao: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
    setId("");
    setFormData({
      nome: "",
      marca: "",
      placa: "",
      tipo: "",
      status: "",
      anoFabricacao: "",
      dataEntrada: "",
      previsao: "",
    });
  };

  const handleFetchVeiculo = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiVeiculos.get(`/api/veiculos/${id}`);
      const veiculo = response.data;

      setFormData({
        nome: veiculo.nome,
        marca: veiculo.marca,
        placa: veiculo.placa,
        tipo: veiculo.tipo,
        status: veiculo.status,
        anoFabricacao: veiculo.anoFabricacao,
        dataEntrada: veiculo.dataEntrada,
        previsao: veiculo.previsao,
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar veículo:", error);
      alert("Erro ao buscar veículo. Verifique o ID e tente novamente.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido para editar o veículo.");
      return;
    }

    const payload = {
      ...formData,
    };

    console.log("Payload sendo enviado:", payload);

    try {
      const response = await apiVeiculos.put(`/api/veiculos/${id}`, payload);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao editar veículo:", error);
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
          <h1 style={{ textAlign: "left", color: "#08005B" }}>Editar Veículo</h1>

          <TextField
            label="ID Veículo"
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
            onClick={handleFetchVeiculo}
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>

          <TextField
            label="Nome"
            name="nome"
            variant="outlined"
            fullWidth
            value={formData.nome}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Marca"
            name="marca"
            variant="outlined"
            fullWidth
            value={formData.marca}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Placa"
            name="placa"
            variant="outlined"
            fullWidth
            value={formData.placa}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Tipo"
            name="tipo"
            variant="outlined"
            select
            fullWidth
            value={formData.tipo}
            onChange={handleInputChange}
            sx={muiStyles}
          >
            <MenuItem value="Carro">Carro</MenuItem>
            <MenuItem value="Moto">Moto</MenuItem>
            <MenuItem value="Caminhão">Caminhão</MenuItem>
          </TextField>

          <TextField
            label="Status"
            name="status"
            variant="outlined"
            select
            fullWidth
            value={formData.status}
            onChange={handleInputChange}
            sx={muiStyles}
          >
            <MenuItem value="Ativo">Manutenção</MenuItem>
            <MenuItem value="Inativo">Espera</MenuItem>
            <MenuItem value="Ativo">Liberado</MenuItem>
          </TextField>

          <TextField
            label="Ano Fabricação"
            name="anoFabricacao"
            variant="outlined"
            fullWidth
            value={formData.anoFabricacao}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <TextField
              label="Data Entrada"
              name="dataEntrada"
              type="date"
              variant="outlined"
              fullWidth
              value={formData.dataEntrada}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              sx={muiStyles}
            />
            <TextField
              label="Previsão"
              name="previsao"
              type="date"
              variant="outlined"
              fullWidth
              value={formData.previsao}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              sx={muiStyles}
            />
          </Box>

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
          <Link href="/veiculos" passHref>
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
          <Link href="/veiculos/tabela" passHref>
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
              Tabela
            </Button>
          </Link>
          <Link href="/veiculos/cadastro" passHref>
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
