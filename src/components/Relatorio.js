import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Excluir from "./excluir.png";
import Confirmar from "./ok.png";

export default function Relatorio() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get(
        "https://h-simcepi.smsprefeiturasp.com.br/go/ticket",
        config
      )
      .then((response) => {
        setSeats(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os assentos:", error);
      });
  }, []);

  const handleExcluir = (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir esta reserva?"
    );
    const body = {
      id
    };
    if (confirmDelete) {
      axios
        .put(
          `https://h-simcepi.smsprefeiturasp.com.br/go/ticket/cancel-purchase`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        )
        .then((response) => {
          const {
            data: { message, code },
          } = response;
          if (code === 200) {
            alert(message);
            window.location.reload();
          } else {
            alert(message);
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error(`Erro ao excluir:`, error);
        });
    }
  };

  const handleConfirmarPag = (id) => {
    const confirmPag = window.confirm(
      "Tem certeza de que deseja confirmar pagamento?"
    );

    const body = {
      id
    };

    if (confirmPag) {
      axios
        .put(
          `https://h-simcepi.smsprefeiturasp.com.br/go/ticket/confirm-purchase`,
          body
        )
        .then((response) => {
          const {
            data: { message, code },
          } = response;
          if (code === 200) {
            alert(message);
            window.location.reload();
          } else {
            alert(message);
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error(`Erro ao confirmar dados:`, error);
        });
    }
  };

  return (
    <SeatsContent>
      <div className="header">
        <h1>RELATÓRIO</h1>
        <h2>
          Abaixo a lista dos compradores aguardando confirmação de pagamento
        </h2>
      </div>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Data
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Nome
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Assento
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                E-mail
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Valor(R$)
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Aluna
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Sessão
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Status
              </th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {seats.filter(seat => seat.Status === "PENDENTE" || seat.Status === "APROVADO").map((seat, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {new Date(seat.Data).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.Nome}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.Assento.replace(/[\\[\]"]+/g, "")}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.Email}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    R${Number(seat.Valor)},00
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.Aluna}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.Sessao}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.Status}
                  </td>
                  <td>
                    <BoxAcoes>
                      {seat.Status === "APROVADO" ? (
                        ""
                      ) : (
                        <>
                          <img
                            src={Confirmar}
                            alt="Confirmação de Pagamento"
                            width={25}
                            onClick={() =>
                              handleConfirmarPag(seat.Id)
                            }
                            style={{ cursor: "pointer" }}
                          />
                          <img
                            src={Excluir}
                            alt="Excluir Registro"
                            width={25}
                            onClick={() =>
                              handleExcluir(seat.Id)
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </>
                      )}
                    </BoxAcoes>
                  </td>
                </tr>
              ))}
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
