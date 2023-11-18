import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Relatorio() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Cria a configuração dos cabeçalhos para o Axios
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest", // Adiciona o cabeçalho X-Requested-With
      },
    };

    // Faz uma chamada para o servidor backend para buscar os dados dos eventos usando Axios
    axios
      .get("https://api-carol-dance-web-o5zr.vercel.app/reservas", config)
      .then((response) => {
        setSeats(response.data); // O Axios já faz o parse do JSON automaticamente
      })
      .catch((error) => {
        console.error("Erro ao buscar os assentos:", error);
      });
  }, []);

  return (
    <SeatsContent>
      <div className="header">
        <h1>RELATÓRIO</h1>
        <h2>Abaixo a lista dos compradores aguardando pagamento</h2>
      </div>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Assento</th>
              <th>E-mail</th>
              <th>Valor(R$)</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {seats.map((seat, index) => (
              <tr key={index}>
                <td>{seat.name}</td>
                <td>{seat.assentos}</td>
                <td>{seat.email}</td>
                <td>R${seat.valor},00</td>
                <td>{seat.status}</td>
                <td></td>
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
