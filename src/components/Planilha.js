import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Planilha() {
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
