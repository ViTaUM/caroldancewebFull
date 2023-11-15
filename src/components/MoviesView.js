import styled from "styled-components";
import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
// import evento from "../evento/evento.json";
import axios from "axios"; // Importe o Axios

export default function MoviesView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Cria a configuração dos cabeçalhos para o Axios
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest", // Adiciona o cabeçalho X-Requested-With
        // Exemplo: Adiciona um cabeçalho de autorização
        // 'Authorization': 'Bearer seu-token-aqui'
        // Adicione outros cabeçalhos conforme necessário
      },
    };

    // Faz uma chamada para o servidor backend para buscar os dados dos eventos usando Axios
    axios
      .get("http://localhost:3333/eventos", config)
      .then((response) => {
        setMovies(response.data); // O Axios já faz o parse do JSON automaticamente
      })
      .catch((error) => {
        console.error("Erro ao buscar os eventos:", error);
      });
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
