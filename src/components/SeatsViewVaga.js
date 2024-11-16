import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Autocomplete from "react-autocomplete";

const studentData = [
  { id: 200, nomeCompleto: "Beatriz da Silva Santos Barros" },
  { id: 201, nomeCompleto: "Caroline Andrade de Seixas Pereira" },
  { id: 1, nomeCompleto: "Alice Castro Zamarioli" },
  { id: 2, nomeCompleto: "Alice Cruz Menezes" },
  { id: 3, nomeCompleto: "Alice Dantas Andrade" },
  { id: 4, nomeCompleto: "Alice Pinto Goes de Oliveira" },
  { id: 5, nomeCompleto: "Alicia Pedreira Nascimento" },
  { id: 6, nomeCompleto: "Ana Beatriz Silva Meneses" },
  { id: 7, nomeCompleto: "Ana Cecilia Chaves Mota" },
  { id: 8, nomeCompleto: "Ana Clara Neiva Ferreira" },
  { id: 9, nomeCompleto: "Ana Louise Libório Borges" },
  { id: 10, nomeCompleto: "Ana Luisa Trabuco Camelier" },
  { id: 11, nomeCompleto: "Ana Luiza Teixeira Cruz" },
  { id: 12, nomeCompleto: "Ana Vitória Silva Santos" },
  { id: 13, nomeCompleto: "Ananda Sudário Pereira" },
  { id: 14, nomeCompleto: "Andressa Da Silva Moreira" },
  { id: 15, nomeCompleto: "Aymara Montezuma de Mello" },
  { id: 16, nomeCompleto: "Beatriz Duarte Cruz" },
  { id: 17, nomeCompleto: "Beatriz Michelli Batista" },
  { id: 18, nomeCompleto: "Beatriz Prazeres Cruz Farias" },
  { id: 19, nomeCompleto: "Beatriz Souza Do Bonfim" },
  { id: 20, nomeCompleto: "Beatriz de Cerqueira Cardoso Pereira" },
  { id: 21, nomeCompleto: "Brisa Maria Souza dos Santos" },
  { id: 22, nomeCompleto: "Bruna Lacerda Serravalle" },
  { id: 23, nomeCompleto: "Bruna Siviero Figueredo" },
  { id: 24, nomeCompleto: "Camilly Victória Santos Idorno" },
  { id: 25, nomeCompleto: "Carolina Freitas Santos" },
  { id: 26, nomeCompleto: "Catarina Carigé Lopes" },
  { id: 27, nomeCompleto: "Catarina Otero Rangel De Santana" },
  { id: 28, nomeCompleto: "Cecilia Barrena Duarte" },
  { id: 29, nomeCompleto: "Clara Victória Aguiar Gomes" },
  { id: 30, nomeCompleto: "Cristiane Chaves da Silva" },
  { id: 31, nomeCompleto: "Céu Olifer Malaquias" },
  { id: 32, nomeCompleto: "Eduarda Lima De Vasconcellos" },
  { id: 33, nomeCompleto: "Elis Póvoa França" },
  { id: 34, nomeCompleto: "Eva Amoedo Vilas Boas" },
  { id: 35, nomeCompleto: "Fernanda Oliveira Nascimento" },
  { id: 36, nomeCompleto: "Flávia de Oliveira Leal Lerviño" },
  { id: 37, nomeCompleto: "Gabriela Lima De Castro" },
  { id: 38, nomeCompleto: "Gabrielle Fernandez Gil Amorim" },
  { id: 39, nomeCompleto: "Giovana Botelho Dória Alves Demetrio" },
  { id: 40, nomeCompleto: "Giovana Michelli Batista" },
  { id: 41, nomeCompleto: "Giovanna Sady Ribeiro Souza" },
  { id: 42, nomeCompleto: "Giulia Miguez Ribeiro Silva" },
  { id: 43, nomeCompleto: "Helena Brito de Almeida Dias" },
  { id: 44, nomeCompleto: "Helena Garcia Costa Nunes" },
  { id: 45, nomeCompleto: "Helena Rodrigues Garcia" },
  { id: 46, nomeCompleto: "Helena Sacramento Coelho" },
  { id: 47, nomeCompleto: "Helena Serafim Franco Nascimento" },
  { id: 48, nomeCompleto: "Heloísa Ribeiro de Novais Santiago Souza" },
  { id: 49, nomeCompleto: "Iolanda Vitória Monteiro Da Silva" },
  { id: 50, nomeCompleto: "Isabella Bastos Serra" },
  { id: 51, nomeCompleto: "Janaína dos Santos Pita da Hora" },
  { id: 52, nomeCompleto: "Julia Kleivi Hosana de Oliveira Brito" },
  { id: 53, nomeCompleto: "Juliana Almeida Vieira Campos" },
  { id: 54, nomeCompleto: "Júlia Coelho" },
  { id: 55, nomeCompleto: "Júlia De Andrade Barreto Ribeiro" },
  { id: 56, nomeCompleto: "Júlia Guimarães De Outeiro" },
  { id: 57, nomeCompleto: "Júlia Guimarães de Outeiro" },
  { id: 58, nomeCompleto: "Júlia Miranda Santos Assis" },
  { id: 59, nomeCompleto: "Júlia Ribeiro Pimenta" },
  { id: 60, nomeCompleto: "Júlia Vigas Sodré" },
  { id: 61, nomeCompleto: "Lara Alemany e Almeida" },
  { id: 62, nomeCompleto: "Lara Barreto de Andrade Gonçalves" },
  { id: 63, nomeCompleto: "Laura Gomes de Oliveira e Lima" },
  { id: 64, nomeCompleto: "Laura Guimarães de Outeiro" },
  { id: 65, nomeCompleto: "Leticia Moitinho Lima" },
  { id: 66, nomeCompleto: "Leticia Silva Dos Santos Fonseca" },
  { id: 67, nomeCompleto: "Letícia Lis Costa Santos" },
  { id: 68, nomeCompleto: "Liz Costa Vasconcelos" },
  { id: 69, nomeCompleto: "Luisa Fernanda Costa Sousa" },
  { id: 70, nomeCompleto: "Luisa Lopes Simões" },
  { id: 71, nomeCompleto: "Luise Pestana Bervian" },
  { id: 72, nomeCompleto: "Luiza Pinheiro Santana de Oliveira" },
  { id: 73, nomeCompleto: "Luíza Lustosa Silva" },
  { id: 74, nomeCompleto: "Lívia Pimentel Monteiro" },
  { id: 75, nomeCompleto: "Maitê Serafim Franco Nascimento" },
  { id: 76, nomeCompleto: "Maria Antônia Silva De Almeida" },
  { id: 77, nomeCompleto: "Maria Carolina Moreira Da Silva Vieira" },
  { id: 77, nomeCompleto: "Maria Carolina Moreira Da Silva Vieira" },
  { id: 78, nomeCompleto: "Maria Cecília Oliveira Cabral" },
  { id: 79, nomeCompleto: "Maria Cecília Santana Vieira" },
  { id: 80, nomeCompleto: "Maria Clara Ralin Silva" },
  { id: 81, nomeCompleto: "Maria Clara Souza Bichara" },
  { id: 82, nomeCompleto: "Maria Eduarda Borges De Almeida" },
  { id: 83, nomeCompleto: "Maria Julia Reis Boaventura" },
  { id: 84, nomeCompleto: "Maria Júlia Santos Amoedo" },
  { id: 85, nomeCompleto: "Maria Júlia Tristão De Santana" },
  { id: 86, nomeCompleto: "Maria Luiza Giacobelli Fontes" },
  { id: 87, nomeCompleto: "Maria Luiza Guido" },
  { id: 88, nomeCompleto: "Maria Luísa Cunha Santos" },
  { id: 89, nomeCompleto: "Maria Olívia Santos Andrade De Oliveira" },
  { id: 90, nomeCompleto: "Maria Paula da Purificação Damasceno" },
  { id: 91, nomeCompleto: "Maria Rafaella Silva" },
  { id: 92, nomeCompleto: "Maria Teresa Motta Gonçalves Sá" },
  { id: 93, nomeCompleto: "Maria Valentina Silva Santana" },
  { id: 94, nomeCompleto: "Mariana Araújo Bastos Serra" },
  { id: 95, nomeCompleto: "Mariana Costa Rodrigues Pimentel" },
  { id: 96, nomeCompleto: "Mariana Oliveira Nobre" },
  { id: 97, nomeCompleto: "Mariana Pereira Alves" },
  { id: 98, nomeCompleto: "Marilia Barbara Cruz Souzer dos Santos" },
  { id: 99, nomeCompleto: "Marina Alves Serra Costa" },
  { id: 100, nomeCompleto: "Marina Viana Barreto" },
  { id: 101, nomeCompleto: "Marina Zarif De Assis" },
  { id: 102, nomeCompleto: "Maya Cerqueira Menezes De Mariz" },
  { id: 103, nomeCompleto: "Maya Santana De Souza" },
  { id: 104, nomeCompleto: "Melina Magalhães Bastos Nascimento" },
  { id: 105, nomeCompleto: "Melissa Santana Cruz dos Santos" },
  { id: 106, nomeCompleto: "Milla Cortes Alexandria" },
  { id: 107, nomeCompleto: "Milla Pedrosa Portugal" },
  { id: 108, nomeCompleto: "Mirele de Carvalho Moreira" },
  { id: 109, nomeCompleto: "Mirella Luiza Souza Moreira" },
  { id: 110, nomeCompleto: "Mirelle Leonidia dos Santos do Sacramento" },
  { id: 111, nomeCompleto: "Misa Oliveira Matos" },
  { id: 112, nomeCompleto: "Naila Ferreira Batista" },
  { id: 113, nomeCompleto: "Naomi Ferreira Sousa Santos" },
  { id: 114, nomeCompleto: "Nathália Plácido Machado Coutinho" },
  { id: 115, nomeCompleto: "Paola Santos Andrade De Oliveira" },
  { id: 116, nomeCompleto: "Pietra Andrade Iglesias" },
  { id: 117, nomeCompleto: "Pietra Marinho Argolo" },
  { id: 118, nomeCompleto: "Pérola Andrade De Seixas Pereira Da Silva" },
  { id: 119, nomeCompleto: "Renata Souza Doria" },
  { id: 120, nomeCompleto: "Sofia Passos Cardozo de Lima" },
  { id: 121, nomeCompleto: "Sofia Rocha Ranã" },
  { id: 122, nomeCompleto: "Sofia Silva Dos Santos Fonseca" },
  { id: 123, nomeCompleto: "Sofia de Andrade Apolônio Gomes" },
  { id: 124, nomeCompleto: "Valentina Lis Cardoso Almeida" },
  { id: 125, nomeCompleto: "Valentina O. Matos Queiroz" },
  { id: 126, nomeCompleto: "Victória Sales Araújo" },
  { id: 127, nomeCompleto: "Vida Antonella Oliveira dos Santos" },
  { id: 128, nomeCompleto: "Vitória Gomes Santos" },
  { id: 129, nomeCompleto: "Vitória Silva Santana" }
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
        overview === 1 ? "11/12/2024 - SESSAO 1" : "11/12/2024 - SESSAO 2",
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
          "https://greenyellow-owl-992918.hostingersite.com/clientTicket/parking/buy",
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
