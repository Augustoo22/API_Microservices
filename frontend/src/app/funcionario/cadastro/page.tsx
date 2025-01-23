'use client';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import axios from "axios"; // Adicionado Axios para integração com o backend

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
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cargo: "",
    dataNascimento: "",
    especialidade: "",
    anosExperiencia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5050/api/funcionarios", formData); // URL do backend
      alert("Funcionário cadastrado com sucesso!");
      setFormData({
        nome: "",
        cpf: "",
        cargo: "",
        dataNascimento: "",
        especialidade: "",
        anosExperiencia: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error.response.data); // Exibe o erro retornado do backend
      alert("Erro ao cadastrar funcionário. Verifique os dados e tente novamente.");
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
            Cadastro de Funcionário
          </h1>

          <TextField
            label="Nome Completo"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
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
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
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
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
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
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
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
              name="especialidade"
              value={formData.especialidade}
              onChange={handleChange}
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
              name="anosExperiencia"
              value={formData.anosExperiencia}
              onChange={handleChange}
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
              onClick={() =>
                setFormData({
                  nome: "",
                  cpf: "",
                  cargo: "",
                  dataNascimento: "",
                  especialidade: "",
                  anosExperiencia: "",
                })
              }
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

            <Button variant="contained" onClick={handleSubmit}>
              Enviar
            </Button>
          </Box>
        </Box>

        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            display: "flex",
            gap: "24px", 
          }}
        >
          <Link href="/funcionario" passHref>
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
          <Link href="/funcionario/tabela" passHref>
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
          <Link href="/funcionario/editar" passHref>
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
              Editar
            </Button>
          </Link>
        </div>
      </Box>
    </ThemeProvider>
  );
}
