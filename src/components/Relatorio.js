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
        "X-Requested-With": "XMLHttpRequest", // Adiciona o cabeçalho X-Requested-With
      },
    };

    // Faz uma chamada para o servidor backend para buscar os dados dos eventos usando Axios
    axios
      .get("https://h-simcepi.smsprefeiturasp.com.br/python/reservas", config)
      .then((response) => {
        setSeats(response.data); // O Axios já faz o parse do JSON automaticamente
      })
      .catch((error) => {
        console.error("Erro ao buscar os assentos:", error);
      });

    if (shouldReload) {
      // Atualize a página para refletir as alterações
      window.location.reload();
    }
  }, [shouldReload]);

  const handleExcluir = (id) => {
    // Confirmar com o usuário antes de excluir
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir esta reserva?"
    );
    const body = {
      id: id,
    };
    if (confirmDelete) {
      axios
        .delete(`https://h-simcepi.smsprefeiturasp.com.br/python/reservas`, {
          data: body,
        })
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
          console.error(`Erro ao excluir reserva com ID ${id}:`, error);
        });
    }
  };

  const handleConfirmarPag = (id) => {
    // Confirmar com o usuário antes
    const confirmPag = window.confirm(
      "Tem certeza de que deseja confirmar pagamento?"
    );

    const body = {
      id: id,
    };

    if (confirmPag) {
      axios
        .put(`https://h-simcepi.smsprefeiturasp.com.br/python/reservas`, body)
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
            console.error(`Erro ao confirmar pagamento ID ${id}.`);
          }
        })
        .catch((error) => {
          console.error(`Erro ao confirmar pagamento ID ${id}:`, error);
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
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>Data</th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>Nome</th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>Assento</th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>E-mail</th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>Valor(R$)</th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>Aluna</th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>Status</th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {seats
              .filter((seat) => seat.status !== "CANCELADO" && seat.status !== "PAGO")
              .map((seat, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.data_da_compra}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.nome}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.assentos.replace(/[\\[\]"]+/g, "")}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.email}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    R${seat.valor},00
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.aluna}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {seat.status}
                  </td>
                  <td>
                    <BoxAcoes>
                      {seat.status === "pago" ? (
                        ""
                      ) : (
                        <>
                          <img
                            src={Confirmar}
                            alt="Confirmação de Pagamento"
                            width={25}
                            onClick={() => handleConfirmarPag(seat.id)}
                            style={{ cursor: "pointer" }}
                          />
                          <img
                            src={Excluir}
                            alt="Excluir Registro"
                            width={25}
                            onClick={() => handleExcluir(seat.id)}
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
