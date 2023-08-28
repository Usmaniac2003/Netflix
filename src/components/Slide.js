import React, { useEffect, useState } from 'react';
import { Typography, Button } from "@mui/material";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import { MyStates } from '../StateManage';


const MovieSlide = () => {
    let { CurrMovieID } = MyStates();


    const MovieSlideData = async (id) => {
        try {
            const API_KEY = "4df4c62ae58ad7fd6f06b782169d835e";
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                    api_key: API_KEY,
                    append_to_response: "credits,videos",
                }
            });

            const Response = response.data;
            const ID = Response.id;
            const backdrop_path = Response.backdrop_path;
            const overview = Response.overview;
            const popularity = Response.popularity;
            const title = Response.original_title;
            const cast = Response.credits.cast.slice(0, 10).map(actor => actor.name).join(', ');
            const genres = Response.genres.map(genre => genre.name).join(",");
            const trailers = Response.videos.results.filter(video => video.type === "Trailer");
            const trailerKey = trailers.length > 0 ? trailers[0].key : null;

            const MovieDetails = {
                ID,
                backdrop_path,
                overview,
                popularity,
                title,
                cast,
                genres,
                trailerKey,
            }
            return MovieDetails;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    let [Data, setData] = useState({});
    let [TrailerKey, setTrailerKey] = useState(null);

    const HoldTrailerKey = (key) => {
        setTrailerKey(key);
        setShowTrailer(true);
        window.scrollTo(0, 0);
    }


    useEffect(() => {
        const fetchData = async () => {
            const movieData = await MovieSlideData(CurrMovieID);
            setData(movieData);
            console.log(Data);
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [CurrMovieID]);
    let [ShowTrailer, setShowTrailer] = useState(false);

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
                        style={{ height: "90vh" }}
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

            <div key={Data?.id} className="SlideContainer" style={{ marginTop: "10vh" }}>
                <div className="Slide" style={{
                    position: "relative", display: "flex", flexDirection: "column", gap: "2vh", minHeight: "80vh", background: `url(https://image.tmdb.org/t/p/original${Data?.backdrop_path}) center/cover no-repeat`
                }}>
                    <div className="SlideContent" style={{ display: "flex", flexDirection: "column", gap: "2vh", padding: "7vw", width: "70%", position: "relative", zIndex: "3" }}>
                        <Typography variant="h3" sx={{ color: "white", fontWeight: "600" }}>{Data?.title}</Typography>
                        <Typography variant="body1" sx={{ color: "white" }}>{Data?.overview}</Typography>
                        <Typography variant="body2" sx={{ color: "white", marginTop: "1rem" }}>
                            {`Genres: ${Data?.genres}`}
                        </Typography>
                        <Button variant="contained" onClick={() => HoldTrailerKey(Data?.trailerKey)} sx={{
                            background: "#E50914", '&:hover': {
                                backgroundColor: 'white',
                                color: "#E50914"
                            },
                        }}>
                            <Typography fontWeight={600} >Watch Trailer</Typography>
                            <PlayArrowIcon />
                        </Button>

                        <Typography variant="body2" sx={{ color: "white", marginTop: "1rem" }}>
                            {`Popularity: ${Data?.popularity}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white", marginTop: "1rem" }}>
                            {`Cast: ${Data?.cast}`}
                        </Typography>
                    </div>
                    <div className="DullOverlay" style={{ content: "", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.6)", zIndex: "1" }}></div>
                </div>
            </div>
        </>
    );
};

export default MovieSlide;



