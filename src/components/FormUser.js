import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function FormUser({ selectedSeats, setBuyerData, avulso, overview }) {
  const [nome, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [aluna, setAluna] = useState("");
  const [estacionamento, setEstacionamento] = useState("não");
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isEstacionamentoDisabled, setIsEstacionamentoDisabled] =
    useState(false);
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Cria a configuração dos cabeçalhos para o Axios
    const config = {
      headers: {
        "Content-Type": "application/json",
        // "X-Requested-With": "XMLHttpRequest", // Adiciona o cabeçalho X-Requested-With
        // Exemplo: Adiciona um cabeçalho de autorização
        // 'Authorization': 'Bearer seu-token-aqui'
        // Adicione outros cabeçalhos conforme necessário
      },
    };

    // Faz uma chamada para o servidor backend para buscar os dados dos eventos usando Axios
    axios
      .get(
        "https://h-simcepi.smsprefeiturasp.com.br/app01/caroldance/admin/student/list",
        config
      )
      .then((response) => {
        setSeats(response.data.data); // O Axios já faz o parse do JSON automaticamente
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

    const estacionamentoValor = estacionamento === "sim" ? 10.0 : 0;

    const assentos = selectedSeats.reduce((acc, seat) => {
      acc[seat.seatId] = seat.valor;
      return acc;
    }, {});

    const body = {
      aluno: avulso ? 0 : oddSeatsIds[0],
      cpf,
      nome,
      periodo: overview,
      email,
      assentos,
      estacionamento: estacionamentoValor ? 1 : 0,
    };

    setBuyerData({ ...body, ids: selectedSeats });
    await axios
      .post(
        "https://h-simcepi.smsprefeiturasp.com.br/app01/caroldance/clientTicket/ticket/buy",
        body
      )
      .then((res) => {
        // Se não houver erro, prosseguir para a rota de sucesso
        navigate("/sucesso", { replace: true });
      })
      .catch((err) => {
        if (err.response.data.error.description === "'É obrigatório informar o campo ALUNO'") {
          alert(
            "Por favor, insira o nome completo da aluna, pois o nome fornecido está incorreto."
          );
        } else {
          // Mensagem de erro geral
          alert(err.response.data.error.description);
        }
      });
  }

  useEffect(() => {
    if (estacionamento === "sim") {
      setShowModal(true);
    }
  }, [estacionamento]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setIsEstacionamentoDisabled(true);
    }
  };

  return (
    <>
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
        <InputContainer>
          <label htmlFor="estacionamento">
            Deseja estacionar na escola Salesiano? Valor R$15,00
          </label>
          <select
            id="estacionamento"
            value={estacionamento}
            onChange={(e) => setEstacionamento(e.target.value)}
            required
            disabled={isEstacionamentoDisabled}
          >
            <option value="não">Não</option>
            <option value="sim">Sim</option>
          </select>
        </InputContainer>
        <button type="submit">Reservar Assento(s)</button>
      </Form>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>AVISO SOBRE O ESTACIONAMENTO</ModalHeader>
            <ModalText>
              O veículo deverá permanecer estacionado no Colégio Salesiano entre
              o período das {overview === '08/06/2024 - SESSAO 1' ? '15h00 e 18h00' : '18:30 e 21h'}. Assim que o espetáculo terminar, será
              necessário retirá-lo do local.
            </ModalText>
            <CheckboxContainer>
              <input
                type="checkbox"
                id="confirmation"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="large-checkbox"
              />
              <label htmlFor="confirmation">Li e estou ciente</label>
            </CheckboxContainer>
            <CloseButton
              onClick={() => setShowModal(false)}
              disabled={!isChecked}
            >
              Fechar
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
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

  input,
  select {
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

  input::-webkit-input-placeholder,
  select::-webkit-input-placeholder {
    font-size: 18px;
    color: #000;
  }

  input:-ms-input-placeholder,
  select:-ms-input-placeholder {
    font-size: 18px;
    color: #000;
  }

  input::placeholder,
  select::placeholder {
    font-size: 18px;
    color: #000;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 500px;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h3`
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  color: #555;
  line-height: 1.6;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;

  input[type="checkbox"].large-checkbox {
    width: 25px; /* Aumente o tamanho conforme necessário */
    height: 25px; /* Aumente o tamanho conforme necessário */
    margin-right: 10px;
  }

  label {
    color: #555;
  }
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: #cd0077;
  border-radius: 4px;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1493;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
