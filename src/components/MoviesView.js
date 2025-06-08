import styled from "styled-components";
import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import evento from "../evento/evento.json";

export default function MoviesView({avulso, vagaEstacionamento}) {
  const [movies, setMovies] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Definindo os filmes com os dados importados do JSON
    setMovies(evento);
  }, []);

  /* const handleEventClick = () => {
    setShowModal(true);
  };*/

  return (
    <Content>
      <h2>Clique no evento</h2>
      <MoviesList 
        movies={movies} 
        avulso={avulso} 
        vagaEstacionamento={vagaEstacionamento} 
        //onEventClick={handleEventClick}
      />
      {/*showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h3>Atenção</h3>
            <p>O sistema não está liberado para venda no momento.</p>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </ModalContent>
        </ModalOverlay>
      )*/}
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 60px 0;
  gap: 10px;

  h2 {
    font-size: 24px;
    color: #293845;
  }
`;

/*const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;*/

/*const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  width: 400px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h3 {
    color: #293845;
    margin-bottom: 15px;
    font-size: 20px;
  }

  p {
    color: #666;
    margin-bottom: 20px;
  }

  button {
    background-color: #cd0077;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #a80062;
    }
  }
`;*/ 
