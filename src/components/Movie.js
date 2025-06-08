import React, { useState, useEffect } from "react";
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
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 2400 * 1000); // 40 minutos
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  // O modal aparece automaticamente ao renderizar

  return (
    <>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Estamos em manutenção</h2>
            <p>Em breve voltaremos com novidades!</p>
          </ModalContent>
        </ModalOverlay>
      )}
      {/* Os links ficam desabilitados enquanto o modal está aberto */}
      <div style={{ pointerEvents: showModal ? 'none' : 'auto', opacity: showModal ? 0.5 : 1 }}>
        {vagaEstacionamento === 1 ? (
          <Link to={`/assentos/${movieId}/estacionamento`} tabIndex={showModal ? -1 : 0}>
            <MoviePost overview={overview} avulso={avulso}>
              <img src={imageUrl} alt={title} />
            </MoviePost>
          </Link>
        ) : avulso === 1 ? (
          <Link to={`/assentos/${movieId}/avulso`} tabIndex={showModal ? -1 : 0}>
            <MoviePost overview={overview} avulso={avulso}>
              <img src={imageUrl} alt={title} />
            </MoviePost>
          </Link>
        ) : (
          <Link to={`/assentos/${movieId}`} tabIndex={showModal ? -1 : 0}>
            <MoviePost overview={overview}>
              <img src={imageUrl} alt={title} />
            </MoviePost>
          </Link>
        )}
      </div>
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
    transform: scale(1.1); /* Aplica um aumento de 10% na escala quando o mouse passa por cima */
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 40px 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  h2 {
    margin-bottom: 16px;
    color: #c0392b;
  }
  p {
    color: #333;
    font-size: 18px;
  }
`;
