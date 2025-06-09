import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SystemClosedModal from "./SystemClosedModal";

export default function Movie({
  imageUrl,
  title,
  movieId,
  overview,
  avulso,
  vagaEstacionamento,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <SystemClosedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {vagaEstacionamento === 1 ? (
        <Link to={`/assentos/${movieId}/estacionamento`} onClick={handleClick}>
          <MoviePost overview={overview} avulso={avulso}>
            <img src={imageUrl} alt={title} />
          </MoviePost>
        </Link>
      ) : avulso === 1 ? (
        <Link to={`/assentos/${movieId}/avulso`} onClick={handleClick}>
          <MoviePost overview={overview} avulso={avulso}>
            <img src={imageUrl} alt={title} />
          </MoviePost>
        </Link>
      ) : (
        <Link to={`/assentos/${movieId}`} onClick={handleClick}>
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
    max-width: 100%;
    height: auto;
    transition: transform 0.2s ease-in-out;
  }
  &:hover img {
    transform: scale(1.1);
  }
`;
