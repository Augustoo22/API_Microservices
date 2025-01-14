"use client";
import React, { useState } from "react";

type Header = {
  label: string;
  key: string;
};

type Props = {
  headers: Header[];
  data: Array<Record<string, string | number | undefined>>;
  rowsPerPage?: number;
};

const TabelaSimples: React.FC<Props> = ({ headers, data, rowsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

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
          width: "750px",
          borderCollapse: "collapse",
          backgroundColor: "#FFFFFF",
          borderRadius: "25px",
          overflow: "hidden",
          height: "300px"
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
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px", textAlign: "center", marginRight: "90px" }}>
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

export default TabelaSimples;
