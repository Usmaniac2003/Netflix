import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MyContextProvider } from './StateManage';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
let theme = createTheme();
theme = responsiveFontSizes(theme)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <MyContextProvider>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </MyContextProvider>
  </Router>
);

