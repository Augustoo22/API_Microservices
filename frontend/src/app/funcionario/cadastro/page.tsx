'use client'
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";

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

export default function CadastroFuncionario() {
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
            Cadastro de Funcionário
          </h1>

          <TextField
            label="Nome Completo"
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
            label="Cargo"
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
            variant="outlined"
            type="date"
            InputLabelProps={{
                shrink: true,
            }}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#08005B",
                },
                "&:hover fieldset": {
                  borderColor: "#4A00E0",
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

          {/* Campos lado a lado */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <TextField
              label="Especialidade"
              variant="outlined"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#08005B",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4A00E0",
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
              label="Anos Experiência"
              variant="outlined"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#08005B",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4A00E0",
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

          {/* Botões principais */}
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

        <Link href="/funcionario" passHref>
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
