import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

export default function FormUser({ selectedSeats, setBuyerData }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [aluna, setAluna] = useState("");
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

  async function confirmPurchase(e) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    const body = {
      name,
      cpf,
      email,
      aluna,
      idassentos: selectedSeats.map((seat) => seat.seatId),
      assentos: selectedSeats.map((seat) => seat.name),
      valor: selectedSeats.map((seat) => seat.valor),
    };

    setBuyerData({ ...body, ids: selectedSeats });

    const promise = await axios.post(
      "https://api-carol-dance-web-o5zr.vercel.app/reserva",
      body
    );

    if (promise.status === 200) {
      for (const seat of selectedSeats) {
        console.log(seat.seatId)
        try {
          await axios.post(
            `https://api-carol-dance-web-o5zr.vercel.app/assentos/${seat.seatId}/false`
          );
        } catch (error) {
          console.log(`Erro ao enviar idassento ${seat.seatId}: ${error.message}`);
          // Lide com erros individuais, se necessário
        }
      }

      navigate("/sucesso", { replace: true });
    } else {
      console.log(`Erro ao enviar a reserva: ${promise.status}`);
      // Lide com erros de reserva, se necessário
    }
  }

    // promise
    //   .catch((err) =>
    //     console.log(
    //       `Erro no envio dos dados da reserva do assentos, status: ${err.response.status}`
    //     )
    //   )
    //   .then((response) => navigate("/sucesso", { replace: true }));
  

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
      <InputContainer>
        <label htmlFor="aluna">Nome da Aluna:</label>
        <input
          id="aluna"
          value={aluna}
          placeholder="Digite o nome da Aluna..."
          onChange={(e) => setAluna(e.target.value)}
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
  margin-bottom: 100px;
  max-width: 1450px;
  gap: 10px;

  button {
    margin: 50px;
    padding: 10px 20px;
    background-color: #cd0077;
    border-radius: 4px;
    border: none;
    color: #ffffff;
    text-align: center;
    font-size: 18px;
    transition: background-color 0.3s ease; /* Adiciona uma transição suave para a mudança de cor */
  }

  button:hover {
    background-color: #ff1493; /* Define a cor de fundo quando o mouse passa por cima */
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 700;

  label {
    color: #000;
    margin-bottom: 8px;
  }

  input {
    padding: 10px 18px;
    font-size: 18px;
    border-radius: 10px;
    border: 1px solid #000;
    height: 50px;
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }

  input::-webkit-input-placeholder {
    font-size: 18px;
    color: #000;
  }

  input:-ms-input-placeholder {
    font-size: 18px;
    color: #000;
  }

  input::placeholder {
    font-size: 18px;
    color: #000;
  }
`;
