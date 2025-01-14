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

export default function CadastroClientes() {
  const [quantidadeVeiculos, setQuantidadeVeiculos] = useState(1); // Estado para quantidade de veículos
  const [veiculosSelecionados, setVeiculosSelecionados] = useState({}); // Estado para os veículos adicionais

  // Função para atualizar os veículos selecionados dinamicamente
  const handleVeiculoChange = (index, value) => {
    setVeiculosSelecionados((prevState) => ({
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
          <h1 style={{textAlign: "left", color: "#08005B" }}>Cadastro Clientes</h1>

          <TextField
            label="Nome Cliente"
            variant="outlined"
            fullWidth
            sx={{
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
            }}
          />

          <TextField
            label="CPF"
            variant="outlined"
            fullWidth
            sx={{
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
            }}
          />

          <TextField
            label="Data Nascimento"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
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
            }}
          />

          <TextField
            label="Quantidade Veículos"
            select
            variant="outlined"
            fullWidth
            value={quantidadeVeiculos}
            onChange={(e) => setQuantidadeVeiculos(parseInt(e.target.value))}
            sx={{
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
            }}
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
              sx={{
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
              }}
            >
              {/* Adicione as opções reais aqui */}
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
              sx={{
                borderColor: "#08005B",
                color: "#08005B",
                padding: "12px 24px",
                fontSize: "16px",
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
            >
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
      </Box>
    </ThemeProvider>
  );
}
