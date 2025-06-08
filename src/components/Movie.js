import React from "react";
import styled from "styled-components";

export default function Movie({
  imageUrl,
  title,
  movieId,
  overview,
  avulso,
  vagaEstacionamento,
  onClick
}) {
  return (
    <MoviePost 
      overview={overview} 
      avulso={avulso}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <img src={imageUrl} alt={title} />
    </MoviePost>
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
