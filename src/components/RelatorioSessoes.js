import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable, useSortBy, useFilters } from "react-table";
import Excluir from "./excluir.png";
// import Confirmar from "./ok.png";

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

export default function Relatorio() {
  const [seats, setSeats] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);

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
        "https://h-simcepi.smsprefeiturasp.com.br/app01/caroldance/clientTicket/ticket",
        config
      )
      .then((response) => {
        setSeats(response.data.data); // Axios já faz o parse do JSON automaticamente
      })
      .catch((error) => {
        console.error("Erro ao buscar os assentos:", error);
      });

    if (shouldReload) {
      // Atualize a página para refletir as alterações
      window.location.reload();
    }
  }, [shouldReload]);

  const handleExcluir = (periodo, assentos) => {
    // Confirmar com o usuário antes de excluir
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir esta reserva?"
    );
    const body = {
      periodo: periodo,
      assentos: assentos,
    };
    if (confirmDelete) {
      axios
        .put(
          `https://h-simcepi.smsprefeiturasp.com.br/app01/caroldance/clientTicket/ticket/cancel`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const {
            data: { message, code },
          } = response;
          if (code === 200) {
            // Reserva excluída com sucesso
            alert(message);
            // Atualize a página para refletir as alterações
            setShouldReload(true);
          } else {
            alert(message);
          }
        })
        .catch((error) => {
          console.error(`Erro ao excluir:`, error);
        });
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Data",
        accessor: "Data",
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
        Header: "E-mail",
        accessor: "Email",
      },
      {
        Header: "Valor(R$)",
        accessor: "Valor",
        Cell: ({ value }) => `R$${value},00`,
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
      {
        Header: "Ações",
        Cell: ({ row }) => (
          <BoxAcoes>
            {row.original.Status === "pago" ? (
              ""
            ) : (
              <>
                <Icon
                  src={Excluir}
                  alt="Excluir Registro"
                  onClick={() =>
                    handleExcluir(
                      row.original.Sessao,
                      JSON.parse(row.original.Assento)
                    )
                  }
                />
              </>
            )}
          </BoxAcoes>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(
    () =>
      seats.filter(
        (seat) => seat.Status !== "CANCELADO" && seat.Status !== "PAGO"
      ),
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

const BoxAcoes = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Icon = styled.img`
  width: 25px;
  cursor: pointer;
  transition: transform 0.3s, filter 0.3s;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;
