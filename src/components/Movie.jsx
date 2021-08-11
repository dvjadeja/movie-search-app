import React from "react";
import styled from "styled-components";

import defaultImg from "./3793096.jpg";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const CoverImg = styled.img`
  height: 362px;
  object-fit: cover;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const Movie = (props) => {
  const { id, title, poster_path, popularity } = props.movie;
  let Image = `http://image.tmdb.org/t/p/w185${poster_path}`;
  return (
    <MovieContainer onClick={() => props.onMovieSelect(id)}>
      <CoverImg src={poster_path === null ? defaultImg : Image} />
      <MovieName>{title}</MovieName>
      <MovieInfo>{popularity}%</MovieInfo>
    </MovieContainer>
  );
};

export default Movie;
