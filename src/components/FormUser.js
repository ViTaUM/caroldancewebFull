import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

export default function FormUser({ selectedSeats, setBuyerData }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Função para validar um e-mail usando regex
  function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  function formatCPF(cpfValue) {
    // Remove caracteres não numéricos
    const numericCpf = cpfValue.replace(/\D/g, "");

    // Aplica a máscara de CPF: XXX.XXX.XXX-XX
    return numericCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }

  function handleCpfChange(e) {
    const inputValue = e.target.value;

    // Remove todos os caracteres não numéricos
    const numericValue = inputValue.replace(/\D/g, "");

    // Limita o CPF a 11 dígitos
    if (numericValue.length <= 11) {
      setCpf(formatCPF(numericValue));
    }
  }

  function confirmPurchase(e) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    const body = {
      name,
      cpf,
      email,
      ids: selectedSeats.map((seat) => seat.seatId),
      valor: selectedSeats.map((seat) => seat.valor),
    };

    setBuyerData({ ...body, ids: selectedSeats });

    const promise = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      body
    );

    promise
      .catch((err) =>
        console.log(
          `Erro no envio dos dados da compra, status: ${err.response.status}`
        )
      )
      .then((response) => navigate("/sucesso", { replace: true }));
  }

  return (
    <Form onSubmit={confirmPurchase}>
      <InputContainer>
        <label htmlFor="name">Nome do Comprador:</label>
        <input
          id="name"
          value={name}
          placeholder="Digite seu nome..."
          onChange={(e) => setName(e.target.value)}
          required
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="cpf">CPF do comprador:</label>
        <input
          id="cpf"
          value={cpf}
          placeholder="Digite seu CPF..."
          onChange={handleCpfChange}
          required
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="cpf">E-mail para enviar os Ingressos:</label>
        <input
          id="email"
          value={email}
          placeholder="Digite seu E-mail..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </InputContainer>
      <button type="submit">Reservar Assento(s)</button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 42px;
  width: 100%;
  padding: 24px;

  button {
    margin: 50px;
    padding: 10px 20px;
    background-color: #CD0077;
    border-radius: 4px;
    border: none;
    color: #ffffff;
    text-align: center;
    font-size: 18px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 12px;
  font-size: 18px;

  label {
    color: #293845;
    margin-bottom: 8px;
  }

  input {
    padding: 10px 18px;
    font-size: 18px;
  }

  input::-webkit-input-placeholder {
    font-size: 18px;
    font-style: italic;
    color: #afafaf;
  }

  input:-ms-input-placeholder {
    font-size: 18px;
    font-style: italic;
    color: #afafaf;
  }

  input::placeholder {
    font-size: 18px;
    font-style: italic;
    color: #afafaf;
  }
`;
