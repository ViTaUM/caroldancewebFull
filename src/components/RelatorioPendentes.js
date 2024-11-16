import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable, useSortBy, useFilters } from "react-table";

// Filtro de Coluna Padrão
function DefaultColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Buscar ${count} registros...`}
      style={{ width: "100%" }}
    />
  );
}

export default function RelatorioPendentes() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Configuração dos cabeçalhos para o Axios
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Chamada para o servidor backend para buscar os dados dos eventos usando Axios
    axios
      .get(
        "https://greenyellow-owl-992918.hostingersite.com/clientTicket/ticket",
        config
      )
      .then((response) => {
        setSeats(response.data.data); // Axios já faz o parse do JSON automaticamente
      })
      .catch((error) => {
        console.error("Erro ao buscar os assentos:", error);
      });
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Data",
        accessor: "Data",
        Cell: ({ value }) => formatDateTime(value),
      },
      {
        Header: "Nome",
        accessor: "Nome",
      },
      {
        Header: "Assento",
        accessor: "Assento",
      },
      {
        Header: "Estacionamento",
        accessor: "Estacionamento",
      },
      {
        Header: "Valor(R$)",
        accessor: "Valor",
        Cell: ({ row }) => {
          let valorTotal = parseInt(row.original.Valor);
          if (row.original.Estacionamento === "SIM") {
            valorTotal += 15; // Soma R$15,00 se estacionamento for SIM
          }
          return `R$${valorTotal},00`;
        },
      },
      {
        Header: "Aluna",
        accessor: "Aluna",
      },
      {
        Header: "Sessão",
        accessor: "Sessao",
      },
      {
        Header: "Status",
        accessor: "Status",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => seats.filter((seat) => seat.Status === "Pendente"),
    [seats]
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState: {
          sortBy: [
            {
              id: "Aluna", // Coluna que deseja ordenar
              desc: false, // false para ordem crescente
            },
          ],
        },
      },
      useFilters,
      useSortBy
    );

  return (
    <SeatsContent>
      <div className="header">
        <h1>RELATÓRIO</h1>
        <h2>
          Abaixo a lista dos compradores aguardando confirmação de pagamento
        </h2>
      </div>
      <TableContainer>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
    </SeatsContent>
  );
}

const SeatsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
  h1 {
    font-weight: bold;
    font-size: 24px;
  }
  h2 {
    font-size: 24px;
    color: #293845;
  }
  .header {
    justify-content: center;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const TableContainer = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
