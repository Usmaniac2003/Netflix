import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MyStates } from '../StateManage';
import { Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';

function GenrePage() {
    const NetflixStyledPagination = styled(Pagination)(({ theme }) => ({
        display: 'flex',
        padding: "5vw 0",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2rem',
        '& .MuiPaginationItem-root': {
            color: 'white',
            borderColor: 'white',
            fontSize: '1.2rem',
            margin: '0 0.5rem',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&.Mui-selected': {
                backgroundColor: 'red',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'red',
                },
            },
        },
        [theme.breakpoints.down('md')]: {
            '& .MuiPaginationItem-root': {
                fontSize: '1rem',
                margin: '0 0.3rem',
            },
        },
        [theme.breakpoints.down('sm')]: {
            '& .MuiPaginationItem-root': {
                fontSize: '0.6rem',
                margin: '0 0rem',
            },
        },
    }));

    const MyPagination = () => {
        return (
            <NetflixStyledPagination
                count={TotalPages}
                page={PageNumber}
                onChange={handlePaginationChange}
                shape="rounded"
            />
        );
    };







    const navigate = useNavigate();
    let { setCurrMovieID, setCurrMovieGenres, GenreResult, GenreName, PageNumber, setPageNumber, TotalPages, setGenreResult, setGenreName, genreID, setgenreID, setTotalPages } = MyStates();
    const Transfer_ID_genre = (Id, GENRE) => {
        setCurrMovieID(Id);
        setCurrMovieGenres(GENRE);
        navigate("/Page2");

    };
    const handlePaginationChange = (event, page) => {
        setPageNumber(page);


    };
    const searchMoviesByGenre = async (genreId, page) => {
        try {
            const API_KEY = "4df4c62ae58ad7fd6f06b782169d835e";
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
                params: {
                    api_key: API_KEY,
                    with_genres: genreId,
                    page: page,
                },
            });

            const movies = response.data.results;
            setTotalPages(response.data.total_pages);
            setGenreResult(movies);
            return movies;
        } catch (error) {
            console.error(error);
            setTotalPages(0);
            setGenreResult([]);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const movies = await searchMoviesByGenre(genreID, PageNumber);
            setGenreResult(movies);
        };
        fetchData();

    }, [genreID, PageNumber])
    const HandlerRefresh = () => {
        window.location.reload();
    }
    return (
        <>
            <Header />
            {GenreResult && GenreResult.length !== 0 ? (<div className="morelikethis" style={{ display: "flex", flexDirection: "column", marginTop: "3vh", alignItems: "center", marginTop: "13vh" }}>
                <Typography variant='h3' fontWeight={600} color="white" >{GenreName}</Typography>
                <MyPagination />
                <Grid container spacing={3} sx={{ padding: "5vh 10vw" }}>
                    {GenreResult.map((movie) => (
                        <Grid item key={movie.id} xs={6} sm={6} md={4} lg={3} onClick={() => Transfer_ID_genre(movie.id, movie.genre_ids)}>
                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="movie_poster" />
                        </Grid>
                    ))}
                </Grid>
                <MyPagination />
            </div>) : (
                <>
                    <div className="error" style={{ display: "flex", flexDirection: "column", minHeight: "80vh", justifyContent: "center", alignItems: "center", gap: "8vh" }}>
                        <Typography variant='h3' sx={{ color: "white" }}>Data Not Availaible</Typography>
                        <Button variant="contained" sx={{
                            background: "#E50914", '&:hover': {
                                backgroundColor: 'white',
                                color: "#E50914"
                            },
                        }}>
                            <Typography fontWeight={600} onClick={HandlerRefresh}>Refresh</Typography>
                        </Button>
                    </div>
                </>
            )
            }
            <Footer />
        </>
    )
}

export default GenrePage;