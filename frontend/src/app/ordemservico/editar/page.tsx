"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import apiOrdemServico from "../../../config/axiosConfigOrdemServico";
import apiFuncionarios from "../../../config/axiosFuncionario";
import apiVeiculos from "../../../config/axiosConfigVeiculos";

const theme = createTheme({
  palette: {
    primary: { main: "#08005B" },
    secondary: { main: "#08005B" },
  },
});

export default function EditarOrdemServico() {
  const [id, setId] = useState("");
  const [quantidadeFuncionario, setQuantidadeFuncionario] = useState(1);
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState({});
  const [formData, setFormData] = useState({
    servico: "",
    dataInicio: "",
    dataTermino: "",
    descricao: "",
    status: true, // Alterado para booleano
    veiculos: "",
  });
  const [funcionariosSet, setFuncionariosSet] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await apiFuncionarios.get("/api/funcionarios");
        setFuncionariosSet(response.data);
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

  const handleFuncionarioChange = (index, value) => {
    setFuncionariosSelecionados((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      servico: "",
      dataInicio: "",
      dataTermino: "",
      descricao: "",
      status: true, // Alterado para booleano
      veiculos: "",
    });
    setFuncionariosSelecionados({});
    setQuantidadeFuncionario(1);
  };

  const handleFetchOrdemServico = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiOrdemServico.get(`/api/ordensServico/${id}`);
      const ordemServico = response.data;

      // Preencher os dados do formulário
      setFormData({
        servico: ordemServico.servico,
        dataInicio: ordemServico.dataInicio,
        dataTermino: ordemServico.dataTermino,
        descricao: ordemServico.descricao,
        status: ordemServico.status, // Esperando como booleano
        veiculos: ordemServico.veiculos || "", // ID do veículo
      });

      // Preencher os funcionários selecionados
      setFuncionariosSelecionados(
        ordemServico.funcionarios.reduce((acc, funcionario, index) => {
          acc[index] = funcionario.id;
          return acc;
        }, {})
      );

      // Atualizar a quantidade de funcionários
      setQuantidadeFuncionario(ordemServico.funcionarios.length || 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar ordem de serviço:", error);
      alert("Erro ao buscar ordem de serviço. Verifique o ID e tente novamente.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!id) {
      alert("Por favor, insira um ID válido para editar a ordem de serviço.");
      return;
    }

    const payload = {
      ...formData,
      status: formData.status === "true", // Convertendo para booleano
      funcionarios: Object.values(funcionariosSelecionados),
      quantidadeFuncionario: quantidadeFuncionario,
    };

    try {
      await apiOrdemServico.put(`/api/ordensServico/${id}`, payload);
      alert("Ordem de Serviço atualizada com sucesso.");
    } catch (error) {
      console.error("Erro ao editar ordem de serviço:", error);
      alert("Erro ao editar ordem de serviço. Tente novamente.");
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
            width: "600px",
            marginLeft: "25px",
          }}
        >
          <h1 style={{ textAlign: "left", color: "#08005B" }}>
            Editar Ordem de Serviço
          </h1>

          <TextField
            label="ID Ordem de Serviço"
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
            onClick={handleFetchOrdemServico}
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>

          <TextField
            label="Serviço"
            name="servico"
            variant="outlined"
            fullWidth
            value={formData.servico}
            onChange={handleInputChange}
            sx={muiStyles}
          />

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

          <TextField
            label="Descrição"
            name="descricao"
            variant="outlined"
            fullWidth
            value={formData.descricao}
            onChange={handleInputChange}
            sx={muiStyles}
          />

          <TextField
            label="Status"
            name="status"
            select
            variant="outlined"
            fullWidth
            value={formData.status ? "true" : "false"} // Convertendo para string
            onChange={handleInputChange}
            sx={muiStyles}
          >
            <MenuItem value="true">Aberta</MenuItem>
            <MenuItem value="false">Fechada</MenuItem>
          </TextField>

          <TextField
            label="Quantidade de Funcionários"
            name="quantidadeFuncionario"
            type="number"
            variant="outlined"
            fullWidth
            value={quantidadeFuncionario}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10) || 1;
              setQuantidadeFuncionario(value);
            }}
            sx={muiStyles}
          />

          {Array.from({ length: quantidadeFuncionario }).map((_, index) => (
            <TextField
              key={index}
              label={`Funcionário ${index + 1}`}
              select
              variant="outlined"
              fullWidth
              value={funcionariosSelecionados[index] || ""}
              onChange={(e) => handleFuncionarioChange(index, e.target.value)}
              sx={muiStyles}
            >
              {funcionariosSet.length > 0 ? (
                funcionariosSet.map((funcionario) => (
                  <MenuItem key={funcionario.id} value={funcionario.id}>
                    {`${funcionario.nome} - ${funcionario.cpf}`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Nenhum funcionário disponível</MenuItem>
              )}
            </TextField>
          ))}

          <TextField
            label="Veículo"
            name="veiculos"
            select
            variant="outlined"
            fullWidth
            value={formData.veiculos || ""}
            onChange={handleInputChange}
            sx={muiStyles}
          >
            {veiculos.length > 0 ? (
              veiculos.map((veiculo) => (
                <MenuItem key={veiculo.id} value={veiculo.id}>
                  {`${veiculo.nome} - ${veiculo.placa}`}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Nenhum veículo disponível</MenuItem>
            )}
          </TextField>

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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <Link href="/ordensServico" style={{ color: "#08005B" }}>
              Voltar
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const muiStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderRadius: "4px",
  },
};

const buttonStyles = {
  outlined: {
    color: "#08005B",
    borderColor: "#08005B",
  },
  contained: {
    backgroundColor: "#08005B",
    color: "white",
    "&:hover": {
      backgroundColor: "#08005B",
    },
  },
};
