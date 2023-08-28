import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../images/logo3.png'

const Footer = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/");
    };
    return (
        <footer className="footer" style={{ background: "#000" }}>
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={Logo} alt="Logo" style={{ borderRadius: "10px" }} onClick={handleLogoClick} />
                </div>
                <div className="footer-social">
                    <a href="https://www.facebook.com/profile.php?id=100005232043975&mibextid=2JQ9oc" target='_blank'>
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/usman-ghani-763468255" target='_blank'>
                        <i class="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="https://instagram.com/usmaniac.03?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D" target='_blank'>
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} [Muhammad Usman Ghani] All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
