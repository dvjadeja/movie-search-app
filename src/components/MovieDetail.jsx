import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import defaultImg from './3793096.jpg'
import { API_KEY } from "../App";

const Container = styled.div `
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    justify-content: center;
    border-bottom: 1px solid lightgray;
`;

const CoverImg = styled.img `
    height: 352px;
    object-fit: cover;
`;

const InfoColoumn = styled.div `
    display: flex;
    flex-direction: column;
    margin: 20px;
`;

const MovieName = styled.span `
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden;
    text-transform: capitalize;
    text-overflow: ellipsis;

`;

const MovieInfo = styled.span `
    font-size: 16px;
    font-weight: 500;
    color: black;
    overflow: hidden;
    margin: 4px 0;
    text-overflow: ellipsis;
    text-transform: capitalize;
`;

const Close = styled.span `
    font-size: 16px;
    font-weight: 600;
    color: black;
    background: lightgray;
    height: fit-content;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.8;
`;

const MovieDetail = (props) => {
    const [movieInfo, setMovieInfo] = useState();
    const { selectedMovie } = props
    useEffect(() => {
        axios.get(`http://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${API_KEY}`)
        .then((response) => setMovieInfo(response.data))
    },[selectedMovie])
    let Image = `http://image.tmdb.org/t/p/w185${movieInfo?.poster_path}`
    return (
        <Container>
            {movieInfo?<>
                <CoverImg src={movieInfo?.poster_path === null ? defaultImg : Image } />
            <InfoColoumn>
                <MovieName>
                    Movie: {movieInfo?.title}
                </MovieName>
                <MovieInfo>
                    Popularity: <span style={{opacity: 0.6}}>{movieInfo?.popularity}</span>
                </MovieInfo>
                <MovieInfo>
                    Original Title: <span style={{opacity: 0.6}}>{movieInfo?.original_title}</span>
                </MovieInfo>
                <MovieInfo>
                    Release Date: <span style={{opacity: 0.6}}>{movieInfo?.release_date}</span>
                </MovieInfo>
                <MovieInfo>
                    Language: <span style={{opacity: 0.6}}>{movieInfo?.original_language}</span>
                </MovieInfo>
                <MovieInfo>
                    Runtime: <span style={{opacity: 0.6}}>{movieInfo?.runtime} min</span>
                </MovieInfo>
                <MovieInfo>
                    Tag Line: <span style={{opacity: 0.6}} >{movieInfo?.tagline}</span>
                </MovieInfo>
                <MovieInfo>
                    Overview: <span style={{opacity: 0.6}} >{movieInfo?.overview}</span>
                </MovieInfo>
                <MovieInfo>
                    Status: <span style={{opacity: 0.6}} >{movieInfo?.status}</span>
                </MovieInfo>
                <MovieInfo>
                    Link: <span style={{opacity: 0.6}} >
                            <a href={movieInfo?.homepage} target='_blank' rel='noreferrer'>
                                {movieInfo?.homepage}
                            </a>
                        </span>
                </MovieInfo>
            </InfoColoumn>
            <Close onClick={() => props.onMovieSelect()}>X</Close>
            </>: 'Loading...'}
            
        </Container>
    );
}

export default MovieDetail;