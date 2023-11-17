import styled from "styled-components";
import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import evento from "../evento/evento.json";

export default function MoviesView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Definindo os filmes com os dados importados do JSON
    setMovies(evento);
  }, []);

  return (
    <Content>
      <h2>Click no evento</h2>
      <MoviesList movies={movies} />
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  width: 100vw;

  h2 {
    margin: 50px 0;
    font-size: 24px;
    color: #293845;
  }
`;
