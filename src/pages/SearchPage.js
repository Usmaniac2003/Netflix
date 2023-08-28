import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MyStates } from '../StateManage';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
function SearchPage() {
    const navigate = useNavigate();
    let { SearchResult, setCurrMovieID, setCurrMovieGenres, Search } = MyStates();
    const Transfer_ID_genre = (Id, GENRE) => {
        setCurrMovieID(Id);
        setCurrMovieGenres(GENRE);
        navigate("/Page2");

    };
    return (
        <>
            <Header />
            {SearchResult &&
                SearchResult.length === 0 ? (
                <div className="morelikethis" style={{ display: "flex", flexDirection: "column", marginTop: "3vh", alignItems: "center", marginTop: "13vh", minHeight: "70vh", width: "100%", overflow: "hidden", padding: "2vw", gap: "10vh" }}>
                    <Typography variant='h3' fontWeight={600} color="white" >No results found for "{Search}"</Typography>
                    <ReportProblemIcon style={{ color: "red", width: "30vw", fontSize: "30vw", opacity: "0.8" }} />
                </div>
            ) : (
                <div className="morelikethis" style={{ display: "flex", flexDirection: "column", marginTop: "3vh", alignItems: "center", marginTop: "13vh", minHeight: "70vh" }}>
                    <Typography variant='h3' fontWeight={600} color="white" >{Search}</Typography>
                    <Grid container spacing={3} sx={{ padding: "5vh 10vw" }}>
                        {SearchResult.map((movie) => (
                            <Grid item key={movie.id} xs={6} sm={6} md={4} lg={3} onClick={() => Transfer_ID_genre(movie.id, movie.genre_ids)}>
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="movie_poster" />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )
            }
            <Footer />
        </>
    )
}

export default SearchPage