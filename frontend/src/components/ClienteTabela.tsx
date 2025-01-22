"use client"; // Adicione esta linha no topo do arquivo

import React, { useState, useEffect } from "react";
import { useRouter } from "next/compat/router";

type Header = {
  label: string;
  key: string;
};

type Props = {
  headers: Header[];
  data: Array<Record<string, string | number | undefined>>;
  rowsPerPage?: number;
  onDelete: (id: number) => void; // Função para apagar cliente
};

const ClienteTabela: React.FC<Props> = ({ headers, data, rowsPerPage = 5, onDelete }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isClient, setIsClient] = useState(false); // Estado para verificar se está no cliente
  const router = useRouter(); // Inicializando o router

  useEffect(() => {
    // Garantindo que o código só será executado no cliente
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Impede renderização no servidor
  }

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      <table
        style={{
          width: "950px",
          borderCollapse: "collapse",
          backgroundColor: "#FFFFFF",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  border: "1px solid #E9E9E9",
                  padding: "8px",
                  backgroundColor: "#08005B",
                  color: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                {header.label}
              </th>
            ))}
            <th
              style={{
                border: "1px solid #E9E9E9",
                padding: "8px",
                backgroundColor: "#08005B",
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={row.id !== undefined ? row.id : `row-${rowIndex}`}
              style={{
                backgroundColor: rowIndex % 2 === 0 ? "#FFFFFF" : "#08005B",
                color: rowIndex % 2 === 0 ? "#08005B" : "#FFFFFF",
              }}
            >
              {headers.map((header, index) => (
                <td
                  key={`cell-${rowIndex}-${index}`}
                  style={{
                    border: "1px solid #E9E9E9",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {row[header.key] !== undefined ? row[header.key] : "-"}
                </td>
              ))}
              <td
                style={{
                  border: "1px solid #E9E9E9",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <button
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? "#08005B" : "#FFFFFF",
                    color: rowIndex % 2 === 0 ? "#FFFFFF" : "#08005B",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    height: "45px",
                  }}
                  onClick={() => onDelete(row.id !== undefined ? row.id : 0)} // Verifica se o id está definido antes de usá-lo
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            marginRight: "8px",
            backgroundColor: "#08005B",
            color: "#FFFFFF",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            height: "35px",
            borderRadius: "15px",
          }}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            marginLeft: "8px",
            backgroundColor: "#08005B",
            color: "#FFFFFF",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            height: "35px",
            borderRadius: "15px",
          }}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ClienteTabela;
