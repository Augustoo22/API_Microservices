'use client';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";

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
  const [veiculo, setVeiculo] = useState("");
  const [marca, setMarca] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [previsao, setPrevisao] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#f5f5f5",
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
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
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
            label="Marca"
            variant="outlined"
            fullWidth
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
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
            label="Placa"
            variant="outlined"
            fullWidth
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
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
            label="Tipo"
            variant="outlined"
            select
            fullWidth
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
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
            <MenuItem value="Ativo">Ativo</MenuItem>
            <MenuItem value="Inativo">Inativo</MenuItem>
          </TextField>
          <TextField
            label="Ano Fabricação"
            variant="outlined"
            fullWidth
            value={anoFabricacao}
            onChange={(e) => setAnoFabricacao(e.target.value)}
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
            InputLabelProps={{
                shrink: true, // Isso garante que o label não sobreponha o valor
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
              label="Previsão"
              variant="outlined"
              fullWidth
              value={previsao}
              onChange={(e) => setPrevisao(e.target.value)}
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
              sx={{
                borderColor: "#08005B",
                color: "#08005B",
                padding: "12px 24px",
                fontSize: "16px",
                width: "150px",
                height: "50px",
                "&:hover": {
                  borderColor: "#08005B",
                  color: "#08005B",
                },
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
                width: "150px",
                height: "50px",
                "&:hover": {
                  backgroundColor: "#08005B",
                },
              }}
            >
              Enviar
            </Button>
          </Box>
        </Box>

        <Link href="/veiculos" passHref>
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
