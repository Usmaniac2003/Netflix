import axios from "axios";
import { createContext, useContext, useState } from "react";
const API_KEY = "4df4c62ae58ad7fd6f06b782169d835e";
const BASE_URL = "https://api.themoviedb.org/3";

const MyContext = createContext();

const MyContextProvider = (props) => {
    const [menu, Setmenu] = useState(false);
    const [MenuToggleBtn, setMenuToggleBtn] = useState(true);
    const [CurrMovieID, setCurrMovieID] = useState(null);
    const [CurrMovieGenres, setCurrMovieGenres] = useState([]);
    const [Search, setSearch] = useState("");
    const [SearchResult, setSearchResult] = useState([]);
    const [GenreResult, setGenreResult] = useState([]);
    const [GenreName, setGenreName] = useState([]);
    const [genreID, setgenreID] = useState(null);
    const [PageNumber, setPageNumber] = useState(1);
    const [TotalPages, setTotalPages] = useState(0);






    return <>
        <MyContext.Provider value={{ menu, Setmenu, MenuToggleBtn, setMenuToggleBtn, CurrMovieID, setCurrMovieID, CurrMovieGenres, setCurrMovieGenres, Search, setSearch, SearchResult, setSearchResult, GenreResult, setGenreResult, GenreName, setGenreName, genreID, setgenreID, PageNumber, setPageNumber, TotalPages, setTotalPages }}>
            {props.children}
        </MyContext.Provider>
    </>

}

const MyStates = () => useContext(MyContext);

export { MyContextProvider, MyStates };