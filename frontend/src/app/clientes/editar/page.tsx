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

export default function EditarClientes() {
  const [id, setId] = useState("");
  const [quantidadeVeiculos, setQuantidadeVeiculos] = useState(1);
  const [veiculosSelecionados, setVeiculosSelecionados] = useState({});
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
  });
  const [veiculos, setVeiculos] = useState([]); // Lista de veículos para o Select
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

  const handleClear = () => {
    setId("");
    setFormData({ nome: "", cpf: "", dataNascimento: "" });
    setVeiculosSelecionados({});
    setQuantidadeVeiculos(1);
  };

  const handleFetchCliente = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get(`/api/clientes/${id}`);
      const cliente = response.data;

      setFormData({
        nome: cliente.nome,
        cpf: cliente.cpf,
        dataNascimento: cliente.dataNascimento,
      });

      setVeiculosSelecionados(
        cliente.veiculos.reduce((acc, veiculo, index) => {
          acc[index] = veiculo;
          return acc;
        }, {})
      );
      setQuantidadeVeiculos(cliente.veiculos.length || 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      alert("Erro ao buscar cliente. Verifique o ID e tente novamente.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido para editar o cliente.");
      return;
    }

    const payload = {
      ...formData,
      veiculos: Object.values(veiculosSelecionados),
      quantidadeVeiculos: quantidadeVeiculos,
    };

    console.log("Payload sendo enviado:", payload);

    try {
      const response = await api.put(`/api/clientes/${id}`, payload);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
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
          <h1 style={{ textAlign: "left", color: "#08005B" }}>Editar Cliente</h1>

          <TextField
            label="ID Cliente"
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
            onClick={handleFetchCliente}
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>

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
              {veiculos.map((veiculo) => (
                <MenuItem key={veiculo.id} value={veiculo.id}>
                  {`${veiculo.nome} - ${veiculo.placa}`}
                </MenuItem>
              ))}
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
              onClick={handleClear}
            >
              Limpar
            </Button>

            <Button variant="contained" sx={buttonStyles.contained} onClick={handleSubmit}>
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
    <Link href="/clientes" passHref>
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
    <Link href="/clientes/tabela" passHref>
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
    <Link href="/clientes/cadastro" passHref>
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
