import React, { useEffect, useState } from 'react';
import { Typography, Button } from "@mui/material";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

import zIndex from '@mui/material/styles/zIndex';

function MovieSlider({ Category }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: false,
        autoplaySpeed: 10000,
        prevArrow: null,
        nextArrow: null,
    };

    const MovieSliderData = async (category) => {
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

    const RemainingMovieSliderData = async (id) => {
        try {
            const API_KEY = "4df4c62ae58ad7fd6f06b782169d835e";
            const detailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                    api_key: API_KEY,
                    append_to_response: "credits,videos",
                }
            });

            const detailsData = detailsResponse.data;

            const cast = detailsData.credits.cast.map(actor => actor.name);
            const genres = detailsData.genres.map(genre => genre.name);
            const trailers = detailsData.videos.results.filter(video => video.type === "Trailer");
            const trailerKey = trailers.length > 0 ? trailers[0].key : null;

            return {
                cast,
                genres,
                trailerKey,
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    let [Data, setData] = useState([]);
    let [TrailerKey, setTrailerKey] = useState(null);

    const HoldTrailerKey = (key) => {
        setTrailerKey(key);
        setShowTrailer(true);
    }

    const [RemainingDetails, setRemainingDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const movieData = await MovieSliderData(Category);
            setData(movieData);

            const remainingDetailsPromises = movieData.map(async (movie) => {
                const remainingDetails = await RemainingMovieSliderData(movie.id);
                return {
                    movieId: movie.id,
                    details: remainingDetails,
                };
            });

            const resolvedRemainingDetails = await Promise.all(remainingDetailsPromises);
            setRemainingDetails(resolvedRemainingDetails);
        };

        fetchData();
    }, [Category]);
    let [ShowTrailer, setShowTrailer] = useState(false);
    return (
        <div className="MovieSliderContainer" style={{ overflow: "hidden", marginTop: "10vh" }}>
            <Slider {...settings}>
                {Data.map((movie) => {
                    const remainingDetails = RemainingDetails.find(details => details.movieId === movie.id)?.details;

                    return (
                        <>





                            {
                                ShowTrailer &&
                                <div className="trailer" style={{ position: "relative", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "2vh", alignItems: "center", justifyContent: "center", background: "rgba(0, 0, 0, 0.6)", zIndex: "2" }}>
                                    <iframe
                                        title="Trailer"
                                        width="100%"
                                        src={`https://www.youtube.com/embed/${TrailerKey}`}
                                        frameBorder="0"
                                        allowFullScreen
                                        style={{ height: "600px" }}
                                        loading="lazy"
                                    ></iframe>
                                    <Button variant="contained" onClick={() => setShowTrailer(false)} sx={{
                                        background: "#E50914", '&:hover': {
                                            backgroundColor: 'white',
                                            color: "#E50914"
                                        },
                                    }}>
                                        <Typography fontWeight={600} >Close</Typography>
                                        <CloseIcon />
                                    </Button>
                                </div>
                            }
                            <div key={movie.id} className="SlideContainer">
                                <div className="Slide" style={{
                                    position: "relative", display: "flex", flexDirection: "column", gap: "2vh", minHeight: "80vh", background: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) center/cover no-repeat`
                                }}>
                                    <div className="SlideContent" style={{ display: "flex", flexDirection: "column", gap: "2vh", padding: "7vw", width: "70%", position: "relative", zIndex: "3" }}>
                                        <Typography variant="h3" sx={{ color: "white", fontWeight: "600" }}>{movie.title}</Typography>
                                        <Typography variant="body1" sx={{ color: "white" }}>{movie.overview}</Typography>
                                        <Typography variant="body2" sx={{ color: "white", marginTop: "1rem" }}>
                                            {`Genres: ${remainingDetails?.genres.join(', ')}`}
                                        </Typography>
                                        <Button variant="contained" onClick={() => HoldTrailerKey(remainingDetails?.trailerKey)} sx={{
                                            background: "#E50914", '&:hover': {
                                                backgroundColor: 'white',
                                                color: "#E50914"
                                            },
                                        }}>
                                            <Typography fontWeight={600} >Watch Trailer</Typography>
                                            <PlayArrowIcon />
                                        </Button>

                                        <Typography variant="body2" sx={{ color: "white", marginTop: "1rem" }}>
                                            {`Popularity: ${movie.popularity}`}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "white", marginTop: "1rem" }}>
                                            {`Cast: ${remainingDetails?.cast.slice(0, 10).join(', ')}`}
                                        </Typography>
                                    </div>
                                    <div className="DullOverlay" style={{ content: "", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.6)", zIndex: "1" }}></div>
                                </div>
                            </div>


                        </>
                    )
                })}
            </Slider>
        </div>


    );
}
export default MovieSlider;



