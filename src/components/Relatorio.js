import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Excluir from "./excluir.png";
import Confirmar from "./ok.png";

export default function Relatorio() {
  const [seats, setSeats] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    // Cria a configuração dos cabeçalhos para o Axios
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Faz uma chamada para o servidor backend para buscar os dados dos eventos usando Axios
    axios
      .get(
        "https://greenyellow-owl-992918.hostingersite.com/clientTicket/ticket",
        config
      )
      .then((response) => {
        setSeats(response.data.data); // O Axios já faz o parse do JSON automaticamente
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
      assentos: assentos
    };
    if (confirmDelete) {
      axios
        .put(
          `https://greenyellow-owl-992918.hostingersite.com/clientTicket/ticket/cancel`,
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

  const handleConfirmarPag = (periodo, assentos) => {
    // Confirmar com o usuário antes
    const confirmPag = window.confirm(
      "Tem certeza de que deseja confirmar pagamento?"
    );

    const body = {
      periodo: periodo,
      assentos: assentos
    };

    if (confirmPag) {
      axios
        .put(
          `https://greenyellow-owl-992918.hostingersite.com/clientTicket/ticket/confirm`,
          body
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
            console.error(
              `Erro ao confirmar dados.`,
              response.data.description
            );
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
            {seats
              .filter(
                (seat) => seat.Status !== "CANCELADO" && seat.Status !== "PAGO"
              )
              .map((seat, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.Data}
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
                    R${seat.Valor},00
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
                      {seat.Status === "pago" ? (
                        ""
                      ) : (
                        <>
                          <img
                            src={Confirmar}
                            alt="Confirmação de Pagamento"
                            width={25}
                            onClick={() =>
                              handleConfirmarPag(seat.Sessao, JSON.parse(seat.Assento))
                            }
                            style={{ cursor: "pointer" }}
                          />
                          {/* <img
                            src={Excluir}
                            alt="Excluir Registro"
                            width={25}
                            onClick={() =>
                              handleExcluir(seat.Sessao, JSON.parse(seat.Assento))
                            }
                            style={{ cursor: "pointer" }}
                          /> */}
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
