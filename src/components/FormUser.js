import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import styled from "styled-components";
import Autocomplete from "react-autocomplete";
import QRCode from "qrcode.react";

const studentData = [
  { id: 999, nomeCompleto: "Beatriz da Silva Santos Barros" },
  { id: 999, nomeCompleto: "Caroline de Andrade Seixas Pereira" },
  { id: 119, nomeCompleto: "Aischa Praxedes Cerqueira" },
  { id: 121, nomeCompleto: "Alice Silva Santos" },
  { id: 29, nomeCompleto: "Alice Dantas Andrade" },
  { id: 2, nomeCompleto: "Alice da Rocha Leão de Brito" },
  { id: 114, nomeCompleto: "Alice Castro Zamarioli" },
  { id: 105, nomeCompleto: "Andressa da Silva Moreira" },
  { id: 113, nomeCompleto: "Anita Matos Prado Calazans do Valle" },
  { id: 57, nomeCompleto: "Ana Clara Neiva Ferreira" },
  { id: 58, nomeCompleto: "Ana Luiza Trabuco Camelier" },
  { id: 9, nomeCompleto: "Ana Beatriz de Oliveira Pinho Neves" },
  { id: 97, nomeCompleto: "Ana Vitória de Andrade Barreto Ribeiro" },
  { id: 45, nomeCompleto: "Anna Beatriz de Queiroz Rocha" },
  { id: 128, nomeCompleto: "Aymara Montezuma de Mello" },
  { id: 19, nomeCompleto: "Beatriz Duarte cruz" },
  { id: 10, nomeCompleto: "Beatriz Passos Franco" },
  { id: 59, nomeCompleto: "Beatriz Michelli Batista" },
  { id: 129, nomeCompleto: "Beatriz Prazeres Cruz Freitas" },
  { id: 115, nomeCompleto: "Beatriz Souza do Bonfim" },
  { id: 98, nomeCompleto: "Beatriz Teixeira de Jesus Nascimento" },
  { id: 40, nomeCompleto: "Brenda dos Santos Sousa" },
  { id: 72, nomeCompleto: "Bruna Lacerda Serravalle" },
  { id: 88, nomeCompleto: "Bruna Siviero Figueredo" },
  { id: 41, nomeCompleto: "Camilly Victória dos Santos Adorno" },
  { id: 130, nomeCompleto: "Camila Maria Ferreira Perdigão" },
  { id: 80, nomeCompleto: "Carolina Freitas Santos" },
  { id: 20, nomeCompleto: "Catarina Mendes Bontempo" },
  { id: 46, nomeCompleto: "Catarina Carigé Lopes" },
  { id: 60, nomeCompleto: "Cecilia Barrena Duarte" },
  { id: 99, nomeCompleto: "Cristiane Chaves da Silva" },
  { id: 3, nomeCompleto: "Daniela Carolina Matta Pereira" },
  { id: 61, nomeCompleto: "Elis Póvoa França" },
  { id: 30, nomeCompleto: "Eva Amoedo Vilas Boas" },
  { id: 47, nomeCompleto: "Evelyn de Brito Paixão Oliveira" },
  { id: 42, nomeCompleto: "Gabrielle Gil Amorim" },
  { id: 90, nomeCompleto: "Giovana Botelho Dória Alves Demétrio" },
  { id: 62, nomeCompleto: "Giovana Michelli Batista" },
  { id: 21, nomeCompleto: "Giulia Castro Vilas Boas" },
  { id: 89, nomeCompleto: "Giulia Miguez" },
  { id: 5, nomeCompleto: "Helana Victoria Martinez Cerqueira" },
  { id: 31, nomeCompleto: "Helena Freitas Lefundes" },
  { id: 106, nomeCompleto: "Helena Sacramento Coelho" },
  { id: 22, nomeCompleto: "Helena Serafim Franco Nascimento" },
  { id: 100, nomeCompleto: "Iolanda Vitória Monteiro da Silva" },
  { id: 107, nomeCompleto: "Isabella Bastos Serra" },
  { id: 4, nomeCompleto: "Isabela Gonçalves Álvares Lessa" },
  { id: 63, nomeCompleto: "Janaina dos Santos Pita da Hora" },
  { id: 82, nomeCompleto: "Júlia de Andrade Barreto Ribeiro" },
  { id: 48, nomeCompleto: "Júlia Elin Nascimento Santos" },
  { id: 109, nomeCompleto: "Júlia Guimarães de Outeiro" },
  { id: 49, nomeCompleto: "Júlia Kleyvy Hosana de Oliveira Brito" },
  { id: 108, nomeCompleto: "Júlia Miranda Santos Assis" },
  { id: 50, nomeCompleto: "Júlia Ribeiro Pimenta" },
  { id: 64, nomeCompleto: "Júlia Vigas Sodré" },
  { id: 131, nomeCompleto: "Juliana Almeida Vieira Campos" },
  { id: 132, nomeCompleto: "Juliana Barbosa Guedes" },
  { id: 65, nomeCompleto: "Lara Barreto de Andrade Gonçalves" },
  { id: 8, nomeCompleto: "Laura Sande Iwassa" },
  { id: 73, nomeCompleto: "Laura Gomes Oliveira e Lima" },
  { id: 110, nomeCompleto: "Laura Guimarães de Outeiro" },
  { id: 32, nomeCompleto: "Leticia Moitinho Lima" },
  { id: 83, nomeCompleto: "Leticia Liz Costa Santos" },
  { id: 23, nomeCompleto: "Livia Pimentel Monteiro" },
  { id: 24, nomeCompleto: "Liz Carvalho de Macedo" },
  { id: 33, nomeCompleto: "Liz Romero Guimarães" },
  { id: 66, nomeCompleto: "Liz Silva Nogueira" },
  { id: 84, nomeCompleto: "Luisa Fernanda Costa Sousa" },
  { id: 111, nomeCompleto: "Luisa Lopes Simões" },
  { id: 91, nomeCompleto: "Luise Pestana Bervian" },
  { id: 85, nomeCompleto: "Luiza Lustosa Silva" },
  { id: 11, nomeCompleto: "Luiza Pinheiro Santana de Oliveira" },
  { id: 25, nomeCompleto: "Luna Hermelino Germano" },
  { id: 126, nomeCompleto: "Luna Silva Santos" },
  { id: 38, nomeCompleto: "Malu Silveira do Sacramento Pacheco" },
  { id: 74, nomeCompleto: "Marcela Pinheiro Barbosa Carvalho" },
  { id: 92, nomeCompleto: "Maria Carolina Moreira da Silva Vieira" },
  { id: 13, nomeCompleto: "Maria Cecilia Oliveira Cabral" },
  { id: 52, nomeCompleto: "Maria Clara Tavares Rodrigues Cova" },
  { id: 53, nomeCompleto: "Maria Clara Ralin Silva" },
  { id: 26, nomeCompleto: "Maria Fernanda Mont Alegre Ollero" },
  { id: 34, nomeCompleto: "Maria Fernanda Maia Gazzinelli" },
  { id: 12, nomeCompleto: "Maria Isabel Quintella Santana" },
  { id: 14, nomeCompleto: "Maria Júlia Reis Boaventura" },
  { id: 43, nomeCompleto: "Maria Júlia Santos Amoedo" },
  { id: 87, nomeCompleto: "Maria Luisa Cunha Santos" },
  { id: 35, nomeCompleto: "Maria Luiza Gonzaga Gaspar" },
  { id: 54, nomeCompleto: "Maria Luiza Guido de Sousa" },
  { id: 93, nomeCompleto: "Maria Luiza Santana Bahia Pinto Soares" },
  { id: 101, nomeCompleto: "Maria Olivia Santos Andrade de Oliveira" },
  { id: 116, nomeCompleto: "Maria Paula da Purificação Damasceno" },
  { id: 6, nomeCompleto: "Maria Sofia Pimentel Nunes" },
  { id: 15, nomeCompleto: "Maria Tereza Motta Gonçalves sá" },
  { id: 102, nomeCompleto: "Marilia Bárbara Cruz Sowzer dos Santos" },
  { id: 37, nomeCompleto: "Marina Alves Serra Costa" },
  { id: 7, nomeCompleto: "Marina Dias da França Sales" },
  { id: 16, nomeCompleto: "Marina Lixiping Guedes Cheng" },
  { id: 67, nomeCompleto: "Marina Viana Barreto" },
  { id: 75, nomeCompleto: "Mariana Pereira Alves" },
  { id: 86, nomeCompleto: "Mariana Costa Rodrigues Pimentel" },
  { id: 95, nomeCompleto: "Mariana Oliveira Nobre" },
  { id: 17, nomeCompleto: "Maya Cerqueira Meneses de Mariz" },
  { id: 27, nomeCompleto: "Melissa Caribé" },
  { id: 36, nomeCompleto: "Melissa Figueredo Santa Barbara Souza" },
  { id: 51, nomeCompleto: "Melissa Santana Cruz dos Santos" },
  { id: 103, nomeCompleto: "Mirelle Leonidia dos Santos do Sacramento" },
  { id: 68, nomeCompleto: "Naomi Ferreira Sousa Santos" },
  { id: 117, nomeCompleto: "Nathália Plácido Machado Coutinho" },
  { id: 96, nomeCompleto: "Paola Santos Andrade de Oliveira" },
  { id: 44, nomeCompleto: "Pérola Andrade de Seixas Pereira da Silva" },
  { id: 70, nomeCompleto: "Pietra Marinho Argolo" },
  { id: 77, nomeCompleto: "Pietra Andrade Iglesias" },
  { id: 118, nomeCompleto: "Renata Souza Doria" },
  { id: 18, nomeCompleto: "Sanne Pinheiro Barbosa carvalho" },
  { id: 69, nomeCompleto: "Sofia de Andrade Apolonio Gomes" },
  { id: 55, nomeCompleto: "Sofia Rocha Ranã" },
  { id: 104, nomeCompleto: "Sophia Teixeira de Jesus Nascimento" },
  { id: 39, nomeCompleto: "Valentina Oliveira Tapioca" },
  { id: 78, nomeCompleto: "Valentina Liz Cardoso Almeida" },
  { id: 56, nomeCompleto: "Victória Sales Araújo" },
  { id: 112, nomeCompleto: "Vitória Gomes Santos" },
  { id: 28, nomeCompleto: "Yasmin Celestino Steffen" },
  { id: 71, nomeCompleto: "Yunna Oliveira de Carvalho" }
];

export default function FormUser({
  selectedSeats,
  setBuyerData,
  overview,
  avulso,
}) {
  // const [id, setId] = useState("");
  const [buyer, setBuyer] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [aluna, setAluna] = useState("");
  const [alunaId, setAlunaId] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [filteredStudents, setFilteredStudents] = useState(studentData);
  // const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const qrRef = useRef(null);
  const [qrData, setQrData] = useState("");
  const [cupom, setCupom] = useState("");

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

    const seat = selectedSeats.map((seat) => seat.id);

    const body = {
      student: avulso === 1 ? 999 : alunaId,
      cpf,
      buyer,
      session: overview === "15/06/2025 - SESSAO 1" ? 1 : 2,
      email,
      seat,
      qrcode: "",
      coupon: cupom,
    };

    // Gera o URL do QRCode com os parâmetros via GET
    const baseURL = "https://carol-dance-web.netlify.app/qrcode?";
    const qrDataURL = `${baseURL}CPF=${encodeURIComponent(
      body.cpf
    )}&Nome=${encodeURIComponent(body.buyer)}&Assentos=${encodeURIComponent(
      seat.join(", ")
    )}&Sessao=${encodeURIComponent(body.session)}`;

    // Define o estado do QRCode para renderizar
    setQrData(qrDataURL);

    // Espera a renderização do QRCode
    setTimeout(async () => {
      const qrCanvas = qrRef.current.querySelector("canvas");
      const qrDataURL = qrCanvas.toDataURL("image/png");

      // Adiciona a imagem base64 do QRCode ao corpo da requisição
      body.qrcode = qrDataURL;

      setBuyerData({ ...body, ids: selectedSeats });
      setLoading(true);
      try {
        const res = await axios.post("https://h-simcepi.smsprefeiturasp.com.br/go/ticket",
          body);

        // Adiciona o valor total da compra ao buyerData
        const totalValue = res.data?.totalValue;
        setBuyerData({ ...body, ids: selectedSeats, totalValue });
        // Se não houver erro, prosseguir para a rota de sucesso
        navigate("/sucesso", { replace: true });

      } catch (error) {
        alert(error.response.data.error);
      } finally {
        setLoading(false); // Desativa o estado de carregamento
      }

      return;
    }, 500);
  }

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
          <label htmlFor="buyer">Nome Completo do Comprador:</label>
          <input
            id="buyer"
            value={buyer}
            placeholder="Digite seu nome..."
            onChange={(e) => setBuyer(e.target.value)}
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
          <label htmlFor="email">E-mail para enviar os Ingressos:</label>
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
            <label htmlFor="cupom">Cupom (opcional):</label>
            <input
              id="cupom"
              value={cupom}
              placeholder="Digite um cupom, se tiver..."
              onChange={(e) => setCupom(e.target.value)}
              pattern="[A-Za-z0-9]*"
              maxLength={30}
            />
          </InputContainer>
        )}
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
        {/* {!avulso && overview !== "11/12/2024 - SESSAO 2" && (
          <InputContainer>
            <label htmlFor="estacionamento">
              Deseja estacionar na escola Salesiano?
            </label>
            <select
              id="estacionamento"
              value={estacionamento}
              onChange={(e) => setEstacionamento(e.target.value)}
              required
            >
              <option value="0">Não</option>
              <option value="1">Sim - R$15,00</option>
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
