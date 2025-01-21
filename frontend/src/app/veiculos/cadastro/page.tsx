'use client';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import apiapiVeiculos from "../../../config/axiosConfigVeiculos";

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

export default function CadastroVeiculos() {
  // Estados controlados
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [previsao, setPrevisao] = useState("");

  const handleClear = () => {
    setNome("");
    setMarca("");
    setPlaca("");
    setTipo("");
    setStatus("");
    setAnoFabricacao("");
    setDataEntrada("");
    setPrevisao("");
  };

  const handleSubmit = async () => {
    const payload = {
      nome,
      marca,
      placa,
      tipo,
      status,
      anoFabricacao,
      dataEntrada,
      previsao,
    };

    console.log("Payload sendo enviado:", payload);

    try {
      const response = await apiapiVeiculos.post("/api/veiculos", payload);
      console.log("Veículo cadastrado com sucesso:", response.data);
      handleClear();
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
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
          <h1 style={{ textAlign: "left", color: "#08005B" }}>Cadastro Veículos</h1>

          <TextField
            label="Veículo"
            variant="outlined"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            sx={muiStyles}
          />
          <TextField
            label="Marca"
            variant="outlined"
            fullWidth
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            sx={muiStyles}
          />
          <TextField
            label="Placa"
            variant="outlined"
            fullWidth
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            sx={muiStyles}
          />
          <TextField
            label="Tipo"
            variant="outlined"
            select
            fullWidth
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            sx={muiStyles}
          >
            <MenuItem value="Carro">Carro</MenuItem>
            <MenuItem value="Moto">Moto</MenuItem>
            <MenuItem value="Caminhão">Caminhão</MenuItem>
          </TextField>
          <TextField
            label="Status"
            variant="outlined"
            select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={muiStyles}
          >
            <MenuItem value="Ativo">Manutenção</MenuItem>
            <MenuItem value="Inativo">Espera</MenuItem>
            <MenuItem value="Ativo">Liberado</MenuItem>
          </TextField>
          <TextField
            label="Ano Fabricação"
            variant="outlined"
            fullWidth
            value={anoFabricacao}
            onChange={(e) => setAnoFabricacao(e.target.value)}
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
              type="date"
              variant="outlined"
              fullWidth
              value={dataEntrada}
              onChange={(e) => setDataEntrada(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={muiStyles}
            />
            
            <TextField
              label="Previsão"
              type="date"
              variant="outlined"
              fullWidth
              value={previsao}
              onChange={(e) => setPrevisao(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={muiStyles}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
              marginLeft: "100px",
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
              Enviar
            </Button>
          </Box>
        </Box>
        <Link href="/veiculos" passHref>
          <Button variant="contained" sx={menuButtonStyles}>
            Menu
          </Button>
        </Link>
        <Link href="/veiculos/tabela" passHref>
          <Button variant="contained" sx={tabelaButtonStyles}>
            Tabela
          </Button>
        </Link>
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
    width: "150px",
    height: "50px",
  },
  contained: {
    backgroundColor: "#08005B",
    color: "#FFF",
    padding: "12px 24px",
    fontSize: "16px",
    width: "150px",
    height: "50px",
  },
};

const menuButtonStyles = {
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
};

const tabelaButtonStyles = {
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
};
