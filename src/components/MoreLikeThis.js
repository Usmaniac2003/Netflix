import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MyStates } from '../StateManage'
import { Grid, Typography } from '@mui/material';
function MoreLikeThis() {
    let { setCurrMovieID, CurrMovieGenres, setCurrMovieGenres } = MyStates();

    const searchMoviesByGenreIds = async (genreIds) => {
        try {
            const API_KEY = "4df4c62ae58ad7fd6f06b782169d835e";
            const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
                params: {
                    api_key: API_KEY,
                    with_genres: genreIds.join(","),
                },
            });

            return response.data.results;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    let [Data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const Movies = await searchMoviesByGenreIds(CurrMovieGenres);
            setData(Movies);
            console.log(Data);

        };
        fetchData();
    }, [CurrMovieGenres]);


    return (
        <>
            <div className="morelikethis" style={{ display: "flex", flexDirection: "column", marginTop: "3vh", alignItems: "center" }}>
                <Typography variant='h3' fontWeight={600} color="white" >More Like This</Typography>
                <Grid container spacing={3} sx={{ padding: "5vh 10vw" }}>
                    {Data.map((movie) => (
                        <Grid item key={movie.id} xs={6} sm={6} md={4} lg={3} onClick={() => setCurrMovieID(movie.id)}>
                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="movie_poster" />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    )
}

export default MoreLikeThis;