import styled from "styled-components";
import Excluir from "./excluir.png";
import Confirmar from "./ok.png";

export default function teste() {
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
            <tr>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                TESTE
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                TESTE
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                TESTE
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                R$00,00
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                TESTE
              </td>
              <td>
                <BoxAcoes>
                  <>
                    <img
                      src={Confirmar}
                      alt="Confirmação de Pagamento"
                      width={50}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={Excluir}
                      alt="Excluir Registro"
                      width={50}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                </BoxAcoes>
              </td>
            </tr>
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
