import React, { useState } from "react";
import styled from "styled-components";

export default function Movie({ imageUrl, title, movieId }) {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <MoviePost onClick={handleImageClick}>
        <img src={imageUrl} alt={title} />
      </MoviePost>
      {showModal && (
        <ModalBackdrop onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <p>O evento já foi realizado!</p>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MoviePost = styled.li`
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 28px;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    filter: grayscale(
      100%
    ); /* Adiciona o filtro para tornar a imagem em preto e branco */
  }
  &:hover img {
    transform: scale(1.1);
  }
`;
