"use client"; // Adicione esta linha no início do arquivo

import React, { useState } from "react";

type Header = {
  label: string;
  key: string;
};

type Props = {
  headers: Header[];
  data: Array<Record<string, string | number | undefined>>;
  rowsPerPage?: number;
  onDelete: (id: number) => void;  // Função para apagar cliente
};

type Filters = {
  filter1: string;
  filter2: string;
};

const TabelaComponente: React.FC<Props> = ({ headers, data, rowsPerPage = 5, onDelete }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>({ filter1: "", filter2: "" });

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = data.filter(
    (row) =>
      row[headers[1].key]?.toString().toLowerCase().includes(filters.filter1.toLowerCase()) &&
      row[headers[2].key]?.toString().toLowerCase().includes(filters.filter2.toLowerCase())
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      {/* Filtros */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          name="filter1"
          placeholder={headers[1].label}
          value={filters.filter1}
          onChange={handleFilterChange}
          style={{ padding: "5px", marginRight: "10px", border: "3px solid #08005B", borderRadius:"10px", height: "20px" }}
        />
        <input
          type="text"
          name="filter2"
          placeholder={headers[2].label}
          value={filters.filter2}
          onChange={handleFilterChange}
          style={{ padding: "5px", border: "3px solid #08005B", borderRadius:"10px", height: "20px" }}
        />
      </div>

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
              key={row.id ? row.id : `row-${rowIndex}`}
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
                  {row[header.key]}
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
                    marginRight: "8px",
                    backgroundColor: rowIndex % 2 === 0 ? "#08005B" : "#FFFFFF",
                    color: rowIndex % 2 === 0 ? "#FFFFFF" : "#08005B",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    height: "45px",
                  }}
                  onClick={() => console.log("Editar", row.id)}
                >
                  Editar
                </button>
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
                  onClick={() => onDelete(row.id)} // Chama a função de deleção
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

export default TabelaComponente;
