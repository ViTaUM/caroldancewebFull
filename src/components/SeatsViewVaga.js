import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Autocomplete from "react-autocomplete";

const studentData = [
  { id: 201, nomeCompleto: "Beatriz da Silva Santos Barros" },
  { id: 106, nomeCompleto: "Alice Dantas Andrade" },
  { id: 107, nomeCompleto: "Beatriz Duarte Cruz" },
  { id: 108, nomeCompleto: "Helena Serafim Franco Nascimento" },
  { id: 109, nomeCompleto: "Lívia Pimentel Monteiro" },
  { id: 110, nomeCompleto: "Maria Cecília Oliveira Cabral" },
  { id: 111, nomeCompleto: "Maria Julia Reis Boaventura" },
  { id: 112, nomeCompleto: "Maria Teresa Motta Gonçalves Sá" },
  { id: 113, nomeCompleto: "Valentina O. Matos Queiroz" },
  { id: 114, nomeCompleto: "Eva Amoedo Vilas Boas" },
  { id: 115, nomeCompleto: "Maria Clara Souza Bichara" },
  { id: 116, nomeCompleto: "Maria Luiza Gonzaga Gaspar" },
  { id: 117, nomeCompleto: "Marina Alves Serra Costa" },
  { id: 118, nomeCompleto: "Misa Oliveira Matos" },
  { id: 119, nomeCompleto: "Camilly Victória Santos Idorno" },
  { id: 120, nomeCompleto: "Clara Victória Aguiar Gomes" },
  { id: 121, nomeCompleto: "Gabriela Bomfim Trindade" },
  { id: 122, nomeCompleto: "Gabrielle Fernandez Gil Amorim" },
  { id: 123, nomeCompleto: "Marina Capinan Santiago" },
  { id: 124, nomeCompleto: "Maria Júlia Santos Amoedo" },
  { id: 125, nomeCompleto: "Pérola Andrade Seixas Pereira da Silva" },
  { id: 126, nomeCompleto: "Catarina Carigé Lopes" },
  { id: 127, nomeCompleto: "Julia Kleivi Hosana de Oliveira Brito" },
  { id: 128, nomeCompleto: "Júlia Ribeiro Pimenta" },
  { id: 129, nomeCompleto: "Melissa Santana Cruz dos Santos" },
  { id: 130, nomeCompleto: "Maria Clara Ralin Silva" },
  { id: 131, nomeCompleto: "Maria Luiza Guido" },
  { id: 132, nomeCompleto: "Sofia Rocha Ranã" },
  { id: 133, nomeCompleto: "Victória Sales Araújo" },
  { id: 134, nomeCompleto: "Andressa Da Silva Moreira" },
  { id: 135, nomeCompleto: "Júlia Guimarães de Outeiro" },
  { id: 136, nomeCompleto: "Júlia Miranda Santos Assis" },
  { id: 137, nomeCompleto: "Laura Guimarães de Outeiro" },
  { id: 138, nomeCompleto: "Sofia Passos Cardozo de Lima" },
  { id: 139, nomeCompleto: "Céu Olifer Malaquias" },
  { id: 140, nomeCompleto: "Laura Gomes de Oliveira e Lima" },
  { id: 141, nomeCompleto: "Mariana Pereira Alves" },
  { id: 142, nomeCompleto: "Maitê Serafim Franco Nascimento" },
  { id: 143, nomeCompleto: "Pietra Andrade Iglesias" },
  { id: 144, nomeCompleto: "Pietra Marinho Argolo" },
  { id: 145, nomeCompleto: "Valentina Lis Cardoso Almeida" },
  { id: 146, nomeCompleto: "Alicia Pedreira Nascimento" },
  { id: 147, nomeCompleto: "Luíza Lustosa Silva" },
  { id: 148, nomeCompleto: "Luisa Fernanda Costa Sousa" },
  { id: 149, nomeCompleto: "Maria Valentina Santana" },
  { id: 150, nomeCompleto: "Vitória Santana" },
  { id: 151, nomeCompleto: "Bruna Siviero Figueredo" },
  { id: 152, nomeCompleto: "Giovana Botelho Dória Alves Demetrio" },
  { id: 153, nomeCompleto: "Giulia Miguez Ribeiro Silva" },
  { id: 154, nomeCompleto: "Heloísa Ribeiro de Novais Santiago Souza" },
  { id: 155, nomeCompleto: "Iolanda Vitória Monteiro da Silva" },
  { id: 156, nomeCompleto: "Laura Santos Esteves" },
  { id: 157, nomeCompleto: "Luise Pestana Bervian" },
  { id: 158, nomeCompleto: "Maria Carolina Moreira da Silva Vieira" },
  { id: 159, nomeCompleto: "Maria Luiza Santana Bahia Pinto Soares" },
  { id: 160, nomeCompleto: "Maria Rafaella Silva" },
  { id: 161, nomeCompleto: "Mariana Oliveira Nobre" },
  { id: 162, nomeCompleto: "Paola Santos Andrade de Oliveira" },
  { id: 163, nomeCompleto: "Ana Vitória Silva Santos" },
  { id: 164, nomeCompleto: "Cristiane Chaves da Silva" },
  { id: 165, nomeCompleto: "Marilia Barbara Cruz Souzer dos Santos" },
  { id: 166, nomeCompleto: "Mirelle Leonidia Dos Santos do Sacramento" },
  { id: 167, nomeCompleto: "Aymara Montezuma de Mello" },
  { id: 169, nomeCompleto: "Beatriz Prazeres Cruz Farias" },
  { id: 170, nomeCompleto: "Gabriela Duarte Tondroff" },
  { id: 171, nomeCompleto: "Juliana Almeida Vieira Campos" },
  { id: 172, nomeCompleto: "Luna Clara S. Santos" },
  { id: 173, nomeCompleto: "Maria Paula Da Purificação Damasceno" },
  { id: 174, nomeCompleto: "Ana Clara Prazeres Cruz Farias" },
  { id: 175, nomeCompleto: "Beatriz Michelli Batista" },
  { id: 176, nomeCompleto: "Cecilia Barrena Duarte" },
  { id: 177, nomeCompleto: "Elis Póvoa França" },
  { id: 178, nomeCompleto: "Giovana Michelli Batista" },
  { id: 179, nomeCompleto: "Helena Brito de Almeida Dias" },
  { id: 180, nomeCompleto: "Flora Café Carvalho" },
  { id: 181, nomeCompleto: "Janaína Dos Santos Pita da Hora" },
  { id: 182, nomeCompleto: "Júlia Vigas Sodré" },
  { id: 183, nomeCompleto: "Lara Alemany e Almeida" },
  { id: 184, nomeCompleto: "Lara Barreto de Andrade Gonçalves" },
  { id: 185, nomeCompleto: "Manuela Cruz de Andrade Gomes" },
  { id: 186, nomeCompleto: "Marina Viana Barreto" },
  { id: 187, nomeCompleto: "Naomi Ferreira Sousa Santos" },
  { id: 188, nomeCompleto: "Sofia De Andrade Apolônio Gomes" },
  { id: 189, nomeCompleto: "Ana Beatriz Silva Meneses" },
  { id: 190, nomeCompleto: "Carolina Freitas Santos" },
  { id: 191, nomeCompleto: "Giovanna Sady Ribeiro Souza" },
  { id: 192, nomeCompleto: "Isabella Bastos Serra" },
  { id: 193, nomeCompleto: "Maria Luísa Cunha Santos" },
  { id: 194, nomeCompleto: "Mirele De Carvalho Moreira" },
  { id: 195, nomeCompleto: "Monique Cunha Santos" },
  { id: 196, nomeCompleto: "Alice Pinto Goes de Oliveira" },
  { id: 197, nomeCompleto: "Brisa Maria Souza dos Santos" },
  { id: 198, nomeCompleto: "Liz Costa Vasconcelos" },
  { id: 199, nomeCompleto: "Mila Pedrosa Portugal" },
  { id: 200, nomeCompleto: "Renata Souza Doria" },
  { id: 202, nomeCompleto: "Ana Clara Neiva Ferreira" },
];

export default function SeatsViewVaga({
  setBuyerData,
  overview,
  vagaEstacionamento,
}) {
  const [nome, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [aluna, setAluna] = useState("");
  const [alunaId, setAlunaId] = useState(null);
  const [estacionamento, setEstacionamento] = useState("não");
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const [filteredStudents, setFilteredStudents] = useState(studentData);
  const [loading, setLoading] = useState(false);

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
      aluno: alunaId,
      cpf: cpf.replace(/\D/g, ""),
      nome,
      periodo:
        overview === 1 ? "08/06/2024 - SESSAO 1" : "08/06/2024 - SESSAO 2",
      email,
      estacionamento: "sim",
    };
    console.log();
    // Espera a renderização do QRCode
    setTimeout(() => {
      setBuyerData({ ...body });
      setLoading(true);
      axios
        .post(
          "https://h-simcepi.smsprefeiturasp.com.br/app01/caroldance/clientTicket/parking/buy",
          body
        )
        .then((res) => {
            setBuyerData({ ...body, teste: "Ok" });
            navigate("/sucessoEstacionamento", { replace: true });
        })
        .catch((err) => {
          if (
            err.response.data.error.description ===
            "'É obrigatório informar o campo ALUNO'"
          ) {
            alert(
              "Por favor, insira o nome completo da aluna, pois o nome fornecido está incorreto."
            );
          } else {
            // Mensagem de erro geral
            alert(err.response.data.error.description);
          }
        })
        .finally(() => {
          setLoading(false); // Desativa o estado de carregamento
        });
    }, 500);
  }

  useEffect(() => {
    if (estacionamento === "sim") {
      setShowModal(true);
    }
  }, [estacionamento]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleAlunaChange = (e) => {
    const value = e.target.value;
    setAluna(value);
    if (value) {
      const filtered = studentData.filter((student) =>
        student.nomeCompleto.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(studentData);
    }
  };

  const handleAlunaSelect = (val) => {
    const selectedStudent = studentData.find(
      (student) => student.nomeCompleto === val
    );
    setAluna(val);
    setAlunaId(selectedStudent ? selectedStudent.id : null);
  };
  return (
    <>
      {loading && (
        <LoadingOverlay>
          <LoadingText>Carregando...</LoadingText>
        </LoadingOverlay>
      )}
      <SeatsContent>
        <div className="header">
          <h1>ESTACIOANAMENTO</h1>
          <h2>
            preencha os campos abaixo e adquira sua vaga de estacionamento.
          </h2>
        </div>
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
          <InputContainer>
            <label htmlFor="aluna">Selecione o Nome Completo da Aluna:</label>
            <div style={{ position: "relative", width: "100%", zIndex: 1000 }}>
              <StyledAutocomplete
                getItemValue={(item) => item.nomeCompleto}
                items={filteredStudents}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.id}
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                      cursor: "pointer",
                      padding: "10px 18px",
                      zIndex: 1000,
                    }}
                  >
                    {item.nomeCompleto}
                  </div>
                )}
                value={aluna}
                onChange={handleAlunaChange}
                onSelect={handleAlunaSelect}
                inputProps={{
                  id: "aluna",
                  placeholder: "Digite o nome da Aluna...",
                  required: true,
                  style: inputStyle,
                }}
                wrapperStyle={{ width: "100%", zIndex: 1000 }}
              />
            </div>
          </InputContainer>
          <InputContainer>
            <label htmlFor="estacionamento">
              Deseja estacionar na escola Salesiano? Valor R$15,00
            </label>
            <select
              id="estacionamento"
              value={estacionamento}
              onChange={(e) => setEstacionamento(e.target.value)}
              required
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
                O veículo deverá permanecer estacionado no Colégio Salesiano
                entre o período das{" "}
                {overview === 1 ? "15h00 e 18h00" : "18:30 e 21h"}. Assim que o
                espetáculo terminar, será necessário retirá-lo do local.
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
      </SeatsContent>
    </>
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

const LoadingOverlay = styled.div`
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

const LoadingText = styled.p`
  font-size: 24px;
  color: #ffffff;
`;

const inputStyle = {
  padding: "10px 18px",
  fontSize: "18px",
  borderRadius: "10px",
  border: "1px solid #000",
  height: "50px",
  outline: "none",
  background: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  width: "100%",
};

const StyledAutocomplete = styled(Autocomplete)`
  & input {
    ${inputStyle}
  }

  & .react-autocomplete-menu {
    border: 1px solid #000;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000; /* Certifique-se de que o z-index seja maior que o do Footer */
    position: absolute; /* Garante que o menu não afete o layout do formulário */
    width: 100%; /* Faz o menu ocupar toda a largura do input */
  }

  & .react-autocomplete-item {
    cursor: pointer;
  }

  & .react-autocomplete-item:hover {
    background-color: lightgray;
  }
`;
