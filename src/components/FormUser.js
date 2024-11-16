import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Autocomplete from "react-autocomplete";
import QRCode from "qrcode.react";

const studentData = [
  { id: 201, nomeCompleto: "Beatriz da Silva Santos Barros" },
  { id: 106, nomeCompleto: "Alice Dantas Andrade" },
  { id: 107, nomeCompleto: "Ana Louise Borges" },
  { id: 108, nomeCompleto: "Beatriz Duarte Cruz" },
  { id: 109, nomeCompleto: "Helena Serafim Franco Nascimento" },
  { id: 110, nomeCompleto: "Lívia Pimentel Monteiro" },
  { id: 111, nomeCompleto: "Maria Antônia Silva De Almeida" },
  { id: 112, nomeCompleto: "Maria Júlia Tristão De Santana" },
  { id: 113, nomeCompleto: "Maya Santana De Souza" },
  { id: 114, nomeCompleto: "Vida Antonella Oliveira dos Santos" },
  { id: 115, nomeCompleto: "Maria Cecília Oliveira Cabral" },
  { id: 116, nomeCompleto: "Maria Cecília Santana Vieira" },
  { id: 117, nomeCompleto: "Maria Julia Reis Boaventura" },
  { id: 118, nomeCompleto: "Maria Teresa Motta Gonçalves Sá" },
  { id: 119, nomeCompleto: "Luiza Pinheiro Santana de Oliveira" },
  { id: 120, nomeCompleto: "Valentina O. Matos Queiroz" },
  { id: 121, nomeCompleto: "Alice Cruz Menezes" },
  { id: 122, nomeCompleto: "Eduarda Lima De Vasconcellos" },
  { id: 123, nomeCompleto: "Eva Amoedo Vilas Boas" },
  { id: 124, nomeCompleto: "Leticia Moitinho Lima" },
  { id: 125, nomeCompleto: "Maria Clara Souza Bichara" },
  { id: 126, nomeCompleto: "Marina Alves Serra Costa" },
  { id: 127, nomeCompleto: "Misa Oliveira Matos" },
  { id: 128, nomeCompleto: "Camilly Victória Santos Idorno" },
  { id: 129, nomeCompleto: "Clara Victória Aguiar Gomes" },
  { id: 130, nomeCompleto: "Gabrielle Fernandez Gil Amorim" },
  { id: 131, nomeCompleto: "Maria Júlia Santos Amoedo" },
  { id: 132, nomeCompleto: "Pérola Andrade De Seixas Pereira da Silva" },
  { id: 133, nomeCompleto: "Catarina Carigé Lopes" },
  { id: 134, nomeCompleto: "Julia Kleivi Hosana de Oliveira Brito" },
  { id: 135, nomeCompleto: "Júlia Ribeiro Pimenta" },
  { id: 136, nomeCompleto: "Melissa Santana Cruz dos Santos" },
  { id: 137, nomeCompleto: "Maria Clara Ralin Silva" },
  { id: 138, nomeCompleto: "Maria Luiza Guido" },
  { id: 139, nomeCompleto: "Sofia Rocha Ranã" },
  { id: 140, nomeCompleto: "Victória Sales Araújo" },
  { id: 141, nomeCompleto: "Andressa Da Silva Moreira" },
  { id: 142, nomeCompleto: "Júlia Guimarães de Outeiro" },
  { id: 143, nomeCompleto: "Júlia Miranda Santos Assis" },
  { id: 144, nomeCompleto: "Laura Guimarães de Outeiro" },
  { id: 145, nomeCompleto: "Sofia Passos Cardozo de Lima" },
  { id: 146, nomeCompleto: "Ananda Sudário Pereira" },
  { id: 147, nomeCompleto: "Beatriz Pereira" },
  { id: 148, nomeCompleto: "Bruna Lacerda Serravalle" },
  { id: 149, nomeCompleto: "Céu Olifer Malaquias" },
  { id: 150, nomeCompleto: "Laura Gomes de Oliveira e Lima" },
  { id: 151, nomeCompleto: "Mariana Pereira Alves" },
  { id: 152, nomeCompleto: "Maitê Serafim Franco Nascimento" },
  { id: 153, nomeCompleto: "Pérola Andrade De Seixas Pereira Da Silva" },
  { id: 154, nomeCompleto: "Pietra Andrade Iglesias" },
  { id: 155, nomeCompleto: "Pietra Marinho Argolo" },
  { id: 156, nomeCompleto: "Valentina Lis Cardoso Almeida" },
  { id: 157, nomeCompleto: "Alicia Pedreira Nascimento" },
  { id: 158, nomeCompleto: "Helena Rodrigues Garcia" },
  { id: 159, nomeCompleto: "Júlia De Andrade Barreto Ribeiro" },
  { id: 160, nomeCompleto: "Luíza Lustosa Silva" },
  { id: 161, nomeCompleto: "Luisa Fernanda Costa Sousa" },
  { id: 162, nomeCompleto: "Mariana Costa Rodrigues Pimentel" },
  { id: 163, nomeCompleto: "Maria Valentina Silva Santana" },
  { id: 164, nomeCompleto: "Vitória Silva Santana" },
  { id: 165, nomeCompleto: "Bruna Siviero Figueredo" },
  { id: 166, nomeCompleto: "Gabriela Lima De Castro" },
  { id: 167, nomeCompleto: "Giovana Botelho Dória Alves Demetrio" },
  { id: 168, nomeCompleto: "Giulia Miguez Ribeiro Silva" },
  { id: 169, nomeCompleto: "Heloísa Ribeiro de Novais Santiago Souza" },
  { id: 170, nomeCompleto: "Iolanda Vitória Monteiro Da Silva" },
  { id: 171, nomeCompleto: "Luise Pestana Bervian" },
  { id: 172, nomeCompleto: "Maria Carolina Moreira Da Silva Vieira" },
  { id: 173, nomeCompleto: "Maria Rafaella Silva" },
  { id: 174, nomeCompleto: "Mariana Oliveira Nobre" },
  { id: 175, nomeCompleto: "Paola Santos Andrade De Oliveira" },
  { id: 176, nomeCompleto: "Ana Vitória Silva Santos" },
  { id: 177, nomeCompleto: "Cristiane Chaves da Silva" },
  { id: 178, nomeCompleto: "Flávia de Oliveira Leal Lerviño" },
  { id: 179, nomeCompleto: "Marilia Barbara Cruz Souzer dos Santos" },
  { id: 180, nomeCompleto: "Maria Olívia Santos Andrade De Oliveira" },
  { id: 181, nomeCompleto: "Mirelle Leonidia dos Santos do Sacramento" },
  { id: 182, nomeCompleto: "Andressa Da Silva Moreira" },
  { id: 183, nomeCompleto: "Aymara Montezuma de Mello" },
  { id: 184, nomeCompleto: "Alicia Pedreira Nascimento" },
  { id: 185, nomeCompleto: "Bruna Siviero Figueredo" },
  { id: 186, nomeCompleto: "Beatriz Prazeres Cruz Farias" },
  { id: 187, nomeCompleto: "Juliana Almeida Vieira Campos" },
  { id: 188, nomeCompleto: "Júlia Coelho" },
  { id: 189, nomeCompleto: "Júlia Guimarães De Outeiro" },
  { id: 190, nomeCompleto: "Leticia Silva Dos Santos Fonseca" },
  { id: 191, nomeCompleto: "Maria Paula da Purificação Damasceno" },
  { id: 192, nomeCompleto: "Mirelle Leonidia dos Santos do Sacramento" },
  { id: 193, nomeCompleto: "Naila Ferreira Batista" },
  { id: 194, nomeCompleto: "Sofia Silva Dos Santos Fonseca" },
  { id: 195, nomeCompleto: "Ana Clara Neiva Ferreira" },
  { id: 196, nomeCompleto: "Ana Luisa Trabuco Camelier" },
  { id: 197, nomeCompleto: "Beatriz Michelli Batista" },
  { id: 198, nomeCompleto: "Cecilia Barrena Duarte" },
  { id: 199, nomeCompleto: "Elis Póvoa França" },
  { id: 200, nomeCompleto: "Fernanda Oliveira Nascimento" },
  { id: 202, nomeCompleto: "Giovana Michelli Batista" },
  { id: 203, nomeCompleto: "Helena Brito de Almeida Dias" },
  { id: 204, nomeCompleto: "Helena Garcia Costa Nunes" },
  { id: 205, nomeCompleto: "Janaína dos Santos Pita da Hora" },
  { id: 206, nomeCompleto: "Júlia Vigas Sodré" },
  { id: 207, nomeCompleto: "Lara Alemany e Almeida" },
  { id: 208, nomeCompleto: "Lara Barreto de Andrade Gonçalves" },
  { id: 209, nomeCompleto: "Mariana Araújo Bastos Serra" },
  { id: 210, nomeCompleto: "Marina Viana Barreto" },
  { id: 211, nomeCompleto: "Mirella Luiza Souza Moreira" },
  { id: 212, nomeCompleto: "Naomi Ferreira Sousa Santos" },
  { id: 213, nomeCompleto: "Sofia de Andrade Apolônio Gomes" },
  { id: 214, nomeCompleto: "Ana Beatriz Silva Meneses" },
  { id: 215, nomeCompleto: "Carolina Freitas Santos" },
  { id: 216, nomeCompleto: "Giovanna Sady Ribeiro Souza" },
  { id: 217, nomeCompleto: "Isabella Bastos Serra" },
  { id: 218, nomeCompleto: "Letícia Lis Costa Santos" },
  { id: 219, nomeCompleto: "Maria Luísa Cunha Santos" },
  { id: 220, nomeCompleto: "Mirele de Carvalho Moreira" },
  { id: 221, nomeCompleto: "Vitória Gomes Santos" },
  { id: 222, nomeCompleto: "Alice Castro Zamarioli" },
  { id: 223, nomeCompleto: "Alice Pinto Goes de Oliveira" },
  { id: 224, nomeCompleto: "Beatriz Souza Do Bonfim" },
  { id: 225, nomeCompleto: "Brisa Maria Souza dos Santos" },
  { id: 226, nomeCompleto: "Liz Costa Vasconcelos" },
  { id: 227, nomeCompleto: "Melina Magalhães Bastos Nascimento" },
  { id: 228, nomeCompleto: "Milla Pedrosa Portugal" },
  { id: 229, nomeCompleto: "Nathália Plácido Machado Coutinho" },
  { id: 230, nomeCompleto: "Pérola Andrade De Seixas Pereira Da Silva" },
  { id: 231, nomeCompleto: "Renata Souza Doria" },
  { id: 232, nomeCompleto: "Catarina Otero Rangel De Santana" },
  { id: 233, nomeCompleto: "Maria Eduarda Borges De Almeida" },
  { id: 234, nomeCompleto: "Marina Zarif De Assis" },
  { id: 235, nomeCompleto: "Maya Cerqueira Menezes De Mariz" },
  { id: 236, nomeCompleto: "Milla Cortes Alexandria" },
  { id: 237, nomeCompleto: "Alice Cruz Menezes" },
  { id: 238, nomeCompleto: "Ana Luiza Teixeira Cruz" },
  { id: 239, nomeCompleto: "Helena Sacramento Coelho" },
  { id: 240, nomeCompleto: "Luisa Lopes Simões" },
  { id: 241, nomeCompleto: "Maria Luiza Giacobelli Fontes" },
];

export default function FormUser({
  selectedSeats,
  setBuyerData,
  overview,
  avulso,
}) {
  const [nome, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [aluna, setAluna] = useState("");
  const [alunaId, setAlunaId] = useState(null);
  const [estacionamento] = useState("não");
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const [filteredStudents, setFilteredStudents] = useState(studentData);
  // const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const qrRef = useRef(null);
  const [qrData, setQrData] = useState("");

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

   // const estacionamentoValor = estacionamento === "sim" ? 10.0 : 0;

    const assentos = selectedSeats.reduce((acc, seat) => {
      acc[seat.seatId] = seat.valor;
      return acc;
    }, {});

    const assentosNomes = selectedSeats.map((seat) => seat.name).join(", ");

    const body = {
      aluno: avulso === 1 ? 203 : alunaId,
      cpf,
      nome,
      periodo: overview,
      email,
      assentos,
      assentosNomes,
      //estacionamento: avulso === 1 ? 0 : estacionamentoValor ? 1 : 0,
      estacionamento: 0,
      qrcode: "",
    };

    // Gera o URL do QRCode com os parâmetros via GET
    const baseURL = "https://carol-dance-web.netlify.app/qrcode?";
    const qrDataURL = `${baseURL}CPF=${encodeURIComponent(
      body.cpf
    )}&Nome=${encodeURIComponent(body.nome)}&Assentos=${encodeURIComponent(
      assentosNomes
    )}&Sessao=${encodeURIComponent(body.periodo)}`;

    // Define o estado do QRCode para renderizar
    setQrData(qrDataURL);

    // Espera a renderização do QRCode
    setTimeout(() => {
      const qrCanvas = qrRef.current.querySelector("canvas");
      const qrDataURL = qrCanvas.toDataURL("image/png");

      // Adiciona a imagem base64 do QRCode ao corpo da requisição
      body.qrcode = qrDataURL;

      setBuyerData({ ...body, ids: selectedSeats });
      setLoading(true);
      axios
        .post(
          "https://greenyellow-owl-992918.hostingersite.com/clientTicket/ticket/buy",
          body
        )
        .then((res) => {
          // Adiciona data.cortesias ao body
          const { cortesias } = res.data.data;
          setBuyerData({ ...body, ids: selectedSeats, cortesias });
          // Se não houver erro, prosseguir para a rota de sucesso
          navigate("/sucesso", { replace: true });
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
        )}
        {/* {!avulso && (
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
        )} */}
        {qrData && (
          <div ref={qrRef} style={{ display: "none" }}>
            <QRCode
              value={qrData}
              size={256}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              renderAs="canvas"
            />
          </div>
        )}
        <button type="submit">Reservar Assento(s)</button>
      </Form>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>AVISO SOBRE O ESTACIONAMENTO</ModalHeader>
            <ModalText>
              O veículo deverá permanecer estacionado no Colégio Salesiano entre
              o período das{" "}
              {overview === "11/12/2024 - SESSAO 1"
                ? "17h00 e 18h30"
                : "19:30 e 21h"}
              . Assim que o espetáculo terminar, será necessário retirá-lo do
              local.
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
