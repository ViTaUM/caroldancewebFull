import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Movie({
  imageUrl,
  title,
  movieId,
  overview,
  avulso,
  vagaEstacionamento,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Vendas Fechadas</h2>
            <p>As vendas de ingressos foram fechadas.</p>
            <button onClick={closeModal}>Fechar</button>
          </ModalContent>
        </Modal>
      )}
      {vagaEstacionamento === 1 ? (
        <Link
          to={`/assentos/${movieId}/estacionamento`}
          onClick={handleImageClick}
        >
          <MoviePost overview={overview} avulso={avulso}>
            <img src={imageUrl} alt={title} />
          </MoviePost>
        </Link>
      ) : avulso === 1 ? (
        <Link to={`/assentos/${movieId}/avulso`} onClick={handleImageClick}>
          <MoviePost overview={overview} avulso={avulso}>
            <img src={imageUrl} alt={title} />
          </MoviePost>
        </Link>
      ) : (
        <Link to={`/assentos/${movieId}`} onClick={handleImageClick}>
          <MoviePost overview={overview}>
            <img src={imageUrl} alt={title} />
          </MoviePost>
        </Link>
      )}
    </>
  );
}

const MoviePost = styled.li`
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 28px;
  overflow: hidden;
  img {
    max-width: 100%; /* Torna a imagem responsiva */
    height: auto;
    transition: transform 0.2s ease-in-out;
  }
  &:hover img {
    transform: scale(
      1.1
    ); /* Aplica um aumento de 10% na escala quando o mouse passa por cima */
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  width: 80%;
  max-width: 600px;
  h2 {
    margin-bottom: 20px;
    font-size: 2em;
  }
  p {
    margin-bottom: 30px;
    font-size: 1.2em;
  }
  button {
    padding: 15px 30px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
  }
`;
