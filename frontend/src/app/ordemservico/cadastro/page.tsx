"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiFuncionarios from "../../../config/axiosFuncionario";
import apiVeiculos from "../../../config/axiosConfigVeiculos";
import apiOrdemServico from "../../../config/axiosConfigOrdemServico";
import Link from "next/link";

const theme = createTheme({
  palette: {
    primary: { main: "#08005B" },
    secondary: { main: "#08005B" },
  },
});

export default function CadastroOrdemServico() {
  const [formData, setFormData] = useState({
    servico: "",
    dataInicio: "",
    dataTermino: "",
    descricao: "",
    status: "true",
    quantidadeFuncionario: 0,
    funcionariosSelecionados: [],
    veiculoSelecionado: null,
  });

  const [funcionarios, setFuncionarios] = useState([]);
  const [veiculos, setVeiculos] = useState([]);

  // Carrega dados de funcionários e veículos na montagem do componente
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await apiFuncionarios.get("/api/funcionarios");
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    const fetchVeiculos = async () => {
      try {
        const response = await apiVeiculos.get("/api/veiculos");
        setVeiculos(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };

    fetchFuncionarios();
    fetchVeiculos();
  }, []);

  // Lida com alterações nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Atualiza funcionários selecionados
  const handleFuncionarioChange = (index, value) => {
    const updatedFuncionarios = [...formData.funcionariosSelecionados];
    updatedFuncionarios[index] = value;
    setFormData((prev) => ({
      ...prev,
      funcionariosSelecionados: updatedFuncionarios,
    }));
  };

  // Limpa o formulário
  const handleClear = () => {
    setFormData({
      servico: "",
      dataInicio: "",
      dataTermino: "",
      descricao: "",
      status: "true",
      quantidadeFuncionario: 0,
      funcionariosSelecionados: [],
      veiculoSelecionado: null,
    });
  };

  // Envia o formulário
  const handleSubmit = async () => {
    try {
      const statusFinal = formData.status === "true"; // 'true' ou 'false' vindo do formulário será convertido em booleano
      const dataInicioFormatada = new Date(formData.dataInicio).toISOString();
      const dataTerminoFormatada = new Date(formData.dataTermino).toISOString();

      // Extraímos apenas os nomes dos funcionários selecionados
      const funcionariosSelecionados = formData.funcionariosSelecionados
        .map((id) => {
          const funcionario = funcionarios.find((f) => f.id === id);
          return funcionario ? funcionario.nome : null;
        })
        .filter(Boolean); // Remove valores nulos

      // Extraímos apenas as placas dos veículos selecionados
      const veiculosSelecionados = formData.veiculoSelecionado
        ? [formData.veiculoSelecionado]
        : [];

      const payload = {
        servico: formData.servico,
        dataInicio: dataInicioFormatada,
        dataTermino: dataTerminoFormatada,
        descricao: formData.descricao,
        status: statusFinal, // Usando o valor booleano
        quantidadeFuncionario: parseInt(formData.quantidadeFuncionario, 10),
        funcionarios: funcionariosSelecionados, // Array de nomes
        veiculos: veiculosSelecionados, // Array de placas
      };

      console.log("Payload enviado:", payload);

      const response = await apiOrdemServico.post("/api/ordensServico", payload);
      console.log("Ordem de Serviço cadastrada com sucesso:", response.data);
      handleClear();
    } catch (error) {
      console.error("Erro ao cadastrar Ordem de Serviço:", error);
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
          <h1 style={{ textAlign: "left", color: "#08005B" }}>Cadastro de Ordem de Serviço</h1>

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

          {/* Descrição */}
          <TextField
            label="Descrição"
            name="descricao"
            variant="outlined"
            fullWidth
            value={formData.descricao}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          {/* Status */}
          <TextField
            label="Status"
            name="status"
            select
            variant="outlined"
            fullWidth
            value={formData.status}
            onChange={handleInputChange}
            sx={muiStyles}
          >
            <MenuItem value="true">Aberta</MenuItem>
            <MenuItem value="false">Fechada</MenuItem>
          </TextField>

          {/* Funcionários */}
          <TextField
            label="Quantidade de Funcionários"
            name="quantidadeFuncionario"
            type="number"
            variant="outlined"
            fullWidth
            value={formData.quantidadeFuncionario}
            onChange={handleInputChange}
            sx={muiStyles}
          />
          {Array.from({ length: formData.quantidadeFuncionario }).map((_, index) => (
            <TextField
              key={index}
              label={`Funcionário ${index + 1}`}
              select
              variant="outlined"
              fullWidth
              value={formData.funcionariosSelecionados[index] || ""}
              onChange={(e) => handleFuncionarioChange(index, e.target.value)}
              sx={muiStyles}
            >
              {funcionarios.map((funcionario) => (
                <MenuItem key={funcionario.id} value={funcionario.id}>
                  {`${funcionario.nome} - ${funcionario.cpf}`}
                </MenuItem>
              ))}
            </TextField>
          ))}

          {/* Veículo */}
          <TextField
            label="Veículo"
            name="veiculoSelecionado"
            select
            variant="outlined"
            fullWidth
            value={formData.veiculoSelecionado || ""}
            onChange={handleInputChange}
            sx={muiStyles}
          >
            {veiculos.map((veiculo) => (
              <MenuItem key={veiculo.id} value={veiculo.id}>
                {`${veiculo.nome} - ${veiculo.placa}`}
              </MenuItem>
            ))}
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
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            display: "flex",
            gap: "24px",
          }}
        >
          <Link href="/ordemservico" passHref>
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
          <Link href="/ordemservico/tabela" passHref>
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
          <Link href="/ordemservico/editar" passHref>
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

// Estilos reutilizáveis
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