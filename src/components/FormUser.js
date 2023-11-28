import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function FormUser({ selectedSeats, setBuyerData, avulso }) {
  const [nome, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [aluna, setAluna] = useState("");
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  useEffect(() => {
    // Cria a configuração dos cabeçalhos para o Axios
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest", // Adiciona o cabeçalho X-Requested-With
        // Exemplo: Adiciona um cabeçalho de autorização
        // 'Authorization': 'Bearer seu-token-aqui'
        // Adicione outros cabeçalhos conforme necessário
      },
    };

    // Faz uma chamada para o servidor backend para buscar os dados dos eventos usando Axios
    axios
      .get("https://h-simcepi.smsprefeiturasp.com.br/python/alunos", config)
      .then((response) => {
        setSeats(response.data); // O Axios já faz o parse do JSON automaticamente
      })
      .catch((error) => {
        console.error("Erro ao buscar os assentos:", error);
      });
  }, []);

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

    if (selectedSeats.length === 0) {
      alert("Por favor, selecione pelo menos um assento.");
      return;
    }

    const oddSeatsIds = seats
      .filter(
        (seat) =>
          seat.nome
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "")
            .toLowerCase() ===
          aluna
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "")
            .toLowerCase()
      ) // Filtra os assentos onde o nome corresponde ao da aluna
      .map((seat) => seat.id); // Mapeia os assentos filtrados para obter seus IDs

    // Verifica se encontrou a aluna nos assentos
    if (!oddSeatsIds) {
      alert("Erro: O nome da aluna não consta na lista.");
      return;
    }

    const body = {
      nome,
      cpf,
      email,
      aluna: avulso ? 0 : oddSeatsIds[0],
      idassentos: selectedSeats.map((seat) => seat.seatId).join(","),
      valor: selectedSeats.reduce((total, seat) => total + seat.valor, 0),
    };
    setBuyerData({ ...body, ids: selectedSeats });
    await axios
      .post("https://h-simcepi.smsprefeiturasp.com.br/python/reservas", body)
      .then((res) => {
        // Se não houver erro, prosseguir para a rota de sucesso
        navigate("/sucesso", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "'aluna'") {
          alert(
            "Por favor, insira o nome completo da aluna, pois o nome fornecido está incorreto."
          );
        } else {
          // Mensagem de erro geral
          alert("Ocorreu um erro: " + err.response.data.message);
        }
        alert(err.response.data.message);
      });
  }

  return (
    <Form onSubmit={confirmPurchase}>
      <InputContainer>
        <label htmlFor="nome">Nome Completo do Comprador:</label>
        <input
          id="nome"
          value={nome}
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
      {!avulso && (
        <InputContainer>
          <label htmlFor="aluna">Nome Completo da Aluna:</label>
          <input
            id="aluna"
            value={aluna}
            placeholder="Digite o nome da Aluna..."
            onChange={(e) => setAluna(e.target.value)}
            required
          />
        </InputContainer>
      )}
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
    cursor: pointer;
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
