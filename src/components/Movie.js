import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Movie({ imageUrl, title, movieId }) {

  return (
    <Link to={`/assentos/${ movieId }`}>
      <MoviePost>
        <img src={ imageUrl } alt={ title } />
      </MoviePost>
    </Link>
  );
}

const MoviePost = styled.li`
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 28px;
  overflow: hidden; 

  img {
    max-width: 900px; 
    height: auto;
    transition: transform 0.2s ease-in-out;
  }
  &:hover img {
    transform: scale(1.1); /* Aplica um aumento de 10% na escala quando o mouse passa por cima */
  }
`;