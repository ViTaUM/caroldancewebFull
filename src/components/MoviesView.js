import styled from "styled-components";
import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import evento from "../evento/evento.json";

export default function MoviesView({avulso, vagaEstacionamento}) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    // Definindo os filmes com os dados importados do JSON
    setMovies(evento);
  }, []);

  return (
    <Content>
      <h2>Clique no evento</h2>
      <MoviesList movies={movies} avulso={avulso} vagaEstacionamento={vagaEstacionamento} />
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
