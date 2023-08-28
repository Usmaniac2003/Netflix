import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Typography } from "@mui/material";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MyStates } from "../StateManage";
import { useNavigate } from "react-router-dom";
function MoviePatti({ Category, Heading }) {
    const navigate = useNavigate();
    let { setCurrMovieGenres, setCurrMovieID } = MyStates();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };
    const PosterStyle = {
        width: '100%',
        padding: "0 1vw",
        borderRadius: "8px",
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scaleY(1.06)',
        },
    };

    const MoviePattiData = async (category) => {
        try {
            const API_KEY = "4df4c62ae58ad7fd6f06b782169d835e";
            if (category === "now_playing" || category === "popular" || category === "top_rated" || category === "upcoming") {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}`, {
                    params: {
                        api_key: API_KEY,
                    }
                });
                return response.data.results;
            } else {
                const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
                    params: {
                        api_key: API_KEY,
                        with_genres: category,
                    }
                });
                return response.data.results;
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    let [Data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const movieData = await MoviePattiData(Category);
            setData(movieData);
        };

        fetchData();
    }, [])
    const Transfer_ID_genre = (Id, GENRE) => {
        setCurrMovieID(Id);
        setCurrMovieGenres(GENRE);
        navigate("/Page2");

    };
    return (
        <>
            <div className="MoviePatti" style={{ padding: "5vw 9vw", display: "flex", flexDirection: "column", gap: "2vh" }}>
                <Typography variant="h3" sx={{ color: "white", fontWeight: "600" }}>{Heading}</Typography>
                <Slider {...settings}>
                    {
                        Data.map((movie) => {
                            return <>
                                <div key={movie.id} onClick={() => Transfer_ID_genre(movie.id, movie.genre_ids)}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie_poster" />
                                </div>
                            </>
                        })
                    }
                </Slider>
            </div>
        </>
    )
};


export default MoviePatti;