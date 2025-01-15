'use client';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import api from "../../../config/axiosConfigCliente";

const theme = createTheme({
  palette: {
    primary: { main: "#08005B" },
    secondary: { main: "#08005B" },
  },
});

export default function CadastroClientes() {
  const [quantidadeVeiculos, setQuantidadeVeiculos] = useState(1);
  const [veiculosSelecionados, setVeiculosSelecionados] = useState({});
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
  });

  const handleVeiculoChange = (index, value) => {
    setVeiculosSelecionados((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      veiculos: Object.values(veiculosSelecionados),
      quantidadeVeiculos: quantidadeVeiculos, // Garantindo que quantidadeVeiculos está no payload
    };

    console.log("Payload sendo enviado:", payload); // Verifique o valor do payload aqui

    try {
      const response = await api.post("/api/clientes", payload);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
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
          <h1 style={{ textAlign: "left", color: "#08005B" }}>Cadastro Clientes</h1>

          <TextField
            label="Nome Cliente"
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
            label="Data Nascimento"
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
            label="Quantidade Veículos"
            select
            variant="outlined"
            fullWidth
            value={quantidadeVeiculos}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              console.log("Quantidade de veículos selecionados:", value); // Verifique o valor da quantidade
              setQuantidadeVeiculos(value);
            }}
            sx={muiStyles}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>

          {Array.from({ length: quantidadeVeiculos }).map((_, index) => (
            <TextField
              key={index}
              label={`Veículo ${index + 1}`}
              select
              variant="outlined"
              fullWidth
              value={veiculosSelecionados[index] || ""}
              onChange={(e) => handleVeiculoChange(index, e.target.value)}
              sx={muiStyles}
            >
              <MenuItem value="Carro A">Carro A</MenuItem>
              <MenuItem value="Carro B">Carro B</MenuItem>
              <MenuItem value="Moto C">Moto C</MenuItem>
            </TextField>
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
              onClick={() => {
                setFormData({ nome: "", cpf: "", dataNascimento: "" });
                setVeiculosSelecionados({});
                setQuantidadeVeiculos(1);
              }}
            >
              Limpar
            </Button>

            <Button variant="contained" sx={buttonStyles.contained} onClick={handleSubmit}>
              Enviar
            </Button>
          </Box>
        </Box>
        <Link href="/clientes" passHref>
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
        <Link href="/clientes/tabela" passHref>
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
  },
  contained: {
    backgroundColor: "#08005B",
    color: "#FFF",
    padding: "12px 24px",
    fontSize: "16px",
  },
};
