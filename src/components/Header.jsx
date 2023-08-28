import axios from "axios";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../images/Netflix_log.png'
import { MyStates } from "../StateManage";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "./Menu";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Header = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/");
    };
    let { menu, Setmenu, MenuToggleBtn, setMenuToggleBtn, Search, setSearch, setSearchResult } = MyStates();

    const ToggleMenu = () => {
        if (menu === false) {
            Setmenu(true);
        }
        else if (menu === true) {
            Setmenu(false);
        }
        if (MenuToggleBtn === false) {
            setMenuToggleBtn(true);
        }
        else if (MenuToggleBtn === true) {
            setMenuToggleBtn(false);
        }
    }

    const searchMovieByName = async (movieName) => {
        const API_KEY = "4df4c62ae58ad7fd6f06b782169d835e";

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: API_KEY,
                    query: movieName,
                },
            });

            const searchResults = response.data.results;
            return searchResults;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            if (Search !== '') {
                const movies = await searchMovieByName(Search);
                setSearchResult(movies);
            }
        };
        fetchData();
    }, [Search, setSearchResult]);

    const handleSearch = () => {
        if (Search !== '') {
            navigate("/page3");
        }
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return <>

        <div className="navbar" >
            <img src={Logo} alt="" className="logo" onClick={() => handleLogoClick()} />
            <div className="nav-item">
                <TextField
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleEnterKeyPress}
                    onBlur={handleSearch}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: 'white', cursor: "pointer" }} onClick={handleSearch} />
                            </InputAdornment>
                        ),
                        style: {
                            color: 'white', background: "#8b8b8b", width: "clamp(150px,60vw,400px)", height: "5vh"
                        },
                    }}
                />

                {
                    MenuToggleBtn ? <MenuIcon sx={{ color: "white", marginRight: "clamp(40px,10vw,50px)" }} onClick={ToggleMenu} /> : <CloseIcon sx={{ color: "white", marginRight: "clamp(40px,10vw,50px)" }} onClick={ToggleMenu} />
                }
            </div>
        </div>
        {menu && <Menu />}


    </>
}

export default Header;