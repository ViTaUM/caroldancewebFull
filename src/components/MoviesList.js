import styled from "styled-components";
import Movie from "./Movie";

export default function MoviesList({ movies }) {
  return (
    <Movies>
      {
        movies.length !== 0
          ?
          movies.map((movie, index) => {
            return (
              <Movie
                key={ index }
                imageUrl={ movie.img }
                title={ movie.title }
                movieId={ movie.id }
              />)
          })
          :
          <></>
      }
    </Movies>
  );
}

const Movies = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;