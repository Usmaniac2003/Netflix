import { NavLink } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { MyStates } from "../StateManage";
import { useEffect } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
const Menu = () => {

    const navigate = useNavigate();
    let { setGenreResult, setGenreName, genreID, setgenreID, PageNumber, setTotalPages, Setmenu, setMenuToggleBtn } = MyStates();
    const handleclick = (name, genreid) => {
        setGenreName(name);
        setgenreID(genreid);
        Setmenu(false);
        setMenuToggleBtn(true);
    }
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
            setGenreResult(movies); // Move this line inside try block
            return movies;
        } catch (error) {
            console.error(error);
            setTotalPages(0); // Handle error by resetting the state
            setGenreResult([]); // Handle error by resetting the state
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
    return <>
        <div className="menu p-5" style={{ color: "white", backgroundColor: "#121212", opacity: "0.9", borderBottom: "2px solid white" }}>
            <Grid container maxWidth="xl" justifyContent="center" gap={10} sx={{ opacity: "1" }}>
                <Grid item flexDirection="column" xs={4} sm={4} lg={4} xl={4} sx={{ width: "33vw" }}>
                    <NavLink to="/page4" onClick={() => handleclick("Action", 28)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Action</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Animation", 16)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Animation</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Crime", 80)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Crime</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Drama", 18)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Drama</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Fantasy", 14)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Fantasy</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Horror", 27)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Horror</Typography></NavLink>
                </Grid>
                <Grid item flexDirection="column" xs={4} sm={4} lg={4} xl={4} sx={{ width: "33vw" }}>
                    <NavLink to="/page4" onClick={() => handleclick("Mystery", 9648)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Mystery</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Sci-Fi", 878)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Sci-Fi</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Thriller", 53)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Thriller</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Westren", 37)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Westren</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Adventure", 12)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Adventure</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Comedy", 35)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Comedy</Typography></NavLink>
                </Grid>
                <Grid item flexDirection="column" xs={4} sm={4} lg={4} xl={4} sx={{ width: "33vw" }}>
                    <NavLink to="/page4" onClick={() => handleclick("Documentary", 99)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Documentary</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Family", 10751)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Family</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("History", 36)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>History</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Music", 10402)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Music</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("Romance", 10749)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>Romance</Typography></NavLink>
                    <NavLink to="/page4" onClick={() => handleclick("War", 10752)}><Typography variant="h6" sx={{ borderBottom: "2px solid white" }}>War</Typography></NavLink>
                </Grid>

            </Grid>
        </div>

    </>
}

export default Menu;