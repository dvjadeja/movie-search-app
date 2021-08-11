import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import Movie from "./components/Movie";
import MovieDetail from "./components/MovieDetail";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;

export const API_KEY = "89981625a6a2af635d7b04894195ebe2";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState();
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`
    );
    console.log(response);
    setMovieList(response.data.results);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    setSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 1000);
    setTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>Movie Search App</AppName>
        <InputBox>
          <SearchInput
            placeholder="Enter Movie Name"
            value={searchQuery}
            onChange={onTextChange}
          />
        </InputBox>
      </Header>
      {selectedMovie && (
        <MovieDetail
          selectedMovie={selectedMovie}
          API_KEY={API_KEY}
          onMovieSelect={setSelectedMovie}
        />
      )}
      <MovieListContainer>
        {movieList?.length
          ? movieList.map((movie, index) => (
              <Movie
                key={index}
                movie={movie}
                onMovieSelect={setSelectedMovie}
              />
            ))
          : "No Movie Found"}
      </MovieListContainer>
    </Container>
  );
}

export default App;
